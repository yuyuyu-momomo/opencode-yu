// Optional comparison with a clean checkout: MOYU_BENCHMARK_BASELINE=/tmp/old node scripts/benchmark.mjs
import { performance } from "node:perf_hooks"
import { pathToFileURL } from "node:url"
import { resolve } from "node:path"
import assert from "node:assert/strict"
import { createPaginator } from "../src/library/text-reader.mjs"
import { FrameQueue } from "../src/media/frame-queue.mjs"

const baseline = process.env.MOYU_BENCHMARK_BASELINE && await import(pathToFileURL(resolve(process.env.MOYU_BENCHMARK_BASELINE, "src/library/text-reader.mjs")))
const text = ("第一章 测试\n" + "这是一段用于性能测试的小说正文，包含 English 123。".repeat(20) + "\n").repeat(1000)
const pagination = []
const paginate = createPaginator()
for (const [width, rows] of [[36,16], [36,8], [36,16], [50,16], [36,16]]) {
  const begin = performance.now(), pages = paginate(text, width, rows), after = performance.now() - begin
  let before
  if (baseline) { const start = performance.now(), expected = baseline.paginate(text, width, rows); before = performance.now() - start; assert.deepEqual(pages, expected) }
  pagination.push({ width, rows, pages: pages.length, beforeMs: before && +before.toFixed(2), afterMs: +after.toFixed(2) })
}
const size = 1280 * 720 * 3, input = Buffer.alloc(size, 83)
let oldCopies = 0, assembled = Buffer.alloc(0), start = performance.now()
for (let offset = 0; offset < input.length; offset += 65536) {
  const chunk = input.subarray(offset, offset + 65536)
  if (assembled.length) { oldCopies += assembled.length + chunk.length; assembled = Buffer.concat([assembled, chunk]) } else assembled = chunk
}
const oldMs = performance.now() - start, queue = new FrameQueue()
start = performance.now()
for (let offset = 0; offset < input.length; offset += 65536) queue.push(input.subarray(offset, offset + 65536))
const frame = queue.read(size), newMs = performance.now() - start
assert.deepEqual(frame, assembled)
console.log(JSON.stringify({ bytes: Buffer.byteLength(text), pagination, frameAssembly: { bytes: size, beforeCopiedBytes: oldCopies, afterCopiedBytes: size, beforeMs: +oldMs.toFixed(2), afterMs: +newMs.toFixed(2) } }, null, 2))
