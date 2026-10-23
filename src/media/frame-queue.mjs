/** Stream chunks are immutable. Assemble each frame at most once, not per chunk. */
export class FrameQueue {
  constructor() { this.chunks = []; this.head = 0; this.offset = 0; this.length = 0 }
  push(chunk) { if (chunk.length) { this.chunks.push(chunk); this.length += chunk.length } }
  read(size) {
    if (this.length < size) return
    const first = this.chunks[this.head]
    let frame
    if (first.length - this.offset >= size) {
      frame = first.subarray(this.offset, this.offset + size)
      this.offset += size
      if (this.offset === first.length) { this.chunks[this.head++] = undefined; this.offset = 0 }
    } else {
      frame = Buffer.allocUnsafe(size)
      let written = 0
      while (written < size) {
        const chunk = this.chunks[this.head], count = Math.min(size - written, chunk.length - this.offset)
        chunk.copy(frame, written, this.offset, this.offset + count)
        written += count; this.offset += count
        if (this.offset === chunk.length) { this.chunks[this.head++] = undefined; this.offset = 0 }
      }
    }
    this.length -= size
    if (this.head === this.chunks.length) { this.chunks = []; this.head = 0 }
    else if (this.head > 64) { this.chunks = this.chunks.slice(this.head); this.head = 0 }
    return frame
  }
}
