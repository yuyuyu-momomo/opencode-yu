import { load } from "cheerio/slim"
import { cleanText } from "../library/text-reader.mjs"
import { httpUrl } from "../core/http.mjs"

const chapterLink = /第[零〇一二三四五六七八九十百千万两\d]+[章节回卷部篇集]|chapter\s*\d+/iu
function titleOf($) {
  return cleanText($("meta[property='og:novel:book_name']").attr("content") || $("h1").first().text() || $("title").text() || "未命名小说").trim().slice(0, 200)
}
export function parseCatalog(html, url, selector) {
  const $ = load(html)
  const items = [], seen = new Set()
  const base = httpUrl(url)
  $(selector || "a[href]").each((_index, element) => {
    const anchor = $(element)
    const title = cleanText(anchor.text()).replace(/\s+/g, " ").trim()
    if (!title || (!selector && !chapterLink.test(title)) || items.length >= 5000) return
    try {
      const target = httpUrl(new URL(anchor.attr("href"), base).href)
      if (target.origin !== base.origin || target.href === base.href || seen.has(target.href)) return
      seen.add(target.href)
      items.push({ id: target.href, title, url: target.href, kind: "novel" })
    } catch { /* Ignore navigation and non-HTTP links. */ }
  })
  return { title: titleOf($), url: base.href, kind: "novel", items }
}

export function parseContent(html, selector) {
  const $ = load(html)
  const title = titleOf($)
  $("script,style,noscript,iframe,nav,header,footer,form,.ads,.advertisement,[hidden]").remove()
  const candidates = $(selector || "#chaptercontent,#content,.chapter-content,.read-content,.content,article,main")
  let body = candidates.first(), length = 0
  candidates.each((_index, element) => {
    const size = $(element).text().length
    if (size > length) { body = $(element); length = size }
  })
  if (!body.length) {
    if (selector) throw new Error(`正文选择器没有匹配元素：${selector}`)
    body = $("body").length ? $("body") : $.root()
  }
  body.find("br").replaceWith("\n")
  body.find("p,div,section,h1,h2,h3,li").each((_index, element) => { $(element).append("\n") })
  const text = cleanText(body.text()).split("\n").map((line) => line.replace(/[ \t]+/g, " ").trim()).join("\n").replace(/\n{3,}/g, "\n\n").trim()
  if (text.length < 30) throw new Error("可提取的正文不足；请指定正文选择器，或换用可直接访问的文字页面")
  return { title, text, mime: "text/plain" }
}

/** @type {import('../domain/contracts.ts').SourceAdapter} */
export const htmlNovel = {
  id: "html-novel",
  name: "通用 HTML 小说 / 章节目录",
  kinds: ["novel"],
  capabilities: ["catalog", "fetch"],
  matches: (url) => /^https?:\/\//i.test(url),
  async catalog(url, context) {
    const page = await context.page(url)
    return parseCatalog(page.text, page.url, context.selectors?.catalog)
  },
  async fetch(item, context) {
    const page = await context.page(item.url)
    if (/^text\/plain/i.test(page.contentType)) return { title: item.title, text: cleanText(page.text), mime: "text/plain" }
    return parseContent(page.text, context.selectors?.content)
  },
}
