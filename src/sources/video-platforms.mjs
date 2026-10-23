import { createHttpClient } from "../core/http.mjs"
import { cleanText } from "../library/text-reader.mjs"

const short = (value, max = 180) => cleanText(String(value ?? "").replace(/<[^>]*>/g, "")).slice(0, max)
export function videoUrl(input) {
  const value = input.trim()
  if (/^BV[\da-zA-Z]{10}$/.test(value)) return { platform: "bilibili", id: value, url: `https://www.bilibili.com/video/${value}/` }
  if (/^[\w-]{11}$/.test(value)) return { platform: "youtube", id: value, url: `https://www.youtube.com/watch?v=${value}` }
  let url
  try { url = new URL(value) } catch { throw new Error("请输入 B 站 BV 号或完整视频链接 / YouTube 视频链接") }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.port) throw new Error("视频链接格式不支持")
  const host = url.hostname.toLowerCase()
  if (["www.bilibili.com", "bilibili.com", "m.bilibili.com"].includes(host)) {
    const id = url.pathname.match(/^\/video\/(BV[\da-zA-Z]{10}|av\d+)(?:\/|$)/)?.[1]
    if (id) {
      const page = Math.max(1, Math.min(1000, Number(url.searchParams.get("p")) || 1))
      return { platform: "bilibili", id, page, url: `https://www.bilibili.com/video/${id}/${page > 1 ? "?p=" + Math.floor(page) : ""}` }
    }
  }
  if (["www.youtube.com", "youtube.com", "m.youtube.com", "youtu.be"].includes(host)) {
    const id = host === "youtu.be" ? url.pathname.slice(1) : url.pathname === "/watch" ? url.searchParams.get("v") : url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1]
    if (id && /^[\w-]{11}$/.test(id)) return { platform: "youtube", id, url: `https://www.youtube.com/watch?v=${id}` }
  }
  throw new Error("仅支持 B 站单个视频和 YouTube 单个视频链接；短链接请先复制完整地址")
}

export function createVideoPlatforms({ settings, read = createHttpClient({ maxBytes: 1024 * 1024, maxRedirects: 0 }) }) {
  async function youtube(path, params, signal) {
    const key = await settings.key()
    if (!key) throw new Error("请先在「视频来源设置」填写 YouTube API Key")
    const url = new URL("https://www.googleapis.com/youtube/v3/" + path)
    for (const [name, value] of Object.entries(params)) url.searchParams.set(name, String(value))
    try {
      const result = await read(url.href, { signal, headers: { Accept: "application/json", "X-Goog-Api-Key": key } })
      const data = JSON.parse(result.text)
      if (data.error) throw new Error("API_ERROR")
      return data
    } catch (error) {
      if (signal?.aborted) throw error
      // Never propagate a response or transport error that could echo the key.
      const code = String(error).match(/HTTP\s+(\d{3})/)?.[1]
      throw new Error(`YouTube API 请求失败${code ? "（HTTP " + code + "）" : ""}，请检查 API Key、YouTube Data API v3 是否启用、配额和网络。`)
    }
  }
  async function bili(path, params, signal) {
    const url = new URL("https://api.bilibili.com" + path)
    for (const [name, value] of Object.entries(params)) url.searchParams.set(name, String(value))
    const result = await read(url.href, { signal, headers: { Accept: "application/json", Referer: "https://www.bilibili.com/" } })
    const data = JSON.parse(result.text)
    if (data.code !== 0) throw new Error(`B 站接口返回 ${Number(data.code)}，当前来源不可用；请检查链接或稍后重试`)
    return data.data
  }
  async function search({ platform, query, limit = 5, signal }) {
    query = String(query).trim().slice(0, 200)
    if (!query) throw new Error("请输入视频关键词")
    limit = Math.max(1, Math.min(5, Math.floor(Number(limit) || 5)))
    if (platform === "youtube") {
      const data = await youtube("search", { part: "snippet", type: "video", q: query, maxResults: limit, fields: "items(id/videoId,snippet(title,channelTitle,description))" }, signal)
      return (data.items || []).filter((item) => /^[\w-]{11}$/.test(item.id?.videoId)).map((item) => ({ platform, id: item.id.videoId, url: `https://www.youtube.com/watch?v=${item.id.videoId}`, title: short(item.snippet.title), author: short(item.snippet.channelTitle, 80), description: short(item.snippet.description, 200) })).slice(0, limit)
    }
    if (platform !== "bilibili") throw new Error("未知视频来源")
    const data = await bili("/x/web-interface/search/type", { search_type: "video", keyword: query, page: 1, page_size: limit }, signal)
    return (data.result || []).filter((item) => /^BV[\da-zA-Z]{10}$/.test(item.bvid)).slice(0, limit).map((item) => ({ platform, id: item.bvid, url: `https://www.bilibili.com/video/${item.bvid}/`, title: short(item.title), author: short(item.author, 80), description: short(item.description, 200), duration: short(item.duration, 20) }))
  }
  async function info(input, { signal } = {}) {
    const target = videoUrl(input)
    if (target.platform === "youtube") {
      const data = await youtube("videos", { part: "snippet,contentDetails,statistics", id: target.id, fields: "items(id,snippet(title,channelTitle,description),contentDetails/duration,statistics/viewCount)" }, signal)
      const item = data.items?.[0]
      if (!item) throw new Error("YouTube 未返回这个视频，可能已删除、非公开或不可访问")
      return { ...target, title: short(item.snippet.title), author: short(item.snippet.channelTitle, 80), description: short(item.snippet.description, 600), duration: short(item.contentDetails?.duration, 40), views: Number(item.statistics?.viewCount) || 0 }
    }
    const data = await bili("/x/web-interface/view", target.id.startsWith("av") ? { aid: target.id.slice(2) } : { bvid: target.id }, signal)
    return { ...target, title: short(data.title), author: short(data.owner?.name, 80), description: short(data.desc, 600), duration: Number(data.duration) || 0, views: Number(data.stat?.view) || 0 }
  }
  return { search, info, list: () => [{ id: "bilibili", name: "哔哩哔哩", search: true, apiKey: false }, { id: "youtube", name: "YouTube", search: true, apiKey: true }] }
}
