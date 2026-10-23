import test from "node:test"
import assert from "node:assert/strict"
import { FrameQueue } from "../src/media/frame-queue.mjs"

test("任意输入块边界可还原每帧，旧帧不被后续消费改变，已读缓冲及时释放", () => {
  const size = 731, source = Buffer.from(Array.from({length:size*200},(_,i)=>i%251))
  const queue = new FrameQueue(), frames = []
  for (let offset = 0; offset < source.length;) {
    const count = Math.min(1+(offset*7)%997, source.length-offset)
    queue.push(source.subarray(offset, offset+count)); offset += count
    while (queue.length >= size) frames.push(queue.read(size))
    assert.equal(queue.read(size), undefined)
  }
  assert.equal(frames.length, 200)
  assert.deepEqual(Buffer.concat(frames), source)
  assert.equal(queue.length, 0); assert.equal(queue.chunks.length, 0)
  for (let i=0;i<1000;i++) {queue.push(Buffer.alloc(1,42));assert.equal(queue.read(1)[0],42)}
  assert.deepEqual(Buffer.concat(frames), source)
})
