import { Plugin } from "@opencode/plugin/tui"
import type { TuiPlugin, TuiDialogPromptProps, TuiDialogConfirmProps, TuiDialogSelectProps } from "@opencode-ai/plugin/tui"
import type { JSX } from "@opentui/solid"
import legacy from "./index"

type ReaderAPI = Parameters<TuiPlugin>[0]
type Context = Parameters<Parameters<typeof Plugin.define>[0]["setup"]>[0]
type ReaderLayer = {
  mode?: string
  commands?: Array<{ name: string; title: string; category?: string; enabled?: () => boolean; slashName?: string; run: () => void | Promise<void> }>
  bindings?: Array<{ cmd: string; key: string }>
}

// Keep reading, encryption and pagination shared across both host generations.
export default Plugin.define({
  id: "opencode-moyu",
  async setup(context: Context) {
    const abort = new AbortController()
    const cleanup: Array<() => void | Promise<void>> = []
    const [state, update] = context.storage.store("reader", { initial: { values: {} as Record<string, unknown> } })
    const writes = new Set<Promise<void>>()
    let dialogGeneration = 0
    let onClose: (() => void) | undefined
    const finish = () => { const callback = onClose; onClose = undefined; callback?.() }
    function clear() {
      ++dialogGeneration
      context.ui.dialog.clear()
      finish()
    }
    function prompt(props: TuiDialogPromptProps) {
      const generation = dialogGeneration
      void context.ui.dialog.prompt({ title: props.title, placeholder: props.placeholder }).then((value) => {
        if (generation !== dialogGeneration || abort.signal.aborted) return
        finish()
        if (value === undefined) props.onCancel?.()
        else props.onConfirm?.(value)
      })
      return null
    }
    function select<Value>(props: TuiDialogSelectProps<Value>) {
      const generation = dialogGeneration
      const options = props.options.map(({ title, value, description }) => ({ title, value, description }))
      void context.ui.dialog.select({ title: props.title, placeholder: props.placeholder, options, current: props.current }).then((value) => {
        if (generation !== dialogGeneration || abort.signal.aborted) return
        finish()
        const option = props.options.find((item) => item.value === value)
        if (option) props.onSelect?.(option)
      })
      return null
    }
    function confirm(props: TuiDialogConfirmProps) {
      const generation = dialogGeneration
      void context.ui.dialog.confirm({ title: props.title, message: props.message }).then((value) => {
        if (generation !== dialogGeneration || abort.signal.aborted) return
        finish()
        if (value) props.onConfirm?.()
        else props.onCancel?.()
      })
      return null
    }
    const bridge = {
      renderer: context.renderer,
      theme: { get current() { return { text: context.theme.text.base, textMuted: context.theme.text.muted, primary: context.theme.text.action.primary.base } } },
      kv: {
        ready: true,
        get<T>(key: string, fallback: T): T { return (state.values[key] ?? fallback) as T },
        set(key: string, value: unknown) {
          const pending = update((draft) => { draft.values[key] = value })
          writes.add(pending)
          void pending.catch((error) => context.ui.toast.show({ message: `阅读进度保存失败：${error}`, variant: "error" })).finally(() => writes.delete(pending))
        },
      },
      state: { path: { directory: context.location?.directory }, provider: [] },
      route: { get current() { return { name: context.ui.router.current().type } } },
      lifecycle: { signal: abort.signal, onDispose(callback: () => void | Promise<void>) { cleanup.push(callback) } },
      ui: {
        toast: context.ui.toast.show,
        DialogPrompt: prompt, DialogSelect: select, DialogConfirm: confirm,
        dialog: {
          clear,
          replace(render: () => unknown, callback?: () => void) { clear(); onClose = callback; render() },
        },
      },
      keymap: {
        registerLayer(layer: ReaderLayer) {
          context.keymap.layer(() => ({
            mode: layer.mode ?? "global",
            commands: layer.commands?.map((command) => ({
              id: command.name, title: command.title, group: command.category,
              palette: true as const, enabled: command.enabled, run: command.run,
              bind: layer.bindings?.find((binding) => binding.cmd === command.name)?.key,
              slash: command.slashName ? { name: command.slashName } : undefined,
            })),
          }))
        },
      },
      slots: {
        register(registration: { slots: { sidebar_content: () => JSX.Element } }) {
          cleanup.push(context.ui.slot({ prepend: "sidebar.content", render: registration.slots.sidebar_content }))
        },
      },
    }
    // The adapter implements only the host methods used by the shared reader.
    await legacy.tui(bridge as unknown as ReaderAPI, { ...context.options, hostMajor: 2 }, {} as never)
    return async () => {
      abort.abort()
      for (const dispose of cleanup.reverse()) await dispose()
      await Promise.allSettled([...writes])
    }
  },
})
