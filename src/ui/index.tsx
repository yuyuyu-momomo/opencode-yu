/** @jsxImportSource @opentui/solid */
import type { TuiPlugin, TuiPluginModule } from "@opencode-ai/plugin/tui"
import { createEffect, createMemo, createSignal, onCleanup, onMount, Show } from "solid-js"
import { ScrollBoxRenderable, type BoxRenderable, type MouseEvent } from "@opentui/core"
import { dirname, resolve, basename } from "node:path"
import { watch } from "node:fs"
import { access } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { createHash } from "node:crypto"
import { chaptersOf, expandPath, listBooks, loadBook, pageAt, paginate } from "../library/text-reader.mjs"
import { LibraryStore } from "../library/store.mjs"
import { sidebarDock, sidebarLayout } from "./sidebar-layout.mjs"

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
  const collect = (api as typeof api & { moyu?: { collect: (query: string) => Promise<unknown> } }).moyu?.collect
  const [visible, setVisible] = createSignal(true)
  const [book, setBook] = createSignal<Book>()
  const [offset, setOffset] = createSignal(0)
  const [height, setHeight] = createSignal(api.renderer.height)
  const [width, setWidth] = createSignal(api.renderer.width)
  const [bodyWidth, setBodyWidth] = createSignal(36)
  const [busy, setBusy] = createSignal(false)
  const [heightPercent, setHeightPercent] = createSignal<number>()
  const [widthPercent, setWidthPercent] = createSignal<number>()
  const [viewportHeight, setViewportHeight] = createSignal<number>()
  const [hostRows, setHostRows] = createSignal(0)
  // V2 does not expose the host's onboarding dismissal state; reserve its space.
  const onboarding = createMemo(() => options?.hostMajor === 2 || (!api.kv.get("dismissed_getting_started", false) && !api.state.provider.some(
    (provider) => provider.id !== "opencode" || Object.values(provider.models).some((model) => model.cost?.input !== 0),
  )))
  const chromeRows = () => height() < 40 ? 9 : 12
  const minimumRows = () => options?.hostMajor !== 2 && height() < 40 ? 2 : 4
  const availableRows = createMemo(() => Math.max(minimumRows(), viewportHeight() === undefined
    ? height() - (onboarding() ? 31 : 20)
    : viewportHeight()! - chromeRows() - hostRows()))
  const rows = createMemo(() => heightPercent() === undefined
    ? Math.min(fixedRows ?? 24, availableRows())
    : Math.max(minimumRows(), Math.floor(availableRows() * heightPercent()! / 100)))
  const pages = createMemo(() => paginate(book()?.text ?? "", bodyWidth(), rows()))
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
  function promptCollection() {
    dialog(() => <api.ui.DialogPrompt
      title="让当前模型采集小说"
      placeholder="例如：忘语的凡人修仙传，先采集20章；也可输入目录链接"
      onCancel={closeDialog}
      onConfirm={(query) => { closeDialog(); void collect?.(query) }}
    />)
  }
  async function shelf() {
    try {
      const items = await listBooks(booksDir, { keyFile })
      if (api.lifecycle.signal.aborted) return
      dialog(() => <api.ui.DialogSelect
        title="书架 · 摸鱼阅读"
        placeholder="搜索书名，或选择采集 / 打开本地文件"
        options={[
          ...(collect ? [{ title: "＋ 让当前模型采集小说…", value: "moyu:collect", description: "输入书名、作者或目录链接" }] : []),
          { title: "＋ 打开本地文件…", value: "", description: "输入任意 TXT 文件路径" },
          ...items.map((item) => ({ title: item.title, value: item.path, description: item.path })),
        ]}
        onSelect={(item) => {
          closeDialog()
          if (item.value === "moyu:collect") promptCollection()
          else if (item.value) void open(String(item.value))
          else promptFile()
        }}
      />)
    } catch {
      promptFile()
    }
  }
  function openMoyu() {
    setVisible(true)
    api.kv.set(prefix + "visible", true)
    return shelf()
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

  function setSize(percent?: number) {
    setHeightPercent(percent)
    api.kv.set(prefix + "heightPercent", percent ?? null)
    save()
  }
  function customSize() {
    dialog(() => <api.ui.DialogPrompt
      title="阅读区高度 · 输入 10–100%"
      placeholder="例如 75，按可用正文高度计算"
      onCancel={closeDialog}
      onConfirm={(input) => {
        const value = Number(input.trim().replace(/%$/, ""))
        if (!input.trim() || !Number.isFinite(value) || value < 10 || value > 100) return toast("请输入 10–100 之间的百分比", "error")
        closeDialog()
        setSize(Math.round(value))
      }}
    />)
  }
  function heightSize() {
    const selected = heightPercent() === undefined ? "auto" : String(heightPercent())
    dialog(() => <api.ui.DialogSelect
      title="阅读区高度"
      placeholder="点击选择高度，设置自动保存"
      options={[
        { title: "自动高度", value: "auto", description: "恢复默认正文行数" },
        ...[25, 50, 75, 100].map((value) => ({ title: `高度 ${value}%`, value: String(value), description: "占可用正文高度的比例" })),
        { title: "自定义高度…", value: "custom", description: "输入 10–100%" },
      ]}
      current={selected}
      onSelect={(item) => {
        closeDialog()
        if (item.value === "custom") return customSize()
        setSize(item.value === "auto" ? undefined : Number(item.value))
      }}
    />)
  }

  function widthSize() {
    const selected = widthPercent() === undefined ? "auto" : String(widthPercent())
    dialog(() => <api.ui.DialogSelect
      title="阅读区宽度"
      placeholder="点击选择侧栏宽度，按会话可用宽度计算"
      options={[
        { title: "默认宽度", value: "auto", description: "恢复 OpenCode 原有侧栏宽度" },
        ...[25, 33, 40, 50, 60].map((value) => ({ title: `宽度 ${value}%`, value: String(value), description: "同时保留主会话的输入空间" })),
      ]}
      current={selected}
      onSelect={(item) => {
        closeDialog()
        const percent = item.value === "auto" ? undefined : Number(item.value)
        setWidthPercent(percent)
        api.kv.set(prefix + "widthPercent", percent ?? null)
        save()
      }}
    />)
  }
  function size() {
    dialog(() => <api.ui.DialogSelect
      title="阅读区域大小"
      placeholder="点击选择要调整的尺寸"
      options={[
        ...(options?.hostMajor === 2 ? [{ title: "调整宽度", value: "width", description: "改变侧栏宽度并重新分页" }] : []),
        { title: "调整高度", value: "height", description: "改变正文高度，页码和按钮同步移动" },
      ]}
      onSelect={(item) => { closeDialog(); item.value === "width" ? widthSize() : heightSize() }}
    />)
  }

  const resize = (nextWidth = api.renderer.width, nextHeight = api.renderer.height) => { setHeight(nextHeight); setWidth(nextWidth) }
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
    if (!current?.resourceId) return toast("请先在书架打开要删除的小说")
    dialog(() => <api.ui.DialogConfirm
      title="从资料库删除"
      message={`删除《${current.title}》的加密副本和采集缓存？外部原文件保留。`}
      onCancel={closeDialog}
      onConfirm={() => {
        closeDialog()
        void library.deleteResource(current.resourceId).then(() => {
          if (api.lifecycle.signal.aborted) return
          api.kv.set(progressKey(current.path), 0)
          if (book()?.path === current.path) {
            api.kv.set(prefix + "last", "")
            setBook(undefined)
            setOffset(0)
          }
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
    const savedSize = Number(api.kv.get<number | null>(prefix + "heightPercent", null))
    if (Number.isFinite(savedSize) && savedSize >= 10 && savedSize <= 100) setHeightPercent(savedSize)
    const savedWidth = Number(api.kv.get<number | null>(prefix + "widthPercent", null))
    if (Number.isFinite(savedWidth) && savedWidth >= 20 && savedWidth <= 60) setWidthPercent(savedWidth)
    setVisible(api.kv.get<boolean>(prefix + "visible", true))
    const initial = typeof options?.file === "string" ? options.file : api.kv.get<string>(prefix + "last", "")
    void open(initial || resolve(pluginRoot, "books/夜班便利店.txt"), true)
  })

  api.keymap.registerLayer({
    commands: [{ name: "moyu.toggle", title: "摸鱼阅读：显示 / 隐藏", category: "Moyu 阅读", namespace: "palette", run: toggle }],
    bindings: [{ key: "alt+m", cmd: "moyu.toggle", desc: "显示 / 隐藏小说" }],
  })
  api.keymap.registerLayer({
    mode: "base",
    commands: [
      { name: "moyu.open", title: "摸鱼阅读：打开书架", slashName: "moyu", run: openMoyu },
      { name: "moyu.shelf", title: "摸鱼阅读：书架 / 打开文件", slashName: "read", run: shelf },
      { name: "moyu.chapters", title: "摸鱼阅读：章节目录", slashName: "chapters", run: chapters },
      { name: "moyu.jump", title: "摸鱼阅读：跳转进度", run: jump },
      { name: "moyu.size", title: "摸鱼阅读：调整阅读区域大小", slashName: "readsize", run: size },
      { name: "moyu.delete", title: "摸鱼阅读：删除当前资料", run: removeBook },
      { name: "moyu.next", title: "摸鱼阅读：下一页", enabled: () => visible() && api.route.current.name === "session", run: () => turn(1) },
      { name: "moyu.prev", title: "摸鱼阅读：上一页", enabled: () => visible() && api.route.current.name === "session", run: () => turn(-1) },
    ].map((item) => ({ ...item, category: "Moyu 阅读", namespace: "palette" })),
    bindings: [
      { key: "alt+o", cmd: "moyu.shelf", desc: "打开书架" },
      { key: "alt+c", cmd: "moyu.chapters", desc: "章节目录" },
      { key: "alt+g", cmd: "moyu.jump", desc: "跳转进度" },
      { key: "<leader>j", cmd: "moyu.size", desc: "调整阅读区域大小" },
      { key: "alt+d", cmd: "moyu.delete", desc: "删除当前资料" },
      { key: "alt+right", cmd: "moyu.next", desc: "下一页" },
      { key: "alt+left", cmd: "moyu.prev", desc: "上一页" },
    ],
  })

  function Reader() {
    let viewport: BoxRenderable | undefined
    let readerNode: BoxRenderable | undefined
    let docking: ReturnType<typeof sidebarDock>
    let mountTimer: ReturnType<typeof setTimeout> | undefined
    const [layout, setLayout] = createSignal<ReturnType<typeof sidebarLayout>>()
    const measure = () => { if (viewport && !viewport.isDestroyed && Number.isFinite(viewport.height) && viewport.height > 0) setViewportHeight(viewport.height) }
    const applyWidth = () => layout()?.apply(visible() ? widthPercent() : undefined, width())
    // Native resize notifications can arrive before the frame commits its size.
    const frameResized = () => queueMicrotask(() => { if (!api.lifecycle.signal.aborted) applyWidth() })
    createEffect(applyWidth)
    const dock = () => {
      if (options?.hostMajor !== 2 || api.lifecycle.signal.aborted) return
      measure()
      if (visible() && readerNode && !readerNode.isDestroyed && viewport && !docking) docking = sidebarDock(readerNode, viewport, dock)
      setHostRows(docking?.measure(visible()) ?? 0)
      if (!visible()) docking = undefined
    }
    createEffect(dock)
    api.renderer.on("frame", dock)
    onMount(() => {
      mountTimer = setTimeout(() => { if (readerNode && !readerNode.isDestroyed) { observe(readerNode); dock() } }, 0)
    })
    function observe(node: BoxRenderable) {
      // V1's scrollbox also contains host cards; retain its conservative height budget.
      if (options?.hostMajor !== 2) return
      if (viewport) return
      for (let parent = node.parent; parent; parent = parent.parent) {
        if (!(parent instanceof ScrollBoxRenderable)) continue
        viewport = parent.viewport
        const sizing = sidebarLayout(parent)
        setLayout(sizing)
        sizing?.frame?.on("resized", frameResized)
        viewport.on("resized", measure)
        measure()
        dock()
        break
      }
    }
    onCleanup(() => {
      clearTimeout(mountTimer)
      viewport?.off("resized", measure)
      layout()?.frame?.off("resized", frameResized)
      layout()?.restore()
      api.renderer.off("frame", dock)
      docking?.restore()
    })
    const theme = () => api.theme.current
    const gap = () => height() < 40 ? 0 : 1
    const percentage = () => page() === pages().length - 1 ? 100 : Math.floor((pages()[page()].start / (book()?.text.length || 1)) * 100)
    function Button(props: { label: string; action: () => unknown; muted?: boolean }) {
      let pressed = false
      // Opening a modal on mouse-down lets the same click's release close it.
      // Finish and consume the click before adding the new dialog to the tree.
      const click = (event: MouseEvent) => {
        const activate = pressed && event.button === 0 && !event.isDragging
        pressed = false
        if (!activate) return
        event.preventDefault()
        event.stopPropagation()
        queueMicrotask(() => { if (!api.lifecycle.signal.aborted) props.action() })
      }
      return <text fg={props.muted ? theme().textMuted : theme().primary} selectable={false} wrapMode="none"
        onMouseDown={(event) => { if (event.button === 0) { pressed = true; event.preventDefault(); event.stopPropagation() } }}
        onMouseOut={() => { pressed = false }} onMouseDrag={() => { pressed = false }} onMouseUp={click}>{props.label}</text>
    }
    return <Show when={visible()} fallback={<box height={1}><Button label="[显示阅读]" action={toggle} /></box>}>
      <box ref={(node: BoxRenderable) => { readerNode = node }} flexShrink={0} width="100%" marginBottom={options?.hostMajor === 2 ? "auto" : 0} height={book() ? rows() + chromeRows() : undefined} onSizeChange={function(this: BoxRenderable) { readerNode = this; setBodyWidth(Math.max(2, Math.floor(this.width))); observe(this); dock() }}>
        <box flexShrink={0} height={1} flexDirection="row" justifyContent="space-between">
          <text fg={theme().text}><b>随手读</b></text>
          <Button label="[隐藏]" action={toggle} muted />
        </box>
        <box flexShrink={0} height={1} flexDirection="row" gap={2}>
          <Button label="[书架]" action={shelf} />
          <Button label="[目录]" action={chapters} />
          <Button label="[删除]" action={removeBook} />
        </box>
        <box flexShrink={0} height={1 + gap()} flexDirection="row" gap={2}>
          <Show when={options?.hostMajor === 2}><Button label={`[宽度 ${widthPercent() ?? "自动"}${widthPercent() === undefined ? "" : "%"}]`} action={widthSize} /></Show>
          <Button label={`[高度 ${heightPercent() ?? "自动"}${heightPercent() === undefined ? "" : "%"}]`} action={heightSize} />
        </box>
        <Show when={book()} fallback={<Button label={busy() ? "正在打开…" : "[点击打开本地小说]"} action={shelf} />}>
          <box flexShrink={0} height={2 + gap()}>
            <Button label={book()?.title ?? ""} action={shelf} muted />
            <Button label={currentChapter()} action={chapters} />
          </box>
          <box flexShrink={0} height={rows()} minHeight={rows()}>
            <text fg={theme().text} width="100%" height="100%" wrapMode="none">{pages()[page()].text}</text>
          </box>
          <box flexShrink={0} height={4 + gap()} paddingTop={gap()}>
            <box flexShrink={0} height={1} flexDirection="row" justifyContent="space-between">
              <Button label={`${page() + 1} / ${pages().length} 页 · ${percentage()}%`} action={jump} muted />
            </box>
            <box flexShrink={0} height={1} flexDirection="row" justifyContent="space-between">
              <Button label="[‹ 上一页]" action={() => turn(-1)} />
              <Button label="[下一页 ›]" action={() => turn(1)} />
            </box>
            <text fg={theme().textMuted} height={1} wrapMode="none">点击上方按钮调整宽高</text>
          </box>
        </Show>
      </box>
    </Show>
  }
  api.slots.register({ order: 50, slots: { sidebar_content: () => <Reader /> } })
}

export default { id: "opencode-moyu", tui } satisfies TuiPluginModule
