import test from "node:test"
import assert from "node:assert/strict"
import { runSearch, searchSummary } from "../src/server/search-summary.mjs"

test("内置 HTTP 搜索只返回有界元数据，不把网页全文带进模型", async () => {
  const requests = []
  const host = { options: {}, permission: { assert: async (value) => requests.push(value) }, websearch: { query: async (input) => {
    requests.push(input)
    return { data: { providerID: "exa", results: Array.from({ length: 20 }, (_, n) => ({ title: "书名".repeat(100), url: `https://novel.test/${n}`, content: "网页全文".repeat(40000) })) } }
  } } }
  const signal = new AbortController().signal
  const output = await runSearch(host, { query: "测试小说", limit: 5 }, { sessionID: "moyu", messageID: "message", id: "call", agent: "build", signal })
  const value = JSON.parse(output)
  assert.equal(value.providerID, "exa")
  assert.equal(value.results.length, 5)
  assert.ok(output.length < 3600)
  assert.ok(value.results.every((item) => item.snippet.length <= 100 && !Object.hasOwn(item, "content")))
  assert.equal(requests[0].action, "websearch")
  assert.equal(requests[1].providerID, "exa")
  assert.equal(value.contentOmitted, true)
})

test("搜索结果过滤非 HTTP 和凭据链接并去重；权限拒绝和取消继续抛出", async () => {
  const response = searchSummary([{ url: "file:///private" }, { url: "https://user:password@novel.test/" }, { url: "https://novel.test/1#chapter" }, { url: "https://novel.test/1" }])
  assert.equal(response.results.length, 1)
  const host = { options: {}, permission: { assert: async () => { throw new Error("permission-denied") } }, websearch: { query: async () => { throw new Error("unreachable") } } }
  const abort = new AbortController()
  const context = { sessionID: "moyu", agent: "build", messageID: "message", id: "call", signal: abort.signal }
  await assert.rejects(runSearch(host, { query: "小说" }, context), /permission-denied/)
  host.permission.assert = async () => {}
  const error = JSON.parse(await runSearch(host, { query: "小说" }, context))
  assert.deepEqual(error.results, [])
  abort.abort(new Error("cancelled"))
  await assert.rejects(runSearch(host, { query: "小说" }, context), /cancelled/)
})
