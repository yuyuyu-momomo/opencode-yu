/** @jsxImportSource @opentui/solid */
import type { TuiPlugin, TuiPluginModule } from "@opencode-ai/plugin/tui"
import { createEffect, createMemo, createSignal, Show } from "solid-js"
import { dirname, resolve, basename } from "node:path"
import { watch } from "node:fs"
import { access } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { createHash } from "node:crypto"
import { chaptersOf, expandPath, listBooks, loadBook, pageAt, paginate } from "../library/text-reader.mjs"
import { LibraryStore } from "../library/store.mjs"

type Book = Awaited<ReturnType<typeof loadBook>>
const prefix = "opencode-moyu:"
const pluginRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")

const tui: TuiPlugin = async (api, options) => {
  const configuredRows = Number(options?.rows)
  const fixedRows = Number.isInteger(configuredRows) && configuredRows >= 4 ? Math.min(configuredRows, 40) : undefined
  const booksDir = expandPath(typeof options?.booksDir === "string" ? options.booksDir : resolve(pluginRoot, "books"))
  const keyFile = typeof options?.keyFile === "string" ? expandPath(options.keyFile) : undefined
  const library = new LibraryStore(booksDir, { keyFile })
  await library.ready()
  const [visible, setVisible] = createSignal(true)
  const [book, setBook] = createSignal<Book>()
  const [offset, setOffset] = createSignal(0)
  const [height, setHeight] = createSignal(api.renderer.height)
  const [busy, setBusy] = createSignal(false)
  // V2 does not expose the host's onboarding dismissal state; reserve its space.
  const onboarding = createMemo(() => options?.hostMajor === 2 || (!api.kv.get("dismissed_getting_started", false) && !api.state.provider.some(
    (provider) => provider.id !== "opencode" || Object.values(provider.models).some((model) => model.cost?.input !== 0),
  )))
  const rows = createMemo(() => Math.min(fixedRows ?? 24, Math.max(4, height() - (onboarding() ? 31 : 20))))
  const pages = createMemo(() => paginate(book()?.text ?? "", 36, rows()))
  const page = createMemo(() => pageAt(pages(), offset()))
  const currentChapter = createMemo(() => book()?.chapters.findLast((item) => item.offset <= offset())?.title ?? "正文")
  let request = 0
  let ownsDialog = false
  let started = false

  const progressKey = (path: string) => prefix + "position:" + createHash("sha256").update(path).digest("hex")
  function save() {
    const current = book()
    if (current) api.kv.set(progressKey(current.path), offset())
  }
  function toast(message: string, variant: "info" | "error" = "info") {
    api.ui.toast({ title: "摸鱼阅读", message, variant, duration: 3500 })
  }
  function closeDialog() {
    ownsDialog = false
    api.ui.dialog.clear()
  }
  function dialog(render: () => ReturnType<typeof api.ui.DialogPrompt>) {
    ownsDialog = true
    api.ui.dialog.replace(render, () => { ownsDialog = false })
  }
  async function open(path: string, quiet = false) {
    const token = ++request
    setBusy(true)
    try {
      let next = await loadBook(path, api.state.path.directory || process.cwd(), { keyFile })
      if (!next.resourceId) next = await library.importLocal(next)
      if (token !== request || api.lifecycle.signal.aborted) return
      save()
      const stored = api.kv.get<number>(progressKey(next.path), 0)
      setOffset(Number.isFinite(stored) ? Math.max(0, Math.min(stored, next.text.length - 1)) : 0)
      setBook(next)
      api.kv.set(prefix + "last", next.path)
      if (!quiet) {
        setVisible(true)
        api.kv.set(prefix + "visible", true)
        if (api.route.current.name !== "session") toast("已打开，进入会话后可在右侧栏阅读")
      }
    } catch (error) {
      if (token === request && !api.lifecycle.signal.aborted) toast(error instanceof Error ? error.message : String(error), "error")
    } finally {
      if (token === request) setBusy(false)
    }
  }
  function turn(direction: number) {
    if (!book() || busy()) return
    const next = Math.max(0, Math.min(pages().length - 1, page() + direction))
    setOffset(pages()[next].start)
    save()
  }
  function toggle() {
    const next = !visible()
    setVisible(next)
    api.kv.set(prefix + "visible", next)
    if (!next && ownsDialog) closeDialog()
    if (next && api.route.current.name !== "session") toast("阅读面板位于会话右侧栏；进入会话后显示")
  }
  function promptFile() {
    dialog(() => <api.ui.DialogPrompt
      title="打开小说 · 本地 TXT / Markdown"
      placeholder="/mnt/d/books/小说.txt 或 ~/books/小说.txt"
      onCancel={closeDialog}
      onConfirm={(path) => { closeDialog(); void open(path) }}
    />)
  }
  async function shelf() {
    try {
      const items = await listBooks(booksDir, { keyFile })
      if (api.lifecycle.signal.aborted) return
      dialog(() => <api.ui.DialogSelect
        title="书架 · 摸鱼阅读"
        placeholder="搜索书名，或选择「打开本地文件」"
        options={[
          { title: "＋ 打开本地文件…", value: "", description: "输入任意 TXT 文件路径" },
          ...items.map((item) => ({ title: item.title, value: item.path, description: item.path })),
        ]}
        onSelect={(item) => {
          closeDialog()
          if (item.value) void open(String(item.value))
          else promptFile()
        }}
      />)
    } catch {
      promptFile()
    }
  }
  function chapters() {
    const current = book()
    if (!current) return promptFile()
    const items = current.chapters.length ? current.chapters : chaptersOf(current.text)
    if (!items.length) return toast("没有识别到章节标题，可用「跳转进度」定位")
    dialog(() => <api.ui.DialogSelect
      title={`${current.title} · 目录`}
      placeholder="搜索章节"
      options={items.map((item) => ({ title: item.title, value: item.offset }))}
      onSelect={(item) => { closeDialog(); setOffset(Number(item.value)); save() }}
    />)
  }
  function jump() {
    if (!book()) return promptFile()
    dialog(() => <api.ui.DialogPrompt
      title="跳转阅读进度 · 输入 0–100"
      placeholder="例如 35 或 35%"
      onCancel={closeDialog}
      onConfirm={(input) => {
        const value = Number(input.trim().replace(/%$/, ""))
        if (!input.trim() || !Number.isFinite(value) || value < 0 || value > 100) return toast("请输入 0–100 之间的百分比", "error")
        closeDialog()
        setOffset(Math.min(book()!.text.length - 1, Math.floor(book()!.text.length * value / 100)))
        save()
      }}
    />)
  }

  const resize = () => setHeight(api.renderer.height)
  let refresh: ReturnType<typeof setTimeout> | undefined
  const watcher = watch(booksDir, (_event, filename) => {
    const current = book()
    if (!current || filename?.toString() !== basename(current.path)) return
    clearTimeout(refresh)
    refresh = setTimeout(() => {
      if (api.lifecycle.signal.aborted || book()?.path !== current.path) return
      void access(current.path).then(() => open(current.path, true)).catch((error) => {
        if (error.code !== "ENOENT" || api.lifecycle.signal.aborted || book()?.path !== current.path) return
        setBook(undefined)
        setOffset(0)
        api.kv.set(progressKey(current.path), 0)
        api.kv.set(prefix + "last", "")
      })
    }, 100)
  })
  function removeBook() {
    const current = book()
    if (!current?.resourceId) return
    dialog(() => <api.ui.DialogConfirm
      title="从资料库删除"
      message={`删除《${current.title}》的加密副本和采集缓存？外部原文件保留。`}
      onCancel={closeDialog}
      onConfirm={() => {
        closeDialog()
        void library.deleteResource(current.resourceId).then(() => {
          if (api.lifecycle.signal.aborted) return
          api.kv.set(progressKey(current.path), 0)
          api.kv.set(prefix + "last", "")
          setBook(undefined)
          setOffset(0)
          toast("已删除加密副本和采集缓存")
        }).catch((error) => toast(String(error), "error"))
      }}
    />)
  }
  api.renderer.on("resize", resize)
  api.lifecycle.onDispose(() => {
    ++request
    watcher.close()
    clearTimeout(refresh)
    save()
    api.renderer.off("resize", resize)
    if (ownsDialog) closeDialog()
  })

  createEffect(() => {
    if (!api.kv.ready || started) return
    started = true
    setVisible(api.kv.get<boolean>(prefix + "visible", true))
    const initial = typeof options?.file === "string" ? options.file : api.kv.get<string>(prefix + "last", "")
    void open(initial || resolve(pluginRoot, "books/夜班便利店.txt"), true)
  })

  api.keymap.registerLayer({
    commands: [{ name: "moyu.toggle", title: "摸鱼阅读：显示 / 隐藏", category: "Moyu 阅读", namespace: "palette", slashName: "moyu", run: toggle }],
    bindings: [{ key: "alt+m", cmd: "moyu.toggle", desc: "显示 / 隐藏小说" }],
  })
  api.keymap.registerLayer({
    mode: "base",
    commands: [
      { name: "moyu.shelf", title: "摸鱼阅读：书架 / 打开文件", slashName: "read", run: shelf },
      { name: "moyu.chapters", title: "摸鱼阅读：章节目录", slashName: "chapters", run: chapters },
      { name: "moyu.jump", title: "摸鱼阅读：跳转进度", run: jump },
      { name: "moyu.delete", title: "摸鱼阅读：删除当前资料", run: removeBook },
      { name: "moyu.next", title: "摸鱼阅读：下一页", enabled: () => visible() && api.route.current.name === "session", run: () => turn(1) },
      { name: "moyu.prev", title: "摸鱼阅读：上一页", enabled: () => visible() && api.route.current.name === "session", run: () => turn(-1) },
    ].map((item) => ({ ...item, category: "Moyu 阅读", namespace: "palette" })),
    bindings: [
      { key: "alt+o", cmd: "moyu.shelf", desc: "打开书架" },
      { key: "alt+c", cmd: "moyu.chapters", desc: "章节目录" },
      { key: "alt+g", cmd: "moyu.jump", desc: "跳转进度" },
      { key: "alt+d", cmd: "moyu.delete", desc: "删除当前资料" },
      { key: "alt+right", cmd: "moyu.next", desc: "下一页" },
      { key: "alt+left", cmd: "moyu.prev", desc: "上一页" },
    ],
  })

  function Reader() {
    const theme = () => api.theme.current
    const percentage = () => page() === pages().length - 1 ? 100 : Math.floor((pages()[page()].start / (book()?.text.length || 1)) * 100)
    return <Show when={visible()}>
      <box flexShrink={0} gap={height() < 40 ? 0 : 1}>
        <box flexDirection="row" justifyContent="space-between">
          <text fg={theme().text} onMouseDown={() => void shelf()}><b>随手读</b></text>
          <text fg={theme().textMuted} onMouseDown={toggle}>隐藏 Alt+M</text>
        </box>
        <Show when={book()} fallback={<text fg={theme().textMuted}>{busy() ? "正在打开…" : "Alt+O 打开本地小说"}</text>}>
          <box>
            <text fg={theme().textMuted} wrapMode="none" onMouseDown={() => void shelf()}>{book()?.title}</text>
            <text fg={theme().primary} wrapMode="none" onMouseDown={chapters}>{currentChapter()}</text>
          </box>
          <text fg={theme().text} height={rows()} wrapMode="none">{pages()[page()].text}</text>
          <box flexDirection="row" justifyContent="space-between">
            <text fg={theme().textMuted} onMouseDown={jump}>{page() + 1} / {pages().length} 页 · {percentage()}%</text>
            <text fg={theme().textMuted} onMouseDown={removeBook}>删除</text>
          </box>
          <box flexDirection="row" justifyContent="space-between">
            <text fg={theme().primary} onMouseDown={() => turn(-1)}>‹ 上一页</text>
            <text fg={theme().primary} onMouseDown={() => turn(1)}>下一页 ›</text>
          </box>
          <text fg={theme().textMuted}>Alt+←/→ 翻页 · Alt+O 书架</text>
        </Show>
      </box>
    </Show>
  }
  api.slots.register({ order: 50, slots: { sidebar_content: () => <Reader /> } })
}

export default { id: "opencode-moyu", tui } satisfies TuiPluginModule
