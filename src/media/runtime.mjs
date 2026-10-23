import { spawn, execFile } from "node:child_process"
import { access, readdir, realpath, stat } from "node:fs/promises"
import { constants } from "node:fs"
import { join, delimiter, extname, basename } from "node:path"
import { homedir } from "node:os"
import { promisify } from "node:util"
import { expandPath } from "../library/text-reader.mjs"

const execute = promisify(execFile)
const binaries = new Map()
export async function mediaBinary(name) {
  if (binaries.has(name)) return binaries.get(name)
  const custom = process.env["MOYU_" + name.toUpperCase()]
  const dirs = [process.env.MOYU_MEDIA_BIN, join(homedir(), ".local/share/opencode-moyu/media/bin"), ...(process.env.PATH || "").split(delimiter)].filter(Boolean)
  // Reuse an existing decoder without changing the user's active environment.
  for (const root of ["miniconda3", "miniforge3", "anaconda3"]) {
    const base = join(homedir(), root)
    dirs.push(join(base, "bin"))
    for (const env of (await readdir(join(base, "envs")).catch(() => [])).slice(0, 32)) dirs.push(join(base, "envs", env, "bin"))
  }
  const candidates = custom ? [custom] : dirs.flatMap((dir) => process.platform === "win32" ? [join(dir, name + ".exe")] : [join(dir, name), join(dir, name + ".exe")])
  for (const path of candidates) {
    try {
      await access(path, constants.X_OK)
      await execute(path, ["-version"], { timeout: 5000, maxBuffer: 32768, windowsHide: true })
      binaries.set(name, path)
      return path
    } catch {}
  }
  throw new Error(`未找到 ${name}。请安装 FFmpeg（含 ffprobe / ffplay），或设置 MOYU_MEDIA_BIN 指向其 bin 目录。`)
}

export async function nativeMediaPath(binary, path) {
  if (process.platform !== "win32" && binary.toLowerCase().endsWith(".exe")) return (await execute("wslpath", ["-w", path], { timeout: 5000 })).stdout.trim()
  return path
}

/** Local resolver is separate from future HTTP download/cache adapters. */
export async function inspectVideo(input, cwd) {
  if (/^[a-z]+:\/\//i.test(input.trim())) throw new Error("首版支持本地视频，请输入文件路径")
  const path = await realpath(expandPath(input, cwd))
  const info = await stat(path)
  if (!info.isFile() || !/\.(mp4|mkv|webm|mov|avi|m4v|mpeg|mpg|gif)$/i.test(path)) throw new Error("请选择 MP4、MKV、WebM、MOV、AVI 或 GIF 视频文件")
  const binary = await mediaBinary("ffprobe")
  const { stdout } = await execute(binary, ["-v", "error", "-protocol_whitelist", "file,pipe", "-show_entries", "stream=codec_type,width,height,sample_aspect_ratio:stream_tags=rotate:stream_side_data=rotation:format=duration", "-of", "json", await nativeMediaPath(binary, path)], { timeout: 15000, maxBuffer: 256 * 1024, windowsHide: true })
  const data = JSON.parse(stdout), video = data.streams?.find((stream) => stream.codec_type === "video")
  if (!video?.width || !video.height) throw new Error("文件没有可播放的视频轨道")
  const duration = Number(data.format?.duration)
  if (!Number.isFinite(duration) || duration <= 0) throw new Error("暂不支持无法确定时长的视频")
  const sar = String(video.sample_aspect_ratio || "1:1").split(":").map(Number)
  let width = video.width * (sar[0] > 0 && sar[1] > 0 ? sar[0] / sar[1] : 1), height = video.height
  const rotation = Number(video.side_data_list?.find((item) => item.rotation !== undefined)?.rotation ?? video.tags?.rotate ?? 0)
  if (Math.abs(rotation) % 180 === 90) [width, height] = [height, width]
  return { path, title: basename(path, extname(path)), width, height, duration, hasAudio: data.streams.some((stream) => stream.codec_type === "audio") }
}

export function launchMedia(binary, args) {
  return spawn(binary, args, { stdio: ["ignore", "pipe", "pipe"], windowsHide: true })
}

export function stopMedia(child) {
  if (!child || child.exitCode !== null || child.signalCode) return
  child.kill("SIGTERM")
  const timer = setTimeout(() => { if (child.exitCode === null && !child.signalCode) child.kill("SIGKILL") }, 1000)
  timer.unref?.()
  child.once("close", () => clearTimeout(timer))
}
