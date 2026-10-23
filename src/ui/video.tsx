/** @jsxImportSource @opentui/solid */
import { createEffect, createSignal, For, Show, untrack } from "solid-js"
import type { TuiPlugin } from "@opencode-ai/plugin/tui"
import type { JSX } from "@opentui/solid"
import { watch } from "node:fs"
import { access } from "node:fs/promises"
import { join } from "node:path"
import { PixelPlayer } from "../media/player.mjs"
import { pixelRuns, mediaTime } from "../media/pixels.mjs"
import { addLocalVideo } from "../sources/local-video.mjs"
import { LibraryStore } from "../library/store.mjs"
import { createVideoIngestion } from "../services/video-ingestion.mjs"

type API = Parameters<TuiPlugin>[0]
type Video = Awaited<ReturnType<typeof addLocalVideo>> & { release?: () => Promise<void> }
type Button = (props: { label: string; action: () => unknown; muted?: boolean }) => JSX.Element
const prefix = "opencode-moyu:video:"

export function createVideoReader(api: API, library: LibraryStore, settings: {
  columns: () => number; rows: () => number; active: () => boolean; activate: () => void
  dialog: (render: () => JSX.Element) => void; close: () => void
}) {
  const [video, setVideo] = createSignal<Video>()
  const [frame, setFrame] = createSignal<Array<{ text: string; fg?: string; bg?: string }>>([])
  const [frameSize, setFrameSize] = createSignal({ width: 1, height: 1 })
  const [state, setState] = createSignal({ position: 0, playing: false, muted: true, loading: false })
  const [error, setError] = createSignal("")
  const [busy, setBusy] = createSignal(false)
  const [downloadProgress, setDownloadProgress] = createSignal("")
  const sources = createVideoIngestion({ directory: library.directory, keyFile: library.vault.keyFile })
  let downloadAbort: AbortController | undefined
  let downloadTask: Promise<void> | undefined
  const loads = new Set<Promise<void>>()
  let token = 0, resizeTimer: ReturnType<typeof setTimeout> | undefined
  const colors = new Map<string, string>()
  function color(value?: string) {
    if (!value) return undefined
    if (!colors.has(value)) colors.set(value, "#" + value.split(",").map((n) => Number(n).toString(16).padStart(2, "0")).join(""))
    return colors.get(value)
  }
  const player = new PixelPlayer({
    onFrame: (bytes: Buffer, size: { width: number; height: number }) => {
      setFrameSize({ width: size.width, height: size.height / 2 })
      setFrame(pixelRuns(bytes, size.width, size.height).map((run) => ({ text: run.text, fg: color(run.fg), bg: color(run.bg) })))
    },
    onState: setState,
    onError: (message: string) => { setError(message); api.ui.toast({ title: "像素影院", message, variant: "error" }) },
  })
  function save() {
    const current = video()
    if (current) api.kv.set(prefix + current.id, player.position)
  }
  const saveTimer = setInterval(() => { if (player.playing) save() }, 5000)
  function pause() { player.pause(); save() }
  let removalTimer: ReturnType<typeof setTimeout> | undefined
  const resourceWatcher = watch(join(library.internal, "resources"), (_event, filename) => {
    const current = video()
    if (!current || filename?.toString() !== current.id + ".enc") return
    clearTimeout(removalTimer)
    removalTimer = setTimeout(() => {
      void access(join(library.internal, "resources", current.id + ".enc")).catch((cause) => {
        if (cause.code !== "ENOENT" || api.lifecycle.signal.aborted || video()?.id !== current.id) return
        ++token; pause(); setVideo(undefined); setFrame([]); player.video = undefined
        api.kv.set(prefix + current.id, 0); api.kv.set(prefix + "last", "")
        void current.release?.().catch(() => {})
      })
    }, 50)
  })
  function releaseManaged() {
    const current = video()
    if (!current?.release) return
    ++token; pause(); setBusy(false); setVideo(undefined); setFrame([]); player.video = undefined
    void current.release().catch(() => {})
  }
  function load(input: string, resource?: any) {
    const pending = loadVideo(input, resource)
    loads.add(pending)
    void pending.finally(() => loads.delete(pending))
    return pending
  }
  async function loadVideo(input: string, resource?: any) {
    const request = ++token
    setBusy(true); setError(""); pause()
    try {
      const next: Video = resource ? await sources.cache.open(resource) : await addLocalVideo(library, input, api.state.path.directory)
      if (request !== token || api.lifecycle.signal.aborted || !settings.active()) { await next.release?.(); return }
      const previous = video()
      await previous?.release?.()
      if (request !== token || api.lifecycle.signal.aborted || !settings.active()) { await next.release?.(); return }
      setVideo(next); setFrame([]); settings.activate()
      api.kv.set(prefix + "last", next.id)
      await player.load(next, api.kv.get<number>(prefix + next.id, 0))
    } catch (cause) {
      if (request !== token || api.lifecycle.signal.aborted) return
      const message = cause instanceof Error ? cause.message : String(cause)
      setError(message); api.ui.toast({ title: "视频打开失败", message, variant: "error" })
    } finally { if (request === token) setBusy(false) }
  }
  function prompt() {
    settings.dialog(() => <api.ui.DialogPrompt title="打开视频 · 本地文件" placeholder="例如 /mnt/d/videos/视频.mp4" onCancel={settings.close}
      onConfirm={(path) => { settings.close(); void load(path) }} />)
  }
  function showError(cause: unknown) { if (api.lifecycle.signal.aborted) return; const message = cause instanceof Error ? cause.message : String(cause); setError(message); api.ui.toast({ title: "视频来源", message, variant: "error" }) }
  function download(url: string) {
    if (downloadTask) { api.ui.toast({ message: "已有下载任务，请等待或点击取消", variant: "info" }); return }
    const pending = runDownload(url)
    downloadTask = pending
    void pending.finally(() => { if (downloadTask === pending) downloadTask = undefined })
    return pending
  }
  async function runDownload(url: string) {
    if (downloadAbort) return api.ui.toast({ message: "已有下载任务，请等待或点击取消", variant: "info" })
    const abort = downloadAbort = new AbortController()
    const selection = token
    pause(); setError(""); setDownloadProgress("正在解析视频来源…")
    try {
      const result = await sources.importVideo({ url, signal: abort.signal, onProgress: (progress: { phase: string; percent: number }) => {
        if (!api.lifecycle.signal.aborted) setDownloadProgress(progress.phase === "encrypting" ? "正在加密入库…" : `正在下载 ${progress.percent.toFixed(0)}% · 点击取消可停止`)
      } })
      if (api.lifecycle.signal.aborted || abort.signal.aborted) return
      api.ui.toast({ message: result.cached ? "已复用视频缓存" : "视频已加密入库", variant: "info" })
      if (settings.active() && token === selection) await load("", result.resource)
    } catch (cause) { if (!api.lifecycle.signal.aborted) showError(cause) }
    finally { if (downloadAbort === abort) { downloadAbort = undefined; setDownloadProgress("") } }
  }
  function promptUrl() {
    settings.dialog(() => <api.ui.DialogPrompt title="导入 B 站 / YouTube 视频" placeholder="完整视频链接或 BV 号，最高 480p / 256 MiB / 60 分钟" onCancel={settings.close}
      onConfirm={(url) => { settings.close(); void download(url) }} />)
  }
  function searchPlatform() {
    settings.dialog(() => <api.ui.DialogSelect title="选择视频搜索来源" options={[{ title: "哔哩哔哩", value: "bilibili", description: "公开视频搜索" }, { title: "YouTube", value: "youtube", description: "使用本地保存的 API Key" }]}
      onSelect={(platform) => {
        settings.close()
        settings.dialog(() => <api.ui.DialogPrompt title={`${platform.title} · 搜索视频`} placeholder="输入关键词，最多返回 5 个结果" onCancel={settings.close} onConfirm={(query) => {
          settings.close()
          void sources.platforms.search({ platform: String(platform.value), query, signal: api.lifecycle.signal }).then((items) => {
            if (api.lifecycle.signal.aborted || !settings.active()) return
            if (!items.length) return api.ui.toast({ message: "没有找到匹配的视频", variant: "info" })
            settings.dialog(() => <api.ui.DialogSelect title={`${platform.title} · 搜索结果`} placeholder="点击视频下载到像素影院" options={items.map((item: { title: string; url: string; author: string }) => ({ title: item.title, value: item.url, description: item.author }))}
              onSelect={(item) => { settings.close(); void download(String(item.value)) }} />)
          }).catch(showError)
        }} />)
      }} />)
  }
  async function sourceSettings() {
    try {
      const status = await sources.settings.status()
      if (api.lifecycle.signal.aborted) return
      settings.dialog(() => <api.ui.DialogSelect title="视频来源设置" placeholder="API Key 仅用于 YouTube 数据查询，本地加密保存" options={[
        { title: status.youtubeApiKeyConfigured ? "更新 YouTube API Key" : "填写 YouTube API Key", value: "key", description: status.youtubeApiKeyConfigured ? "已配置 · 不回显密钥" : "启用 YouTube Data API v3 后填写" },
        { title: "移除保存的 YouTube API Key", value: "remove", description: "不影响已下载的视频" },
      ]} onSelect={(item) => {
        settings.close()
        if (item.value === "remove") {
          settings.dialog(() => <api.ui.DialogConfirm title="移除 YouTube API Key" message="移除本地保存的密钥？若设置了 YOUTUBE_API_KEY 环境变量，仍会使用环境变量。" onCancel={settings.close} onConfirm={() => { settings.close(); void sources.settings.removeKey().then(() => sourceSettings()).catch(showError) }} />)
          return
        }
        settings.dialog(() => <api.ui.DialogPrompt title="YouTube API Key · 本地加密保存" placeholder="粘贴完整 API Key，保存后不回显" onCancel={settings.close}
          onConfirm={(key) => { settings.close(); void sources.settings.saveKey(key).then(() => api.ui.toast({ message: "YouTube API Key 已加密保存", variant: "info" })).catch(showError) }} />)
      }} />)
    } catch (cause) { showError(cause) }
  }
  async function shelf() {
    try {
      const resources = (await library.resources()).filter((item) => item.kind === "video")
      if (api.lifecycle.signal.aborted) return
      settings.dialog(() => <api.ui.DialogSelect title="视频库 · 像素影院" placeholder="选择视频，或打开本地文件" current={video()?.id}
        options={[
          { title: "＋ 打开本地视频…", value: "", description: "MP4 / MKV / WebM / MOV / AVI / GIF" },
          { title: "＋ B 站 / YouTube 视频链接…", value: "url", description: "下载可公开访问的视频，加密入库" },
          { title: "搜索在线视频…", value: "search", description: "哔哩哔哩 / YouTube" },
          { title: "视频来源设置…", value: "settings", description: "填写或移除 YouTube API Key" },
          ...resources.map((item) => ({ title: item.title, value: item.id, description: mediaTime(item.metadata.duration) + (item.metadata.managedMedia ? " · " + item.source.adapter + " · 加密缓存" : " · 本地文件") })),
        ]}
        onSelect={(item) => {
          settings.close()
          if (!item.value) prompt()
          else if (item.value === "url") promptUrl()
          else if (item.value === "search") searchPlatform()
          else if (item.value === "settings") void sourceSettings()
          else void load("", resources.find((saved) => saved.id === item.value))
        }} />)
    } catch (cause) { api.ui.toast({ message: String(cause), variant: "error" }) }
  }
  async function restore() {
    if (video() || busy()) return
    const id = api.kv.get<string>(prefix + "last", "")
    if (!id) return
    const resource = (await library.resources()).find((item) => item.id === id && item.kind === "video")
    if (resource && !video() && !busy() && settings.active() && !api.lifecycle.signal.aborted) await load("", resource)
  }
  function remove() {
    const current = video()
    if (!current) return shelf()
    settings.dialog(() => <api.ui.DialogConfirm title="从视频库移除" message={`移除《${current.title}》的记录、播放进度及已下载的加密缓存？本地导入的原文件保留。`} onCancel={settings.close}
      onConfirm={() => {
        settings.close(); pause(); ++token
        void current.release?.().catch(() => {})
        void library.deleteResource(current.id).then(() => {
          if (api.lifecycle.signal.aborted) return
          api.kv.set(prefix + current.id, 0)
          if (video()?.id === current.id) { setVideo(undefined); setFrame([]); player.video = undefined; api.kv.set(prefix + "last", "") }
        }).catch((cause) => api.ui.toast({ message: String(cause), variant: "error" }))
      }} />)
  }
  function seek(delta: number) { if (video()) { void player.seek(player.position + delta); save() } }
  function jump() {
    if (!video()) return prompt()
    settings.dialog(() => <api.ui.DialogPrompt title="跳转视频 · 输入秒数或 分:秒" placeholder="例如 90 或 1:30" onCancel={settings.close} onConfirm={(input) => {
      const parts = input.trim().split(":")
      if (!parts.length || parts.length > 3 || parts.some((part) => !/^\d+(?:\.\d+)?$/.test(part))) return api.ui.toast({ message: "请输入有效时间", variant: "error" })
      const seconds = parts.reduce((sum, part) => sum * 60 + Number(part), 0)
      settings.close(); void player.seek(seconds); save()
    }} />)
  }
  function play() { setError(""); if (!video()) prompt(); else if (player.playing) pause(); else void player.play() }
  async function mute() {
    setError("")
    try { await player.setMuted(!state().muted) } catch (cause) { const message = String(cause); setError(message); api.ui.toast({ message, variant: "error" }) }
  }
  createEffect(() => {
    const columns = settings.columns(), rows = settings.rows(), active = settings.active()
    clearTimeout(resizeTimer)
    if (!active) { untrack(() => { pause(); releaseManaged() }); return }
    untrack(() => { void restore().catch(showError) })
    resizeTimer = setTimeout(() => { if (!api.lifecycle.signal.aborted) void player.resize(columns, rows) }, 150)
  })
  async function dispose() {
    ++token; downloadAbort?.abort(); resourceWatcher.close(); clearTimeout(removalTimer); clearInterval(saveTimer); clearTimeout(resizeTimer); save(); player.dispose()
    await Promise.allSettled([...loads, downloadTask, video()?.release?.()])
  }
  void sources.cleanup().catch(showError)
  function View(props: { Button: Button; gap: number }) {
    const Button = props.Button
    return <>
      <box height={2 + props.gap} flexShrink={0}>
        <Button label={busy() ? "正在打开视频…" : video()?.title ?? "请选择本地视频"} action={shelf} />
        <Show when={downloadProgress()} fallback={<text height={1} wrapMode="none">{error() ? "播放异常，可重新打开视频" : !video() ? "像素风 · 默认静音" : state().loading ? "正在解码…" : state().playing ? "播放中 · 像素风" : "已暂停 · 像素风"}</text>}>
          <Button label={`[取消] ${downloadProgress()}`} action={() => downloadAbort?.abort()} />
        </Show>
      </box>
      <box height={settings.rows()} flexShrink={0} alignItems="center" justifyContent="center">
        <Show when={video()} fallback={<text>点击「视频库」打开视频</text>}>
          <text selectable={false} wrapMode="none" width={frameSize().width} height={frameSize().height}><For each={frame()}>{(run) => <span style={{ fg: run.fg, bg: run.bg }}>{run.text}</span>}</For></text>
        </Show>
      </box>
      <box height={4 + props.gap} flexShrink={0} paddingTop={props.gap}>
        <Button label={`${mediaTime(state().position)} / ${mediaTime(video()?.duration)}`} action={jump} muted />
        <box height={1} flexDirection="row" gap={1}>
          <Button label={state().playing ? "[暂停]" : "[播放]"} action={play} />
          <Button label={state().muted ? "[开启声音]" : "[静音]"} action={mute} />
        </box>
        <box height={1} flexDirection="row" justifyContent="space-between"><Button label="[后退10秒]" action={() => seek(-10)} /><Button label="[前进10秒]" action={() => seek(10)} /></box>
      </box>
    </>
  }
  return { View, shelf, remove, pause, restore, dispose, jump, seek }
}
