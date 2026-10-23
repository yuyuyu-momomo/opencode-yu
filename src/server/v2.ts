import { Plugin } from "@opencode/plugin"
import { tool } from "@opencode-ai/plugin"
import legacy from "./index"
import { injectCollectionInstructions, prepareCollectionCompaction } from "./collection-context.mjs"
import { runSearch } from "./search-summary.mjs"

export default Plugin.define({
  id: "opencode-moyu-server",
  async setup(host) {
    const hooks = await legacy.server!({} as never, host.options)
    const registration = await host.tool.transform((editor) => {
      editor.add({
        name: "moyu_search", description: "内置小说来源搜索，只用 HTTP 搜索接口，返回最多 5 个标题、URL 和简短摘要，不返回网页全文；不启动浏览器。找到来源后调用 moyu_catalog 和 moyu_import，正文由插件内置解析器加密入库。",
        input: tool.schema.object({ query: tool.schema.string().min(1).max(300), limit: tool.schema.number().int().min(1).max(5).default(5) }),
        async execute(input, context) { return { content: await runSearch(host, input, context) } },
      })
      for (const [name, definition] of Object.entries(hooks.tool ?? {})) {
        editor.add({
          name,
          description: definition.description,
          input: tool.schema.object(definition.args),
          async execute(input, context) {
            const content = await definition.execute(input, {
              sessionID: context.sessionID,
              messageID: context.messageID,
              agent: context.agent,
              directory: host.location.directory,
              worktree: host.location.directory,
              abort: context.signal,
              metadata(value) { void context.progress(value) },
              async ask(request) {
                await host.permission.assert({
                  sessionID: context.sessionID, agent: context.agent,
                  action: request.permission, resources: request.patterns,
                  save: request.always, metadata: request.metadata,
                  source: { type: "tool", messageID: context.messageID, id: context.id },
                })
              },
            })
            return typeof content === "string" ? { content } : { content: content.output, metadata: content.metadata }
          },
        })
      }
    })
    const subscriptions = [registration]
    try {
      subscriptions.push(await host.session.hook("context", injectCollectionInstructions))
      subscriptions.push(await host.session.hook("compaction", prepareCollectionCompaction))
      return async () => { for (const item of subscriptions.reverse()) await item.dispose() }
    } catch (error) {
      for (const item of subscriptions.reverse()) await item.dispose()
      throw error
    }
  },
})
