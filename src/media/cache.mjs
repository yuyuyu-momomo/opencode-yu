import { createCipheriv, createDecipheriv, randomBytes, randomUUID } from "node:crypto"
import { createReadStream, createWriteStream } from "node:fs"
import { mkdir, open, readdir, writeFile, rename, rm, stat } from "node:fs/promises"
import { join } from "node:path"
import { pipeline } from "node:stream/promises"
import { inspectVideo } from "./runtime.mjs"
import { resolveLocalVideo } from "../sources/local-video.mjs"

const magic = Buffer.from("MOYUVID1"), aad = Buffer.from("opencode-moyu:video:v1")
export const MAX_VIDEO_BYTES = 256 * 1024 * 1024
export class MediaCache {
  constructor(library) { this.library = library; this.directory = join(library.internal, "media"); this.playback = join(library.internal, "playback") }
  path(id) { if (!/^[a-f0-9]{24}$/.test(id)) throw new Error("无效视频 ID"); return join(this.directory, id + ".moyuvid") }
  async seal(id, source) {
    const size = (await stat(source)).size
    if (size > MAX_VIDEO_BYTES) throw new Error("视频超过 256 MiB 限制")
    await mkdir(this.directory, { recursive: true, mode: 0o700 })
    const target = this.path(id), temporary = target + "." + randomUUID() + ".tmp"
    const nonce = randomBytes(12), cipher = createCipheriv("aes-256-gcm", await this.library.vault.key(), nonce)
    cipher.setAAD(aad)
    try {
      await writeFile(temporary, Buffer.concat([magic, nonce, Buffer.alloc(16)]), { flag: "wx", mode: 0o600 })
      await pipeline(createReadStream(source), cipher, createWriteStream(temporary, { flags: "a" }))
      const file = await open(temporary, "r+")
      try { await file.write(cipher.getAuthTag(), 0, 16, 20) } finally { await file.close() }
      await rename(temporary, target)
      return target
    } finally { await rm(temporary, { force: true }) }
  }
  async removeStalePlayback() {
    await mkdir(this.playback, { recursive: true, mode: 0o700 })
    for (const entry of await readdir(this.playback, { withFileTypes: true })) {
      if (!entry.isDirectory() || !/^\d+-[a-f0-9-]{36}$/.test(entry.name)) continue
      const pid = Number(entry.name.split("-")[0])
      try { process.kill(pid, 0) } catch (error) { if (error.code === "ESRCH") await rm(join(this.playback, entry.name), { recursive: true, force: true }) }
    }
  }
  async open(resource) {
    if (resource.source.adapter === "local-video") return resolveLocalVideo(resource)
    if (resource.kind !== "video" || !resource.metadata.managedMedia) throw new Error("视频尚未下载，请先从来源导入")
    const path = this.path(resource.id), info = await stat(path)
    if (info.size > MAX_VIDEO_BYTES + 36 || info.size < 36) throw new Error("视频缓存大小异常")
    const file = await open(path, "r"), header = Buffer.alloc(36)
    try { await file.read(header, 0, 36, 0) } finally { await file.close() }
    if (!header.subarray(0, 8).equals(magic)) throw new Error("视频缓存格式不支持")
    await this.removeStalePlayback()
    const temporary = join(this.playback, process.pid + "-" + randomUUID())
    await mkdir(temporary, { mode: 0o700 })
    const extension = /^\.(mp4|mkv|webm|mov|avi|m4v|mpeg|mpg|gif)$/.test(resource.metadata.extension || "") ? resource.metadata.extension : ".mp4"
    const decoded = join(temporary, "video" + extension)
    const release = () => rm(temporary, { recursive: true, force: true, maxRetries: 4, retryDelay: 200 })
    try {
      const decipher = createDecipheriv("aes-256-gcm", await this.library.vault.key(false), header.subarray(8, 20))
      decipher.setAAD(aad); decipher.setAuthTag(header.subarray(20, 36))
      await pipeline(createReadStream(path, { start: 36 }), decipher, createWriteStream(decoded, { flags: "wx", mode: 0o600 }))
      return { ...await inspectVideo(decoded), id: resource.id, title: resource.title, release }
    } catch {
      await release()
      throw new Error("视频缓存无法解密或播放，请检查密钥及文件完整性后重新下载")
    }
  }
}
