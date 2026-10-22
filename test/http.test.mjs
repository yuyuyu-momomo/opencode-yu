import test from "node:test"
import assert from "node:assert/strict"
import http from "node:http"
import { createHttpClient } from "../src/core/http.mjs"

test("实际 HTTP 处理重定向、GBK 编码、响应上限和总超时", async () => {
  const server = http.createServer((req, res) => {
    if (req.url === "/redirect") { res.writeHead(302, { Location: "/gbk" }); res.end(); return }
    if (req.url === "/gbk") { res.writeHead(200, { "Content-Type": "text/html; charset=gbk" }); res.end(Buffer.from([0xc4, 0xe3, 0xba, 0xc3])); return }
    if (req.url === "/large") { res.writeHead(200, { "Content-Type": "text/plain" }); res.end("x".repeat(1000)); return }
    if (req.url === "/slow") return
  })
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
  const base = "http://127.0.0.1:" + server.address().port
  try {
    const read = createHttpClient({ allowPrivate: true, useProxy: false, maxBytes: 50, timeoutMs: 200 })
    assert.equal((await read(base + "/redirect")).text, "你好")
    await assert.rejects(read(base + "/large"), /大小限制/)
    await assert.rejects(read(base + "/slow"), /超时|总时限/)
  } finally { server.closeAllConnections(); await new Promise((resolve) => server.close(resolve)) }
})
