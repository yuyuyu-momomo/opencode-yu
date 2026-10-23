import test from "node:test"
import assert from "node:assert/strict"
import { collectionQuery, requestCollection } from "../src/ui/collect.mjs"

function fixture(route = { type: "session", sessionID: "current-session" }) {
  const calls = []
  const host = {
    location: { directory: "/project" },
    ui: {
      model: { current: () => ({ providerID: "selected-provider", modelID: "selected-model", variant: "high" }) },
      router: { current: () => route, navigate: (value) => calls.push(["navigate", value]) },
    },
    client: { session: {
      switchModel: async (value) => calls.push(["model", value]),
      create: async (value) => { calls.push(["create", value]); return { id: "new-session" } },
      prompt: async (value) => { calls.push(["prompt", value]) },
    } },
  }
  return { host, calls }
}

test("/moyu 采集请求复用当前模型，在当前会话排队并要求实际调用入库工具", async () => {
  const { host, calls } = fixture()
  assert.equal(await requestCollection(host, "/moyu 忘语的凡人修仙传，先采集20章"), "current-session")
  assert.equal(calls[0][0], "model")
  assert.deepEqual(calls[0][1].model, { providerID: "selected-provider", id: "selected-model", variant: "high" })
  const request = calls[1][1]
  assert.equal(request.sessionID, "current-session")
  assert.equal(request.delivery, "queue")
  assert.match(request.text, /moyu_catalog/)
  assert.match(request.text, /moyu_import/)
  assert.match(request.text, /实际结果/)
  assert.equal(request.metadata.query, "忘语的凡人修仙传，先采集20章")
})

test("从首页采集时在当前项目创建会话，发送失败不会报告成功", async () => {
  const { host, calls } = fixture({ type: "home" })
  assert.equal(await requestCollection(host, "https://example.com/novel"), "new-session")
  assert.deepEqual(calls.map((row) => row[0]), ["create", "navigate", "prompt"])
  assert.equal(calls[0][1].location.directory, "/project")
  host.client.session.prompt = async () => { throw new Error("server-offline") }
  await assert.rejects(requestCollection(host, "凡人修仙传"), /server-offline/)
})

test("发送给模型的采集任务只允许 HTTP，不回退浏览器或导入空目录", async () => {
  const { host, calls } = fixture()
  await requestCollection(host, "/moyu 忘语的凡人修仙传，先采集20章")
  const { text } = calls.find(([name]) => name === "prompt")[1]
  assert.match(text, /采集方式限定为纯 HTTP\/HTTPS 请求/)
  assert.match(text, /禁止打开或操控浏览器/)
  for (const name of ["Playwright", "Selenium", "Chromium", "CDP", "浏览器 MCP"]) assert.ok(text.includes(name))
  assert.match(text, /不得通过 shell、子任务或其他工具绕过/)
  assert.match(text, /搜索接口不可用时报告缺少目录链接/)
  assert.match(text, /total=0 或 items=\[\] 时停止该来源/)
  assert.match(text, /不得把空目录当整本小说入库/)
  assert.match(text, /不要用网页工具把整页 HTML、全文或脚本灌进模型上下文/)
})

test("空命令只用于书架入口，不创建模型请求；缺少选中模型时报错", async () => {
  const { host, calls } = fixture()
  assert.equal(collectionQuery("/moyu"), "")
  await assert.rejects(requestCollection(host, "  "), /请输入/)
  host.ui.model.current = () => undefined
  await assert.rejects(requestCollection(host, "凡人修仙传"), /选择可用模型/)
  assert.deepEqual(calls, [])
})
