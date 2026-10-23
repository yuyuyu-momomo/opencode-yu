import test from "node:test"
import assert from "node:assert/strict"
import { EventEmitter } from "node:events"
import { PassThrough } from "node:stream"
import { mkdtemp, readFile, stat } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { execFile } from "node:child_process"
import { promisify } from "node:util"
import { PixelPlayer } from "../src/media/player.mjs"
import { pixelSize, pixelRuns, mediaTime } from "../src/media/pixels.mjs"
import { mediaBinary, inspectVideo } from "../src/media/runtime.mjs"
import { addLocalVideo } from "../src/sources/local-video.mjs"
import { LibraryStore } from "../src/library/store.mjs"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
async function until(predicate, timeout = 5000) {
  const end = Date.now() + timeout
  while (!predicate()) { if (Date.now() >= end) throw new Error("Condition timed out"); await sleep(25) }
}

test("像素帧保持比例、半格颜色及内存尺寸上限", () => {
  assert.deepEqual(pixelSize(1920, 1080, 40, 15), { width: 40, height: 22 })
  const portrait = pixelSize(1080, 1920, 40, 15)
  assert.equal(portrait.height, 30)
  assert.ok(portrait.width < 20)
  assert.ok(pixelSize(1920, 1080, 10000, 10000).width <= 160)
  const frame = Buffer.from([255,0,0,255,0,0,0,0,255,0,0,255])
  assert.deepEqual(pixelRuns(frame, 2, 2), [{ text: "▀▀", fg: "255,0,0", bg: "0,0,255" }])
  assert.throws(() => pixelRuns(frame.subarray(1), 2, 2), /长度/)
  assert.equal(mediaTime(3661), "1:01:01")
})

test("播放默认无音频进程，开声后静音和暂停均终止旧进程，延迟开声不复活", async () => {
  const children = [], commands = []
  const launch = (binary, args) => {
    commands.push({ binary, args })
    const child = new EventEmitter()
    child.stdout = new PassThrough(); child.stderr = new PassThrough()
    child.exitCode = null; child.signalCode = null
    child.kill = (signal) => { child.signalCode = signal; child.emit("close", null); return true }
    children.push(child)
    if (binary === "ffmpeg") queueMicrotask(() => child.stdout.write(Buffer.alloc(2 * 2 * 3 * 2, 255)))
    return child
  }
  let rejectSound = false, delaySound
  const player = new PixelPlayer({ launch, binary: async (name) => {
    if (name === "ffplay" && rejectSound) throw new Error("no audio backend")
    if (name === "ffplay" && delaySound) await delaySound
    return name
  } })
  try {
    player.columns = 2; player.rows = 1
    await player.load({ path: "/tmp/test.mp4", width: 2, height: 2, duration: 10, hasAudio: true })
    await sleep(50); await player.play(); await sleep(50)
    assert.ok(!commands.some((c) => c.binary === "ffplay"))
    rejectSound = true
    await assert.rejects(player.setMuted(false), /no audio/)
    assert.equal(player.muted, true)
    rejectSound = false
    await player.setMuted(false)
    await until(() => children.length >= 4)
    const audio = children.at(-1)
    assert.equal(commands.at(-1).binary, "ffplay")
    assert.ok(commands.at(-1).args.includes("-nodisp"))
    await player.setMuted(true)
    assert.equal(audio.signalCode, "SIGTERM")
    player.pause()
    assert.ok(children.every((child) => child.signalCode))
    let finish
    delaySound = new Promise((resolve) => { finish = resolve })
    const pending = player.setMuted(false)
    player.pause(); finish(); await pending
    assert.equal(player.muted, true)
  } finally { player.dispose() }
})

let ffmpeg
try { ffmpeg = await mediaBinary("ffmpeg"); await mediaBinary("ffprobe") } catch {}

test("输出尺寸不变时不重启解码，切换画质仍能重解码，过期帧回调不再排队", async () => {
  let launches = 0, frames = 0
  const player = new PixelPlayer({binary:async()=>"ffmpeg",frameSize:()=>({width:2,height:2}),onFrame:()=>{frames++;player.pause()},launch:()=>{
    launches++
    const child = new EventEmitter();child.stdout=new PassThrough();child.stderr=new PassThrough();child.exitCode=null
    child.kill=(signal)=>{child.signalCode=signal;child.emit("close",null)}
    queueMicrotask(()=>child.stdout.write(Buffer.alloc(120)))
    return child
  }})
  try {
    await player.load({path:"fixture.mp4",width:2,height:2,duration:20})
    await until(()=>frames===1)
    await player.resize(50,20);assert.equal(launches,1)
    await player.resize(50,20,"lanczos");await until(()=>frames===2);assert.equal(launches,2)
    await sleep(150);assert.equal(frames,2)
    await player.resize(50,20,"lanczos",true);await until(()=>frames===3)
  } finally {player.dispose()}
})

test("渲染阻塞后不以毫秒间隔追赶旧帧挤占交互", async () => {
  const times=[]
  const player=new PixelPlayer({binary:async()=>"ffmpeg",frameSize:()=>({width:2,height:2}),onFrame:()=>{
    times.push(performance.now())
    if(times.length===2) Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,250)
  },launch:()=>{
    const child=new EventEmitter();child.stdout=new PassThrough();child.stderr=new PassThrough();child.exitCode=null
    child.kill=(signal)=>{child.signalCode=signal;child.emit("close",null)}
    queueMicrotask(()=>child.stdout.write(Buffer.alloc(1200)));return child
  }})
  try {
    player.video={path:"fixture.mp4",width:2,height:2,duration:30}
    await player.play();await until(()=>times.length>=5)
    assert.ok(times[3]-times[2]>=65,JSON.stringify(times))
    assert.ok(times[4]-times[3]>=65,JSON.stringify(times))
  } finally {player.dispose()}
})
test("真实视频探测、分块解码、暂停跳转及加密索引删除保留原文件", { skip: !ffmpeg }, async () => {
  const dir = await mkdtemp(join(tmpdir(), "moyu-video-")), path = join(dir, "测试 视频.mp4")
  await promisify(execFile)(ffmpeg, ["-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "testsrc2=size=160x90:rate=10", "-t", "2", "-c:v", "mpeg4", path])
  const store = new LibraryStore(join(dir, "books"))
  const video = await addLocalVideo(store, path)
  assert.equal(video.duration, 2); assert.equal(video.hasAudio, false)
  const resources = await store.resources()
  assert.equal(resources[0].kind, "video")
  const encrypted = await readFile(join(store.internal, "resources", video.id + ".enc"))
  assert.equal(encrypted.subarray(0, 5).toString(), "MOYU1")
  assert.ok(!encrypted.includes(Buffer.from(path)))
  let count = 0, error
  const player = new PixelPlayer({ onFrame: () => { count++ }, onError: (message) => { error = message } })
  try {
    await player.load(video)
    await until(() => count === 1 || error)
    assert.equal(error, undefined)
    assert.equal(player.playing, false)
    await player.play()
    await until(() => count >= 4 || error)
    player.pause(); const paused = count
    await sleep(250); assert.equal(count, paused)
    await player.seek(1)
    await until(() => count > paused || error)
    assert.equal(player.position, 1)
    assert.equal(error, undefined)
    const beforeRestart = count
    await player.load(video, video.duration)
    await until(() => count > beforeRestart || error)
    assert.equal(player.position, 0)
    assert.equal(error, undefined)
    await assert.rejects(player.setMuted(false), /没有音轨/)
    await assert.rejects(inspectVideo("https://example.com/video.mp4"), /本地/)
    await store.deleteResource(video.id)
    assert.deepEqual(await store.resources(), [])
    assert.ok((await stat(path)).isFile())
  } finally { player.dispose() }
})
