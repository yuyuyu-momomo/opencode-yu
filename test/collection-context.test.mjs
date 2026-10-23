import test from "node:test"
import assert from "node:assert/strict"
import { injectCollectionInstructions, prepareCollectionCompaction } from "../src/server/collection-context.mjs"
import { requestCollection } from "../src/ui/collect.mjs"

test("采集规则只进入后台模型 system，聊天内容保持简短并在工具回合继续生效", async () => {
  let request
  await requestCollection({
    ui: {
      model: { current: () => ({ providerID: "selected", modelID: "current" }) },
      router: { current: () => ({ type: "session", sessionID: "collect" }), navigate: () => {} },
    },
    location: { directory: "/project" },
    client: { session: { create: async () => ({ id: "fresh-task" }), prompt: async (value) => { request = value } } },
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

test("Moyu 压缩精简历史搜索正文，并要求模型返回文字摘要；普通代码会话不受影响", () => {
  const long = "## [测试小说目录](https://novel.test/list)\n\n" + "冗长搜索正文".repeat(9000)
  for (const result of [{ type: "text", value: long }, { type: "content", value: [{ type: "text", text: long }, { type: "text", text: "saved to file" }] }]) {
    const context = { messages: [{ role: "user", metadata: { origin: "moyu", query: "小说" } }, { role: "tool", content: [{ type: "tool-result", name: "websearch", result: structuredClone(result) }] }], tools: { websearch: {}, execute: {} } }
    prepareCollectionCompaction(context)
    assert.deepEqual(context.tools, {})
    const compacted = context.messages[1].content[0].result
    assert.equal(compacted.type, "text")
    assert.ok(compacted.value.length < 1000)
    assert.match(compacted.value, /https:\/\/novel.test\/list/)
    assert.doesNotMatch(compacted.value, /冗长搜索正文/)
    const ordinary = { messages: [{ role: "user" }], tools: { websearch: {}, execute: {} } }
    const before = structuredClone(ordinary)
    prepareCollectionCompaction(ordinary)
    assert.deepEqual(ordinary, before)
  }
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
