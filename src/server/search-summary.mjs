import { httpUrl } from "../core/http.mjs"

const clean = (text, size) => String(text ?? "").replace(/<[^>]*>/g, " ").replace(/\s+/gu, " ").trim().slice(0, size)

/** Keep full search pages inside the service, never in the model conversation. */
export function searchSummary(results, limit = 5) {
  const items = [], seen = new Set()
  for (const result of results ?? []) {
    let url
    try { url = httpUrl(result.url).href } catch { continue }
    if (seen.has(url) || url.length > 600) continue
    seen.add(url)
    const item = { title: clean(result.title, 80), url, snippet: clean(result.content, 100) }
    if (JSON.stringify([...items, item]).length > 3600) break
    items.push(item)
    if (items.length >= Math.max(1, Math.min(5, limit))) break
  }
  return { results: items, contentOmitted: true }
}

/** Read legacy native websearch output without replaying its scraped pages. */
export function summarizeSearchText(text) {
  const results = []
  for (const match of text.matchAll(/^##\s+\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gm)) results.push({ title: match[1], url: match[2] })
  const summary = searchSummary(results)
  if (!summary.results.length) summary.note = clean(text, 500)
  return JSON.stringify(summary)
}

export async function runSearch(host, { query, limit = 5 }, context) {
  await host.permission.assert({ sessionID: context.sessionID, agent: context.agent, action: "websearch", resources: [query], save: ["*"], metadata: { query }, source: { type: "tool", messageID: context.messageID, id: context.id } })
  const providerID = typeof host.options.searchProvider === "string" ? host.options.searchProvider : "exa"
  if (!["exa", "tavily", "parallel", "firecrawl"].includes(providerID)) throw new Error("采集搜索仅支持 HTTP 搜索接口，不使用浏览器搜索来源")
  try {
    const response = await host.websearch.query({ query, providerID }, { signal: context.signal })
    return JSON.stringify({ providerID: response.data.providerID, ...searchSummary(response.data.results, limit) })
  } catch (error) {
    context.signal.throwIfAborted()
    return JSON.stringify({ results: [], error: error instanceof Error ? error.message.slice(0, 300) : "HTTP 搜索暂不可用", nextAction: "停止搜索，报告原因或请用户提供目录链接" })
  }
}
