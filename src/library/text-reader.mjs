import stringWidth from "string-width"
import { readFile, stat, realpath, readdir } from "node:fs/promises"
import { resolve, basename, extname } from "node:path"
import { homedir } from "node:os"
import { LibraryVault, defaultKeyFile } from "./vault.mjs"
import { LibraryStore } from "./store.mjs"
import { dirname } from "node:path"

const segmenter = new Intl.Segmenter("zh", { granularity: "grapheme" })
const chapterPattern = /^(?:第[零〇一二三四五六七八九十百千万两\d]+[章节回卷部篇集](?:\s|[：:、.．]|[^\d]).*|第[零〇一二三四五六七八九十百千万两\d]+[章节回卷部篇集]|(?:序章|序言|楔子|引子|前言|尾声|后记|终章|番外)(?:\s.*|[：:、].*)?|chapter\s+\d+.*)$/iu

export function expandPath(input, cwd = process.cwd()) {
  const value = input.trim().replace(/^(["'])(.*)\1$/, "$2")
  if (!value) throw new Error("请输入小说文件路径")
  return resolve(cwd, value === "~" ? homedir() : value.startsWith("~/") ? homedir() + value.slice(1) : value)
}

export function decodeBook(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xfe) return new TextDecoder("utf-16le").decode(bytes)
  if (bytes[0] === 0xfe && bytes[1] === 0xff) return new TextDecoder("utf-16be").decode(bytes)
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes)
  } catch {
    return new TextDecoder("gb18030", { fatal: true }).decode(bytes)
  }
}

export function cleanText(text) {
  return text
    .replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g, "")
    .replace(/\x1b\[[0-?]*[ -/]*[@-~]/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/\t/g, "    ")
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\x9f\u202a-\u202e\u2066-\u2069]/g, "")
    .replace(/^\uFEFF/, "")
}

function chapterIdentity(title) {
  const match = title.normalize("NFKC").match(/^第([零〇一二三四五六七八九十百千万两\d]+)([章节回卷部篇集])(.*)$/u)
  if (!match) return title
  const digits = { 零: 0, 〇: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 }
  const units = { 十: 10, 百: 100, 千: 1000, 万: 10000 }
  let total = 0, section = 0, digit = 0
  if (/^\d+$/u.test(match[1])) total = Number(match[1])
  else {
    for (const char of match[1]) {
      if (char in digits) digit = digits[char]
      else if (units[char] === 10000) { total += (section + digit) * 10000; section = 0; digit = 0 }
      else if (units[char]) { section += (digit || 1) * units[char]; digit = 0 }
      else return title
    }
    total += section + digit
  }
  return `${total}:${match[2]}:${match[3].replace(/\s+/gu, "")}`
}

export function chaptersOf(text) {
  const chapters = []
  let offset = 0, headingEnd = 0
  for (const line of text.split("\n")) {
    const title = line.trim()
    if (title.length <= 100 && chapterPattern.test(title)) {
      const previous = chapters.at(-1)
      if (!previous || chapterIdentity(previous.title) !== chapterIdentity(title) || text.slice(headingEnd, offset).trim()) chapters.push({ title, offset })
      headingEnd = offset + line.length
    }
    offset += line.length + 1
  }
  return chapters
}

function wrapLines(text, width) {
  const lines = []
  const widths = new Map()
  let line = "", columns = 0, start = 0, offset = 0
  for (const paragraph of text.split("\n")) {
    for (const { segment } of segmenter.segment(paragraph)) {
      let cells = widths.get(segment)
      if (cells === undefined) {
        cells = stringWidth(segment)
        if (widths.size < 4096) widths.set(segment, cells)
      }
      if (columns + cells > width && line) {
        lines.push({ text: line, start })
        line = ""
        columns = 0
        start = offset
      }
      line += segment
      columns += cells
      offset += segment.length
    }
    lines.push({ text: line, start })
    offset += 1
    start = offset
    line = ""
    columns = 0
  }
  return lines
}

function groupPages(lines, rows) {
  const pages = []
  for (let index = 0; index < lines.length; index += rows) {
    pages.push({ start: lines[index].start, text: lines.slice(index, index + rows).map((item) => item.text).join("\n") })
  }
  while (pages.length > 1 && !pages.at(-1).text.trim()) pages.pop()
  return pages
}

function validSize(width, rows) {
  if (!Number.isInteger(width) || width < 2 || !Number.isInteger(rows) || rows < 1) throw new Error("分页尺寸无效")
}

export function paginate(text, width = 36, rows = 16) {
  validSize(width, rows)
  return groupPages(wrapLines(text, width), rows)
}

/** Retain only the current book, one wrapped width and one page grouping. */
export function createPaginator() {
  let previousText, previousWidth, previousRows, lines, pages
  return (text, width = 36, rows = 16) => {
    validSize(width, rows)
    if (text !== previousText || width !== previousWidth) {
      lines = wrapLines(text, width)
      previousText = text; previousWidth = width; previousRows = undefined
    }
    if (rows !== previousRows) { pages = groupPages(lines, rows); previousRows = rows }
    return pages
  }
}

export function pageAt(pages, offset) {
  let low = 0, high = pages.length - 1
  while (low < high) {
    const mid = Math.ceil((low + high) / 2)
    if (pages[mid].start <= offset) low = mid
    else high = mid - 1
  }
  return low
}

/** @param {string} input @param {string} [cwd] @param {{keyFile?: string}} [options] */
export async function loadBook(input, cwd, { keyFile } = {}) {
  const path = await realpath(expandPath(input, cwd))
  const info = await stat(path)
  if (!info.isFile()) throw new Error("请选择 TXT 或 Markdown 文件")
  if (extname(path).toLowerCase() === ".moyubook") {
    if (info.size > 34 * 1024 * 1024) throw new Error("加密文件超过大小限制")
    const payload = await new LibraryVault(keyFile || defaultKeyFile(dirname(path))).unseal(await readFile(path))
    if (typeof payload.title !== "string" || typeof payload.text !== "string" || typeof payload.resourceId !== "string") throw new Error("加密资料格式无效")
    return { path, title: payload.title, text: payload.text, chapters: chaptersOf(payload.text), resourceId: payload.resourceId }
  }
  if (![".txt", ".md"].includes(extname(path).toLowerCase())) throw new Error("目前支持 .txt、.md 和加密资料文件")
  if (info.size > 32 * 1024 * 1024) throw new Error("文件超过 32 MiB，请按卷拆分")
  const text = cleanText(decodeBook(await readFile(path)))
  if (!text.trim()) throw new Error("这个文件没有可阅读的内容")
  return { path, title: basename(path, extname(path)), text, chapters: chaptersOf(text) }
}

/** @param {string} directory @param {{keyFile?: string}} [options] */
export async function listBooks(directory, { keyFile } = {}) {
  const entries = await readdir(directory, { withFileTypes: true })
  const plain = entries
    .filter((item) => item.isFile() && /\.(?:txt|md)$/i.test(item.name))
    .map((item) => ({ title: basename(item.name, extname(item.name)), path: resolve(directory, item.name) }))
    .sort((a, b) => a.title.localeCompare(b.title, "zh"))
  const resources = entries.some((item) => item.name === ".moyu") ? await new LibraryStore(directory, { keyFile }).resources() : []
  const managed = resources.filter((item) => item.kind === "novel").map((item) => ({ title: item.title, path: item.assets.find((asset) => asset.role === "body")?.path, resourceId: item.id })).filter((item) => item.path)
  return [...managed, ...plain.filter((item) => !managed.some((saved) => saved.title === item.title))]
}
