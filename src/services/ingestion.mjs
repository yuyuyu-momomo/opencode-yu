import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { setTimeout as delay } from "node:timers/promises"
import { createHttpClient, httpUrl } from "../core/http.mjs"
import { LibraryStore, atomicWrite, safeTitle, stableId } from "../library/store.mjs"
import { createSourceRegistry } from "../sources/index.mjs"

/** All transports and registries are injectable; no OpenCode objects enter this layer.
 * @param {{directory: string, keyFile?: string, registry?: any, readPage?: Function, delayMs?: number}} options
 */
export function createIngestion({ directory, keyFile, registry = createSourceRegistry(), readPage = createHttpClient(), delayMs = 800 } = {}) {
  const store = new LibraryStore(directory, { keyFile })
  function context(input) {
    const cache = new Map()
    return {
      signal: input.signal,
      selectors: input.selectors,
      page(url) {
        const key = httpUrl(url).href
        if (!cache.has(key)) cache.set(key, readPage(key, { signal: input.signal }))
        return cache.get(key)
      },
    }
  }
  async function catalog(input) {
    const url = httpUrl(input.url).href
    const adapter = registry.resolve(url, input.sourceId)
    if (!adapter.capabilities.includes("catalog")) throw new Error("这个来源不提供目录能力")
    return { sourceId: adapter.id, ...await adapter.catalog(url, context(input)) }
  }
  async function importBatch(input) {
    const url = httpUrl(input.url).href
    const adapter = registry.resolve(url, input.sourceId)
    if (!adapter.capabilities.includes("fetch")) throw new Error("这个来源不提供获取能力")
    const id = stableId(adapter.id + ":" + url)
    return store.withJobLock(id, async () => {
      const ctx = context(input)
      let job = await store.readJob(id)
      if (!job) {
        const listing = await adapter.catalog(url, ctx)
        if (listing.kind !== "novel") throw new Error(`文字入库服务暂不支持 ${listing.kind}；请为该类型注册采集服务`)
        job = {
          schemaVersion: 1, id, sourceId: adapter.id, url, kind: listing.kind,
          title: input.title || listing.title,
          items: listing.items.length ? listing.items : [{ id: url, url, title: listing.title, kind: listing.kind }],
          completed: [], status: "pending", createdAt: new Date().toISOString(),
        }
      }
      const limit = Math.max(1, Math.min(50, Math.trunc(input.limit ?? 5)))
      const first = input.start ?? job.items.findIndex((_item, index) => !job.completed.includes(index))
      job.status = "running"
      delete job.error
      let added = 0
      await store.writeJob(job)
      try {
        for (let index = Math.max(0, first); first !== -1 && index < Math.min(job.items.length, first + limit); index++) {
          input.signal?.throwIfAborted()
          if (job.completed.includes(index)) continue
          if (added) await delay(delayMs, undefined, { signal: input.signal })
          input.onProgress?.({ title: job.title, current: index + 1, total: job.items.length })
          const item = job.items[index]
          const content = await adapter.fetch(item, ctx)
          if (content.mime !== "text/plain") throw new Error(`文字入库服务不支持 ${content.mime}`)
          if (Buffer.byteLength(content.text) > 2 * 1024 * 1024) throw new Error("单章正文超过大小限制")
          const chapterText = content.text.startsWith(item.title) ? content.text : item.title + "\n\n" + content.text
          await store.writePart(id, index, chapterText)
          job.completed.push(index)
          job.updatedAt = new Date().toISOString()
          await store.writeJob(job)
          added++
        }
        job.status = job.completed.length === job.items.length ? "complete" : "partial"
      } catch (error) {
        job.status = input.signal?.aborted ? "cancelled" : "failed"
        job.error = error instanceof Error ? error.message : String(error)
      }
      let path
      if (job.completed.length) {
        const parts = [job.title]
        let size = Buffer.byteLength(job.title)
        for (const index of [...job.completed].sort((a, b) => a - b)) {
          const part = await store.readPart(id, index)
          size += Buffer.byteLength(part) + 4
          if (size > 32 * 1024 * 1024) throw new Error("单本超过 32 MiB，请拆分为多个采集来源")
          parts.push(part)
        }
        path = await store.writeBook(id, job.title, parts.join("\n\n"))
        await store.putResource({
          schemaVersion: 1, id, kind: job.kind, title: job.title,
          source: { adapter: adapter.id, url }, assets: [{ role: "body", mime: "application/x-moyu-book", path }],
          metadata: { chapters: job.completed.length, totalChapters: job.items.length, status: job.status },
          updatedAt: new Date().toISOString(),
        })
      }
      job.updatedAt = new Date().toISOString()
      await store.writeJob(job)
      return {
        id, title: job.title, status: job.status, added,
        downloaded: job.completed.length, total: job.items.length,
        remaining: job.items.length - job.completed.length,
        nextStart: job.items.findIndex((_item, index) => !job.completed.includes(index)),
        path, error: job.error,
        nextAction: job.error ? "停止并检查来源错误，不要自动无限重试" : job.status === "complete" ? "按 Alt+O，在书架打开小说" : "使用同一 URL 再次调用 moyu_import，自动继续未完成章节",
      }
    })
  }
  return { registry, store, catalog, importBatch }
}
