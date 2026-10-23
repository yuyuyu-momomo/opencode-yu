import { readFile, unlink, mkdir } from "node:fs/promises"
import { join } from "node:path"
import { atomicWrite } from "../library/store.mjs"

export class MediaSettings {
  constructor(library) { this.library = library; this.path = join(library.internal, "settings", "youtube.enc") }
  async key() {
    try { return (await this.library.vault.unseal(await readFile(this.path))).apiKey || "" }
    catch (error) { if (error.code !== "ENOENT") throw error }
    return process.env.YOUTUBE_API_KEY || ""
  }
  async status() {
    return { youtubeApiKeyConfigured: Boolean(await this.key()) }
  }
  async saveKey(input) {
    const apiKey = input.trim()
    if (!/^[A-Za-z0-9_-]{20,200}$/.test(apiKey)) throw new Error("API Key 格式不正确，请粘贴完整密钥")
    await mkdir(join(this.library.internal, "settings"), { recursive: true, mode: 0o700 })
    await atomicWrite(this.path, await this.library.vault.seal({ apiKey }))
    return this.status()
  }
  async removeKey() {
    await unlink(this.path).catch((error) => { if (error.code !== "ENOENT") throw error })
    return this.status()
  }
}
