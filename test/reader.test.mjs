import test from "node:test"
import assert from "node:assert/strict"
import { mkdtemp, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import stringWidth from "string-width"
import { chaptersOf, cleanText, decodeBook, loadBook, pageAt, paginate } from "../src/library/text-reader.mjs"

test("中文、组合字符和 emoji 分页不截断字素，不丢正文", () => {
  const input = "第一章 测试\n\n你好世界 👩‍💻 cafe\u0301，欢迎回来。".repeat(20)
  const pages = paginate(input, 12, 5)
  assert.ok(pages.length > 2)
  for (const page of pages) for (const line of page.text.split("\n")) assert.ok(stringWidth(line) <= 12)
  assert.equal(pages.map((p) => p.text).join("").replaceAll("\n", ""), input.replaceAll("\n", ""))
  for (const page of pages) assert.notEqual(page.text[0], "\u200d")
})

test("字符偏移可以在窗口尺寸改变后恢复原阅读位置", () => {
  const text = "汉字测试，English! ".repeat(300)
  const old = paginate(text, 36, 16)
  const position = old[7].start
  const resized = paginate(text, 36, 8)
  const index = pageAt(resized, position)
  assert.ok(resized[index].start <= position)
  assert.ok(resized[index + 1].start > position)
  assert.equal(pageAt(old, position), 7)
  assert.equal(pageAt(old, -100), 0)
  assert.equal(pageAt(old, Infinity), old.length - 1)
})

test("末尾换行不会生成跳转到 100% 仍无法抵达的空白末页", () => {
  for (const text of ["第一章\n正文\n", "第一章\n正文\n\n\n"]) {
    const pages = paginate(text, 36, 1)
    assert.equal(pages.length, 2)
    assert.equal(pages.at(-1).text, "正文")
    assert.equal(pageAt(pages, text.length - 1), pages.length - 1)
  }
  assert.equal(paginate("").length, 1)
})

test("识别中文章节、无空格章节和英文章节，保留准确偏移", () => {
  const text = "书名\n第一章雨夜\n正文\n第二章\n正文\nChapter 3: Home\n正文\n后记\n"
  const chapters = chaptersOf(text)
  assert.deepEqual(chapters.map((c) => c.title), ["第一章雨夜", "第二章", "Chapter 3: Home", "后记"])
  for (const item of chapters) assert.ok(text.slice(item.offset).startsWith(item.title))
})

test("UTF-8、UTF-16 和 GBK 小说均可解码", () => {
  assert.equal(decodeBook(Buffer.from("你好小说")), "你好小说")
  assert.equal(decodeBook(Buffer.from([0xc4, 0xe3, 0xba, 0xc3])), "你好")
  assert.equal(decodeBook(Buffer.concat([Buffer.from([0xff, 0xfe]), Buffer.from("你好", "utf16le")])), "你好")
  assert.equal(decodeBook(Buffer.from([0xfe, 0xff, 0x4f, 0x60, 0x59, 0x7d])), "你好")
})

test("采集标题与正文的数字写法不同不会生成重复目录，实际章节和偏移仍保留", () => {
  const text = "第1章 雨夜\n\n第一章 雨夜\n正文\n第20章 青牛镇\n第二十章 青牛镇\n正文\n第21章 青牛镇\n第二十一章 青牛镇\n正文\n第100章 重逢\n第一百章 重逢\n正文"
  const chapters = chaptersOf(text)
  assert.deepEqual(chapters.map((chapter) => chapter.title), ["第1章 雨夜", "第20章 青牛镇", "第21章 青牛镇", "第100章 重逢"])
  for (const chapter of chapters) assert.ok(text.slice(chapter.offset).startsWith(chapter.title))
  assert.equal(chaptersOf("第1章 序\n第二章 序").length, 2)
  assert.equal(chaptersOf("第17章 归来(1)\n第十七章 归来（1）\n正文").length, 1)
  assert.equal(chaptersOf("  第1章 雨夜  \n\n 第一章 雨夜\n第1章 雨夜\n正文").length, 1)
  assert.equal(chaptersOf("第1章 雨夜\n正文\n第一章 雨夜\n正文").length, 2)
})

test("移除控制序列，同时保留换行和正文", () => {
  assert.equal(cleanText("\ufeff正文\r\n\x1b[31m红色\x1b[0m\x1b]0;title\x07\x00\t后文"), "正文\n红色    后文")
})

test("加载真实本地 TXT，拒绝空文件和不支持的文件", async () => {
  const dir = await mkdtemp(join(tmpdir(), "moyu-reader-"))
  const file = join(dir, "小说.txt")
  await writeFile(file, "第一章 雨\n正文")
  const book = await loadBook(file)
  assert.equal(book.title, "小说")
  assert.equal(book.chapters.length, 1)
  await writeFile(file, " \n")
  await assert.rejects(loadBook(file), /没有可阅读/)
  const epub = join(dir, "novel.epub")
  await writeFile(epub, "data")
  await assert.rejects(loadBook(epub), /支持/)
  await assert.rejects(loadBook(dir), /请选择/)
})
