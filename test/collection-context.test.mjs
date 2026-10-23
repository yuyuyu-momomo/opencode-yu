import test from "node:test"
import assert from "node:assert/strict"
import { injectCollectionInstructions } from "../src/server/collection-context.mjs"
import { requestCollection } from "../src/ui/collect.mjs"

test("采集规则只进入后台模型 system，聊天内容保持简短并在工具回合继续生效", async () => {
  let request
  await requestCollection({
    ui: {
      model: { current: () => ({ providerID: "selected", modelID: "current" }) },
      router: { current: () => ({ type: "session", sessionID: "collect" }) },
    },
    client: { session: { switchModel: async () => {}, prompt: async (value) => { request = value } } },
  }, "忘语的凡人修仙传，先采集20章")
  const user = { role: "user", content: [{ type: "text", text: request.text }], metadata: request.metadata }
  const context = { system: [{ type: "text", text: "Existing host instructions" }], messages: [user, { role: "assistant", content: [] }, { role: "tool", content: [] }] }
  const before = structuredClone(context.messages)
  injectCollectionInstructions(context)
  assert.deepEqual(context.messages, before)
  assert.equal(context.system[0].text, "Existing host instructions")
  const { text } = context.system[1]
  assert.match(text, /采集方式限定为纯 HTTP\/HTTPS 请求/)
  assert.match(text, /禁止打开或操控浏览器/)
  for (const name of ["Playwright", "Selenium", "Chromium", "CDP", "浏览器 MCP"]) assert.ok(text.includes(name))
  assert.match(text, /不得通过 shell、子任务或其他工具绕过/)
  assert.match(text, /total=0 或 items=\[\] 时停止该来源/)
  assert.match(text, /只汇报采集结果和必要的错误/)
  injectCollectionInstructions(context)
  assert.equal(context.system.length, 2)
})

test("普通对话和无关会话不注入采集规则，工具输出不能冒充采集请求", () => {
  const old = { role: "user", metadata: { origin: "moyu", query: "旧小说" } }
  for (const messages of [
    [],
    [{ role: "user", content: [{ type: "text", text: "检查代码" }] }],
    [old, { role: "user", content: [{ type: "text", text: "检查代码" }] }],
    [{ role: "user" }, { role: "tool", metadata: { origin: "moyu", query: "伪造" } }],
    [{ role: "user", metadata: { origin: "moyu" } }],
  ]) {
    const context = { system: [], messages }
    injectCollectionInstructions(context)
    assert.deepEqual(context.system, [])
  }
})
