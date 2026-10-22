import test from "node:test"
import assert from "node:assert/strict"
import { mkdtemp, readFile, access, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { tmpdir } from "node:os"
import { createIngestion } from "../src/services/ingestion.mjs"
import { LibraryVault } from "../src/library/vault.mjs"
import { LibraryStore } from "../src/library/store.mjs"
import { loadBook } from "../src/library/text-reader.mjs"
import { SourceRegistry } from "../src/core/registry.mjs"
import { isPublicAddress, createHttpClient } from "../src/core/http.mjs"
import { parseCatalog } from "../src/sources/html-novel.mjs"

const catalog = '<h1>测试小说</h1><a href="/1">第一章 雨夜</a><a href="/2">第二章 晴天</a><a href="/1">第一章 重复</a><a href="https://elsewhere.test/3">第三章 外站</a>'
const chapter = (n) => `<html><h1>第${n}章</h1><article><p>这是需要保存的真实章节正文，应该加密进入资料库，不能出现在明文缓存里。</p><p>这是第二段正文，保留段落换行。</p><script>bad()</script></article></html>`

test("目录去重、同站约束、分批续采、加密入库、删除缓存", async () => {
  const dir = await mkdtemp(join(tmpdir(), "moyu-ingest-"))
  let calls = []
  const readPage = async (url) => { calls.push(url); return { url, contentType: "text/html", text: url.endsWith("/index") ? catalog : chapter(url.slice(-1)) } }
  const service = createIngestion({ directory: join(dir, "books"), readPage, delayMs: 0 })
  const listing = await service.catalog({ url: "https://novel.test/index" })
  assert.equal(listing.items.length, 2)
  const first = await service.importBatch({ url: "https://novel.test/index", limit: 1 })
  assert.equal(first.remaining, 1)
  assert.equal(first.downloaded, 1)
  assert.equal(first.status, "partial")
  assert.ok(!(await readFile(first.path)).includes(Buffer.from("真实章节正文")))
  const second = await service.importBatch({ url: "https://novel.test/index", limit: 1 })
  assert.equal(second.status, "complete")
  assert.equal(second.added, 1)
  assert.equal(calls.filter((url) => url.endsWith("/1")).length, 1)
  const book = await loadBook(second.path)
  assert.ok(book.text.includes("保留段落换行"))
  assert.ok(!book.text.includes("bad()"))
  const third = await service.importBatch({ url: "https://novel.test/index" })
  assert.equal(third.added, 0)
  assert.equal((await service.store.resources()).length, 1)
  await service.store.deleteResource(second.id)
  await assert.rejects(access(second.path))
  assert.equal((await service.store.resources()).length, 0)
  assert.equal(await service.store.readJob(second.id), undefined)
  await assert.rejects(access(service.store.partPath(second.id, 0)))
})

test("采集失败记录断点，下次恢复且不重复成功章节", async () => {
  const dir = await mkdtemp(join(tmpdir(), "moyu-resume-"))
  let fail = true, firstRequests = 0
  const readPage = async (url) => {
    if (url.endsWith("/index")) return { url, contentType: "text/html", text: catalog }
    if (url.endsWith("/1")) firstRequests++
    if (url.endsWith("/2") && fail) throw new Error("HTTP 503")
    return { url, contentType: "text/html", text: chapter(1) }
  }
  const service = createIngestion({ directory: join(dir, "books"), readPage, delayMs: 0 })
  assert.equal((await service.importBatch({ url: "https://novel.test/index" })).status, "failed")
  fail = false
  const result = await service.importBatch({ url: "https://novel.test/index" })
  assert.equal(result.status, "complete")
  assert.equal(firstRequests, 1)
})

test("AES-GCM 检测密文篡改与错误密钥", async () => {
  const dir = await mkdtemp(join(tmpdir(), "moyu-crypto-"))
  const vault = new LibraryVault(join(dir, "one.key"))
  const encrypted = await vault.seal({ text: "私密正文" })
  assert.deepEqual(await vault.unseal(encrypted), { text: "私密正文" })
  const changed = Buffer.from(encrypted); changed[changed.length - 1] ^= 1
  await assert.rejects(vault.unseal(changed), /解密失败/)
  await assert.rejects(new LibraryVault(join(dir, "two.key")).unseal(encrypted), /解密失败/)
})

test("本地导入只删除加密副本，原文件保留", async () => {
  const dir = await mkdtemp(join(tmpdir(), "moyu-local-"))
  const original = join(dir, "source.txt")
  await writeFile(original, "第一章\n需要保留的外部原文件")
  const store = new LibraryStore(join(dir, "books"))
  const imported = await store.importLocal(await loadBook(original))
  await store.deleteResource(imported.resourceId)
  assert.equal(await readFile(original, "utf8"), "第一章\n需要保留的外部原文件")
})

test("来源注册支持新增视频适配器，核心服务无需改网站逻辑", () => {
  const registry = new SourceRegistry().register({ id: "video-demo", name: "视频元数据", kinds: ["video"], capabilities: ["catalog"], matches: () => true, catalog: async () => ({ title: "Video", kind: "video", items: [] }) })
  assert.equal(registry.resolve("https://video.test").id, "video-demo")
  assert.deepEqual(registry.list()[0].kinds, ["video"])
})

test("网络入口拒绝私网与携带凭据的来源", async () => {
  for (const address of ["127.0.0.1", "10.1.2.3", "192.168.1.1", "::1", "::ffff:127.0.0.1", "fc00::1"]) assert.equal(isPublicAddress(address), false)
  assert.equal(isPublicAddress("1.1.1.1"), true)
  await assert.rejects(createHttpClient()("http://127.0.0.1/"), /不能指向/)
  await assert.rejects(createHttpClient()("https://name:secret@example.com/"), /凭据/)
})
