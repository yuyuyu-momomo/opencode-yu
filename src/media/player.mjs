import { mediaBinary, nativeMediaPath, launchMedia, stopMedia } from "./runtime.mjs"
import { pixelSize } from "./pixels.mjs"

/** Decoder owns no UI or files. One bounded frame queue, no full-video conversion. */
export class PixelPlayer {
  constructor({ onFrame = (_frame, _size) => {}, onState = (_state) => {}, onError = (_error) => {}, binary = mediaBinary, launch = launchMedia, frameSize = pixelSize } = {}) {
    this.onFrame = onFrame; this.onState = onState; this.onError = onError
    this.binary = binary; this.launch = launch; this.generation = 0
    this.position = 0; this.playing = false; this.muted = true; this.fps = 10
    this.columns = 36; this.rows = 16; this.disposed = false
    this.frameSize = frameSize; this.scaleFilter = "neighbor"
  }
  emit() { this.onState({ position: this.position, playing: this.playing, muted: this.muted, loading: this.loading || false }) }
  load(video, position = 0) {
    this.stop(); this.video = video
    const saved = Number(position) || 0
    this.position = saved >= video.duration - .05 ? 0 : Math.max(0, saved)
    this.muted = true
    this.emit()
    return this.start(false)
  }
  resize(columns, rows) {
    if (columns === this.columns && rows === this.rows) return
    this.columns = columns; this.rows = rows
    if (this.video) return this.start(this.playing)
  }
  stop() {
    ++this.generation; clearTimeout(this.timer)
    stopMedia(this.decoder); stopMedia(this.audio)
    this.decoder = undefined; this.audio = undefined; this.loading = false
  }
  pause() { this.stop(); this.playing = false; this.emit() }
  play() { if (this.position >= (this.video?.duration || Infinity) - .05) this.position = 0; return this.start(true) }
  seek(seconds) {
    if (!this.video) return
    this.position = Math.max(0, Math.min(this.video.duration - .05, Number(seconds) || 0))
    return this.start(this.playing)
  }
  async setMuted(muted) {
    if (muted === this.muted || !this.video) return
    const token = this.generation
    if (!muted && !this.video.hasAudio) throw new Error("这个视频没有音轨")
    if (!muted) await this.binary("ffplay")
    if (this.disposed || token !== this.generation) return
    this.muted = muted
    if (this.playing) await this.start(true)
    else this.emit()
  }
  async start(playing) {
    this.stop()
    if (!this.video || this.disposed) return
    const token = this.generation, video = this.video, start = this.position
    this.playing = playing; this.loading = true; this.emit()
    try {
      const binary = await this.binary("ffmpeg"), path = await nativeMediaPath(binary, video.path)
      if (token !== this.generation || this.disposed) return
      const size = this.frameSize(video.width, video.height, this.columns, this.rows), frameBytes = size.width * size.height * 3
      const args = ["-nostdin", "-hide_banner", "-loglevel", "error", "-threads", "1", "-filter_threads", "1", "-protocol_whitelist", "file,pipe", "-ss", String(start), "-i", path, "-map", "0:v:0", "-an", "-sn", "-vf", `fps=${this.fps},scale=${size.width}:${size.height}:flags=${this.scaleFilter},setsar=1`, ...(!playing ? ["-frames:v", "1"] : []), "-pix_fmt", "rgb24", "-f", "rawvideo", "pipe:1"]
      const child = this.decoder = this.launch(binary, args)
      let buffer = Buffer.alloc(0), stderr = "", ended = false, exitCode, frames = 0, audioStarted = false, lastFrameAt = Date.now()
      let nextFrameAt
      const valid = () => token === this.generation && !this.disposed
      const fail = (error) => { if (!valid()) return; this.pause(); this.onError(error instanceof Error ? error.message : String(error)) }
      child.stderr.on("data", (chunk) => { stderr = (stderr + chunk.toString()).slice(-1500) })
      child.on("error", fail)
      child.stdout.on("data", (chunk) => {
        if (!valid()) return
        buffer = buffer.length ? Buffer.concat([buffer, chunk]) : chunk
        if (buffer.length >= frameBytes * 3) child.stdout.pause()
      })
      child.on("close", (code) => { ended = true; exitCode = code; if (code && valid()) fail(new Error(`视频解码失败：${stderr || code}`)) })
      const tick = () => {
        if (!valid()) return
        if (buffer.length >= frameBytes) {
          lastFrameAt = Date.now()
          nextFrameAt = (nextFrameAt ?? lastFrameAt) + 1000 / this.fps
          const frame = buffer.subarray(0, frameBytes); buffer = buffer.subarray(frameBytes)
          this.loading = false; this.position = Math.min(video.duration, start + frames++ / this.fps)
          this.onFrame(frame, size); this.emit()
          if (!audioStarted && playing && !this.muted) { audioStarted = true; void this.startAudio(video, start, token) }
          if (buffer.length < frameBytes * 3) child.stdout.resume()
          if (!playing) { this.stop(); return }
        } else if (ended) {
          if (!frames && exitCode === 0) return fail(new Error("没有解码出视频帧"))
          this.position = video.duration; this.pause(); return
        } else if (Date.now() - lastFrameAt > 20000) return fail(new Error("视频解码超时，请检查文件或重新打开"))
        this.timer = setTimeout(tick, frames ? Math.max(buffer.length >= frameBytes ? 1 : 10, nextFrameAt - Date.now()) : 20)
      }
      tick()
    } catch (error) {
      if (token !== this.generation || this.disposed) return
      this.pause(); this.onError(error instanceof Error ? error.message : String(error))
    }
  }
  async startAudio(video, position, token) {
    try {
      const binary = await this.binary("ffplay"), path = await nativeMediaPath(binary, video.path)
      if (token !== this.generation || this.disposed || this.muted) return
      const child = this.audio = this.launch(binary, ["-hide_banner", "-loglevel", "error", "-nodisp", "-vn", "-sn", "-autoexit", "-volume", "70", "-ss", String(position), "-protocol_whitelist", "file,pipe", "-i", path])
      let stderr = ""
      child.stdout.resume()
      child.stderr.on("data", (chunk) => { stderr = (stderr + chunk.toString()).slice(-600) })
      const failed = (reason) => { if (token !== this.generation || this.disposed) return; this.muted = true; this.emit(); this.onError(`声音播放失败，已恢复静音：${reason}`) }
      child.on("error", (error) => failed(error.message))
      child.on("close", (code) => { if (code) failed(stderr || String(code)) })
    } catch (error) {
      if (token !== this.generation || this.disposed) return
      this.muted = true; this.emit(); this.onError(String(error))
    }
  }
  dispose() { this.stop(); this.playing = false; this.disposed = true }
}
