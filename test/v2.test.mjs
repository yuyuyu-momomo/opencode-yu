import test from "node:test"
import assert from "node:assert/strict"
import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import plugin from "../dist/server-v2.js"

test("2.x 模型工具保留参数校验、服务执行及权限拒绝", async () => {
  const directory = await mkdtemp(join(tmpdir(), "moyu-tools-v2-"))
  const tools = new Map()
  let disposed = false
  const requests = []
  const context = { sessionID: "test-session", messageID: "test-message", agent: "build", id: "test-call", signal: new AbortController().signal, progress: async () => {} }
  const cleanup = await plugin.setup({
    options: { booksDir: join(directory, "books"), keyFile: join(directory, "keys/library.key") },
    location: { directory },
    permission: { async assert(request) { requests.push(request); throw new Error("test-permission-denied") } },
    tool: { async transform(callback) {
      callback({ add(value) { tools.set(value.name, value) } })
      return { async dispose() { disposed = true } }
    } },
  })
  try {
    assert.deepEqual([...tools.keys()].sort(), ["moyu_catalog", "moyu_delete", "moyu_import", "moyu_library", "moyu_sources"])
    const sources = JSON.parse((await tools.get("moyu_sources").execute({}, context)).content)
    assert.equal(sources[0].id, "html-novel")
    const shelf = JSON.parse((await tools.get("moyu_library").execute({}, context)).content)
    assert.deepEqual(shelf.resources, [])
    const schema = tools.get("moyu_import").input["~standard"]
    const valid = await schema.validate({ url: "https://example.com/book" })
    assert.equal(valid.value.limit, 5)
    assert.ok((await schema.validate({ url: "not-a-url", limit: 99 })).issues.length)
    await assert.rejects(tools.get("moyu_catalog").execute({ url: "https://example.com/book", start: 0, limit: 5 }, context), /test-permission-denied/)
    assert.equal(requests[0].action, "webfetch")
    assert.deepEqual(requests[0].resources, ["https://example.com/book"])
    assert.deepEqual(requests[0].source, { type: "tool", messageID: "test-message", id: "test-call" })
    await assert.rejects(tools.get("moyu_delete").execute({ id: "a".repeat(24) }, context), /test-permission-denied/)
    assert.equal(requests[1].action, "moyu.delete")
  } finally {
    await cleanup()
    assert.equal(disposed, true)
    await rm(directory, { recursive: true, force: true })
  }
})
