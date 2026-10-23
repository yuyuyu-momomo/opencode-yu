import { spawn, execFile } from "node:child_process"
import { access, mkdir, mkdtemp, readdir, stat, rm } from "node:fs/promises"
import { join, delimiter, dirname, extname } from "node:path"
import { homedir } from "node:os"
import { constants } from "node:fs"
import { promisify } from "node:util"
import { stableId, LibraryStore } from "../library/store.mjs"
import { MediaSettings } from "../media/settings.mjs"
import { MediaCache, MAX_VIDEO_BYTES } from "../media/cache.mjs"
import { inspectVideo, mediaBinary } from "../media/runtime.mjs"
import { createVideoPlatforms, videoUrl } from "../sources/video-platforms.mjs"
import { cleanText } from "../library/text-reader.mjs"

const execute = promisify(execFile)
// Sort by the shorter edge so portrait 480x852 and landscape 852x480 are equivalent.
// If no format is <=480p, yt-dlp picks the smallest available resolution instead.
export const VIDEO_FORMAT_ARGS = Object.freeze(["--format", "bv*+ba/bv*", "--format-sort", "res:480,vcodec:h264,acodec:m4a"])
export async function downloaderBinary() {
  const paths = process.env.MOYU_YTDLP ? [process.env.MOYU_YTDLP] : [
    join(homedir(), ".local/share/opencode-moyu/media/bin", process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp"),
    ...String(process.env.PATH || "").split(delimiter).map((dir) => join(dir, process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp")),
  ]
  for (const path of paths) {
    try { await access(path, constants.X_OK); await execute(path, ["--version"], { timeout: 5000, maxBuffer: 1024, windowsHide: true }); return path } catch {}
  }
  throw new Error("未找到 yt-dlp，请安装官方 yt-dlp，或用 MOYU_YTDLP 指定路径")
}

function safeError(message) {
  return cleanText(String(message)).replace(/https?:\/\/\S+/g, "[来源地址]").slice(-600)
}
export function downloadFailure(message, platform) {
  if (/sign in to confirm|not a bot|captcha|human.verification|verify.you.are.human/i.test(message)) return `${platform === "youtube" ? "YouTube" : "视频来源"} 要求登录或人机验证，已停止下载。API Key 仅用于数据查询，不能解除视频访问限制。`
  if (/private video|members.only|premium|age.restricted|login required|sign in/i.test(message)) return "视频需要账户或额外访问权限，已停止下载"
  if (/video is unavailable|video unavailable|removed|does not exist/i.test(message)) return "视频不可用、已删除或当前网络无法访问，未入库"
  if (/requested format is not available/i.test(message)) return "来源未提供当前可下载的视频格式，未入库"
  return "视频来源获取失败：" + safeError(message)
}
export async function downloadVideo(url, directory, { signal, onProgress = (_value) => {}, binary = downloaderBinary, launch = spawn } = {}) {
  const target = videoUrl(url)
  signal?.throwIfAborted()
  const executable = await binary(), ffmpeg = await mediaBinary("ffmpeg")
  signal?.throwIfAborted()
  const args = ["--ignore-config", "--no-plugin-dirs", "--no-cache-dir", "--no-playlist", "--playlist-items", "1", "--no-remote-components", "--js-runtimes", "node", "--socket-timeout", "15", "--retries", "0", "--extractor-retries", "0", "--fragment-retries", "0", "--abort-on-unavailable-fragments", "--concurrent-fragments", "1", "--match-filters", "!is_live & duration <= 3600", "--max-filesize", String(MAX_VIDEO_BYTES), ...VIDEO_FORMAT_ARGS, "--merge-output-format", "mp4/mkv", "--ffmpeg-location", dirname(ffmpeg), "--no-mtime", "--newline", "--progress", "--progress-template", "download:MOYU_PROGRESS:%(progress._percent_str)s", "--print", "before_dl:MOYU_META:%(title)j", "--no-simulate", "--paths", directory, "--output", "video.%(ext)s", "--", target.url]
  return new Promise((resolve, reject) => {
    const child = launch(executable, args, { stdio: ["ignore", "pipe", "pipe"], windowsHide: true, detached: process.platform !== "win32" })
    let stderr = "", partial = "", title = "", failure, finished = false
    const terminate = (error) => {
      if (finished || failure) return
      failure = error
      try {
        if (process.platform !== "win32") process.kill(-child.pid, "SIGTERM")
        else spawn("taskkill", ["/pid", String(child.pid), "/t", "/f"], { stdio: "ignore", windowsHide: true }).once("error", () => child.kill())
      } catch {}
      const timer = setTimeout(() => { try { if (process.platform !== "win32") process.kill(-child.pid, "SIGKILL"); else child.kill("SIGKILL") } catch {} }, 1500)
      timer.unref?.(); child.once("close", () => clearTimeout(timer))
    }
    const abort = () => terminate(new Error("视频下载已取消"))
    signal?.addEventListener("abort", abort, { once: true })
    if (signal?.aborted) abort()
    child.stdout.on("data", (chunk) => {
      partial += chunk.toString()
      if (partial.length > 8192) partial = partial.slice(-8192)
      const lines = partial.split(/\r?\n/); partial = lines.pop() || ""
      for (const line of lines) {
        if (line.startsWith("MOYU_META:")) { try { title = cleanText(JSON.parse(line.slice(10))).slice(0, 180) } catch {} }
        const match = line.match(/MOYU_PROGRESS:\s*([\d.]+)%/)
        if (match) onProgress({ percent: Math.min(99, Number(match[1])), phase: "downloading" })
      }
    })
    child.stderr.on("data", (chunk) => { stderr = (stderr + chunk.toString()).slice(-4000) })
    const deadline = setTimeout(() => terminate(new Error("视频下载超过 10 分钟，已停止")), 600000)
    let checking = false
    const quota = setInterval(async () => {
      if (checking || finished) return
      checking = true
      try {
        const files = await readdir(directory)
        const sizes = await Promise.all(files.map((name) => stat(join(directory, name)).then((item) => item.size).catch(() => 0)))
        if (sizes.reduce((sum, size) => sum + size, 0) > MAX_VIDEO_BYTES * 2) terminate(new Error("视频下载临时文件超过 512 MiB 限制"))
      } catch (error) { if (!finished) terminate(new Error("无法检查下载缓存：" + safeError(error.message))) }
      finally { checking = false }
    }, 500)
    const clean = () => { finished = true; clearTimeout(deadline); clearInterval(quota); signal?.removeEventListener("abort", abort) }
    child.once("error", (error) => { clean(); reject(new Error("下载器无法启动：" + safeError(error.message))) })
    child.once("close", async (code) => {
      clean()
      if (failure) return reject(failure)
      if (code !== 0) return reject(new Error(downloadFailure(stderr || "下载器退出 " + code, target.platform)))
      try {
        const names = (await readdir(directory)).filter((name) => /^video\.(mp4|mkv|webm|mov|avi|m4v|mpeg|mpg)$/.test(name))
        if (names.length !== 1) throw new Error("未取得完整视频，可能受登录、时长、大小或格式限制")
        const path = join(directory, names[0])
        if ((await stat(path)).size > MAX_VIDEO_BYTES) throw new Error("视频超过 256 MiB 限制")
        resolve({ path, title })
      } catch (error) { reject(error) }
    })
  })
}

/** @param {{directory: string, keyFile?: string, read?: Function, download?: typeof downloadVideo}} options */
export function createVideoIngestion({ directory, keyFile, read, download = downloadVideo }) {
  const store = new LibraryStore(directory, { keyFile }), settings = new MediaSettings(store), cache = new MediaCache(store)
  const platforms = createVideoPlatforms({ settings, ...(read ? { read } : {}) })
  async function cleanup() {
    await cache.removeStalePlayback()
    const workRoot = join(store.internal, "downloads")
    await mkdir(workRoot, { recursive: true, mode: 0o700 })
    for (const entry of await readdir(workRoot, { withFileTypes: true })) {
      if (!entry.isDirectory() || !/^\d+-[a-f0-9]{24}-[A-Za-z0-9]{6}$/.test(entry.name)) continue
      try { process.kill(Number(entry.name.split("-")[0]), 0) } catch (error) { if (error.code === "ESRCH") await rm(join(workRoot, entry.name), { recursive: true, force: true }) }
    }
  }
  async function importVideo({ url, signal, onProgress = (_value) => {} }) {
    const target = videoUrl(url), id = stableId("video:" + target.url)
    return store.withJobLock(id, async () => {
      signal?.throwIfAborted()
      const existing = (await store.resources()).find((item) => item.id === id)
      if (existing) { try { await access(cache.path(id)); return { resource: existing, cached: true } } catch (error) { if (error.code !== "ENOENT") throw error } }
      const workRoot = join(store.internal, "downloads")
      await mkdir(workRoot, { recursive: true, mode: 0o700 })
      const work = await mkdtemp(join(workRoot, process.pid + "-" + id + "-"))
      try {
        onProgress({ phase: "resolving", percent: 0 })
        let details
        if (target.platform === "bilibili" || await settings.key()) {
          try { details = await platforms.info(target.url, { signal }) } catch { signal?.throwIfAborted() }
        }
        const media = await download(target.url, work, { signal, onProgress })
        signal?.throwIfAborted()
        const info = await inspectVideo(media.path)
        signal?.throwIfAborted()
        onProgress({ phase: "encrypting", percent: 99 })
        const path = await cache.seal(id, media.path)
        signal?.throwIfAborted()
        const resource = { schemaVersion: 1, id, kind: "video", title: media.title || details?.title || info.title, source: { adapter: target.platform, url: target.url }, assets: [{ role: "media", mime: "application/x-moyu-video", path }], metadata: { author: details?.author, description: details?.description, views: details?.views, metadataFetched: Boolean(details), width: info.width, height: info.height, duration: info.duration, hasAudio: info.hasAudio, managedMedia: true, extension: extname(media.path) }, updatedAt: new Date().toISOString() }
        await store.putResource(resource)
        return { resource, cached: false }
      } catch (error) {
        await rm(cache.path(id), { force: true })
        throw error
      } finally { await rm(work, { recursive: true, force: true }) }
    })
  }
  return { store, settings, cache, platforms, importVideo, cleanup }
}
