/** @jsxImportSource @opentui/solid */
import { createEffect, createSignal, For, Show, untrack } from "solid-js"
import type { TuiPlugin } from "@opencode-ai/plugin/tui"
import type { JSX } from "@opentui/solid"
import { PixelPlayer } from "../media/player.mjs"
import { pixelRuns, mediaTime } from "../media/pixels.mjs"
import { addLocalVideo, resolveLocalVideo } from "../sources/local-video.mjs"
import { LibraryStore } from "../library/store.mjs"

type API = Parameters<TuiPlugin>[0]
type Video = Awaited<ReturnType<typeof addLocalVideo>>
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
  async function load(input: string, resource?: any) {
    const request = ++token
    setBusy(true); setError(""); pause()
    try {
      const next = resource ? await resolveLocalVideo(resource) : await addLocalVideo(library, input, api.state.path.directory)
      if (request !== token || api.lifecycle.signal.aborted || !settings.active()) return
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
  async function shelf() {
    try {
      const resources = (await library.resources()).filter((item) => item.kind === "video")
      if (api.lifecycle.signal.aborted) return
      settings.dialog(() => <api.ui.DialogSelect title="视频库 · 像素影院" placeholder="选择视频，或打开本地文件" current={video()?.id}
        options={[{ title: "＋ 打开本地视频…", value: "", description: "MP4 / MKV / WebM / MOV / AVI / GIF" }, ...resources.map((item) => ({ title: item.title, value: item.id, description: mediaTime(item.metadata.duration) + " · 本地文件" }))]}
        onSelect={(item) => { settings.close(); if (!item.value) prompt(); else void load("", resources.find((saved) => saved.id === item.value)) }} />)
    } catch (cause) { api.ui.toast({ message: String(cause), variant: "error" }) }
  }
  async function restore() {
    if (video() || busy()) return
    const id = api.kv.get<string>(prefix + "last", "")
    if (!id) return
    const resource = (await library.resources()).find((item) => item.id === id && item.kind === "video")
    if (resource && settings.active() && !api.lifecycle.signal.aborted) await load("", resource)
  }
  function remove() {
    const current = video()
    if (!current) return shelf()
    settings.dialog(() => <api.ui.DialogConfirm title="从视频库移除" message={`移除《${current.title}》的视频记录和播放进度？原视频文件保留。`} onCancel={settings.close}
      onConfirm={() => {
        settings.close(); pause(); ++token
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
    if (!active) { untrack(pause); return }
    resizeTimer = setTimeout(() => { if (!api.lifecycle.signal.aborted) void player.resize(columns, rows) }, 150)
  })
  function dispose() { ++token; clearInterval(saveTimer); clearTimeout(resizeTimer); save(); player.dispose() }
  function View(props: { Button: Button; gap: number }) {
    const Button = props.Button
    return <>
      <box height={2 + props.gap} flexShrink={0}>
        <Button label={busy() ? "正在打开视频…" : video()?.title ?? "请选择本地视频"} action={shelf} />
        <text height={1} wrapMode="none">{error() ? "播放异常，可重新打开视频" : !video() ? "像素风 · 默认静音" : state().loading ? "正在解码…" : state().playing ? "播放中 · 像素风" : "已暂停 · 像素风"}</text>
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
