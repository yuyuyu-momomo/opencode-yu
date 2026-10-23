/** Native image ownership stays with the host renderer; no raw terminal writes. */
export function imageProtocol(core, renderer) {
  if (typeof core.ImageRenderable !== "function" || typeof core.NativeImage?.fromRgba !== "function") return "legacy"
  const caps = renderer.capabilities || {}
  const requested = caps.image_protocol || "auto"
  if (typeof core.resolveImageRenderProtocol === "function") return core.resolveImageRenderProtocol(requested, caps, Boolean(renderer.resolution))
  if (requested === "blocks" || caps.multiplexer && caps.multiplexer !== "none") return "blocks"
  if (caps.kitty_graphics) return "kitty"
  return caps.sixel && renderer.resolution ? "sixel" : "blocks"
}

export function imageFrameSize(width, height, columns, rows, renderer, protocol) {
  const cellWidth = renderer.resolution?.width / renderer.width || 8
  const cellHeight = renderer.resolution?.height / renderer.height || 16
  const maxWidth = Math.min(1280, Math.max(2, columns * (protocol === "blocks" ? 4 : cellWidth)))
  const maxHeight = Math.min(1280, Math.max(2, rows * (protocol === "blocks" ? 8 : cellHeight)))
  const scale = Math.min(1, maxWidth / width, maxHeight / height, Math.sqrt(921600 / (width * height)))
  return { width: Math.max(2, Math.floor(width * scale / 2) * 2), height: Math.max(2, Math.floor(height * scale / 2) * 2) }
}

export class InlineImage {
  constructor(core, renderer, onError = (_error) => {}) { this.core = core; this.renderer = renderer; this.onError = onError }
  mount(container) {
    this.unmount()
    try {
      this.node = new this.core.ImageRenderable(this.renderer, { id: "moyu-video-image", width: "100%", height: "100%", fit: "fit", protocol: "auto", onError: this.onError })
      container.add(this.node)
      if (this.last) this.draw(this.last.bytes, this.last.size)
    } catch (error) { this.onError(error) }
  }
  present(bytes, size) {
    this.last = { bytes: Buffer.from(bytes), size }
    if (this.node && !this.node.isDestroyed) {
      try { this.draw(bytes, size) } catch (error) { this.onError(error) }
    }
  }
  draw(bytes, size) {
    if (bytes.length !== size.width * size.height * 3) throw new Error("原画帧长度异常")
    const rgba = Buffer.allocUnsafe(size.width * size.height * 4)
    for (let source = 0, target = 0; source < bytes.length; source += 3, target += 4) {
      rgba[target] = bytes[source]; rgba[target + 1] = bytes[source + 1]; rgba[target + 2] = bytes[source + 2]; rgba[target + 3] = 255
    }
    const image = this.core.NativeImage.fromRgba(rgba, size.width, size.height, size.width * 4, { owner: this.renderer.nativeScene?.resourceContext })
    try { this.node.source = image } finally { image.dispose() }
  }
  clear() { this.last = undefined; if (this.node && !this.node.isDestroyed) this.node.source = undefined }
  unmount() { if (this.node && !this.node.isDestroyed) this.node.destroy(); this.node = undefined }
  dispose() { this.clear(); this.unmount() }
}
