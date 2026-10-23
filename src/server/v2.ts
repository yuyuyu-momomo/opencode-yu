import { Plugin } from "@opencode/plugin"
import { tool } from "@opencode-ai/plugin"
import legacy from "./index"
import { injectCollectionInstructions } from "./collection-context.mjs"

export default Plugin.define({
  id: "opencode-moyu-server",
  async setup(host) {
    const hooks = await legacy.server!({} as never, host.options)
    const registration = await host.tool.transform((editor) => {
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
    try {
      const context = await host.session.hook("context", injectCollectionInstructions)
      return async () => {
        await context.dispose()
        await registration.dispose()
      }
    } catch (error) {
      await registration.dispose()
      throw error
    }
  },
})
