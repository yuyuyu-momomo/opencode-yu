import { mkdir, readFile, writeFile, rename, unlink, open, readdir, rm } from "node:fs/promises"
import { join } from "node:path"
import { randomUUID, createHash } from "node:crypto"
import { LibraryVault, defaultKeyFile } from "./vault.mjs"

export const stableId = (value) => createHash("sha256").update(value).digest("hex").slice(0, 24)
export const safeTitle = (value) => [...value.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").replace(/[. ]+$/, "")].slice(0, 80).join("") || "未命名"

export async function atomicWrite(path, content) {
  const temporary = path + "." + randomUUID() + ".tmp"
  try {
    await writeFile(temporary, content, { flag: "wx", mode: 0o600 })
    await rename(temporary, path)
  } finally {
    await unlink(temporary).catch((error) => { if (error.code !== "ENOENT") throw error })
  }
}

export class LibraryStore {
  constructor(directory, { keyFile = defaultKeyFile(directory) } = {}) { this.directory = directory; this.internal = join(directory, ".moyu"); this.vault = new LibraryVault(keyFile) }
  async ready() {
    for (const name of ["jobs", "resources", "parts"]) await mkdir(join(this.internal, name), { recursive: true })
  }
  jobPath(id) { return join(this.internal, "jobs", id + ".enc") }
  partPath(id, index) { return join(this.internal, "parts", id, String(index).padStart(6, "0") + ".enc") }
  async readJob(id) {
    try { return await this.vault.unseal(await readFile(this.jobPath(id))) } catch (error) { if (error.code === "ENOENT") return undefined; throw error }
  }
  async writeJob(job) { await atomicWrite(this.jobPath(job.id), await this.vault.seal(job)) }
  async writePart(id, index, text) {
    await mkdir(join(this.internal, "parts", id), { recursive: true })
    await atomicWrite(this.partPath(id, index), await this.vault.seal({ text }))
  }
  async putResource(resource) {
    await this.ready()
    await atomicWrite(join(this.internal, "resources", resource.id + ".enc"), await this.vault.seal(resource))
  }
  async resources() {
    await this.ready()
    const out = []
    for (const name of await readdir(join(this.internal, "resources"))) {
      if (name.endsWith(".enc")) out.push(await this.vault.unseal(await readFile(join(this.internal, "resources", name))))
    }
    return out
  }
  async readPart(id, index) { return (await this.vault.unseal(await readFile(this.partPath(id, index)))).text }
  async writeBook(id, title, text) {
    await this.ready()
    const path = join(this.directory, id + ".moyubook")
    await atomicWrite(path, await this.vault.seal({ schemaVersion: 1, resourceId: id, title, text }))
    return path
  }
  async importLocal(book) {
    const id = stableId("local:" + book.path)
    return this.withJobLock(id, async () => {
      const path = await this.writeBook(id, book.title, book.text)
      await this.putResource({ schemaVersion: 1, id, kind: "novel", title: book.title, source: { adapter: "local-text", url: book.path }, assets: [{ role: "body", mime: "application/x-moyu-book", path }], metadata: { imported: true }, updatedAt: new Date().toISOString() })
      return { ...book, path, resourceId: id }
    })
  }
  async deleteResource(id) {
    if (!/^[a-f0-9]{24}$/.test(id)) throw new Error("无效资料 ID")
    return this.withJobLock(id, async () => {
      for (const path of [join(this.directory, id + ".moyubook"), this.jobPath(id), join(this.internal, "resources", id + ".enc"), join(this.internal, "media", id + ".moyuvid")]) {
        await unlink(path).catch((error) => { if (error.code !== "ENOENT") throw error })
      }
      await rm(join(this.internal, "parts", id), { recursive: true, force: true })
      return { deleted: id, originalFilesPreserved: true }
    })
  }
  async withJobLock(id, fn) {
    await this.ready()
    const path = join(this.internal, "jobs", id + ".lock")
    let handle
    for (let attempt = 0; attempt < 2; attempt++) {
      try { handle = await open(path, "wx", 0o600); break } catch (error) {
        if (error.code !== "EEXIST") throw error
        const lock = JSON.parse(await readFile(path, "utf8"))
        let alive = true
        try { process.kill(lock.pid, 0) } catch (error) { if (error.code === "ESRCH") alive = false }
        if (alive) throw new Error("这本书已有采集任务在运行，请等待后重试")
        await unlink(path)
      }
    }
    if (!handle) throw new Error("无法取得采集任务锁")
    try {
      await handle.writeFile(JSON.stringify({ pid: process.pid, startedAt: new Date().toISOString() }))
      return await fn()
    } finally {
      await handle.close()
      await unlink(path)
    }
  }
}
