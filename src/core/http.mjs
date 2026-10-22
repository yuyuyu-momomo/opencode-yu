import { lookup } from "node:dns/promises"
import { isIP } from "node:net"
import http from "node:http"
import https from "node:https"
import { createGunzip, createBrotliDecompress, createInflate } from "node:zlib"
import { decodeBook } from "../library/text-reader.mjs"
import { HttpsProxyAgent } from "https-proxy-agent"

export function isPublicAddress(address) {
  const value = address.toLowerCase().replace(/^\[|\]$/g, "")
  if (isIP(value) === 4) {
    const [a, b] = value.split(".").map(Number)
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && (b === 168 || b === 0)) || (a === 198 && (b === 18 || b === 19)))
  }
  // Public IPv6 global unicast only; mapped IPv4 and local ranges are rejected.
  return isIP(value) === 6 && /^[23][0-9a-f]{0,3}:/.test(value)
}

export function httpUrl(input) {
  const url = new URL(input)
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("来源只支持不带登录凭据的 HTTP(S) 地址")
  url.hash = ""
  return url
}

/** DNS is checked and pinned for each request, including redirects. */
export function createHttpClient({ allowPrivate = false, maxBytes = 2 * 1024 * 1024, timeoutMs = 15000, useProxy = true } = {}) {
  return async function readPage(input, { signal } = {}) {
    let url = httpUrl(input)
    for (let redirects = 0; redirects <= 4; redirects++) {
      signal?.throwIfAborted()
      const hostname = url.hostname.replace(/^\[|\]$/g, "")
      const addresses = isIP(hostname) ? [{ address: hostname, family: isIP(hostname) }] : await lookup(hostname, { all: true })
      if (!addresses.length || (!allowPrivate && addresses.some((item) => !isPublicAddress(item.address)))) throw new Error("来源不能指向本机、局域网或保留网络地址")
      const pinned = addresses[0]
      const bypass = (process.env.NO_PROXY || process.env.no_proxy || "").split(/[,\s]+/).filter(Boolean).some((value) => {
        if (value === "*") return true
        const [host, port] = value.toLowerCase().split(":")
        if (port && port !== (url.port || (url.protocol === "https:" ? "443" : "80"))) return false
        const suffix = host.replace(/^\*?\./, "")
        return hostname === suffix || hostname.endsWith("." + suffix)
      })
      const proxy = !useProxy || bypass ? undefined : url.protocol === "https:" ? process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy : process.env.HTTP_PROXY || process.env.http_proxy
      const agent = proxy ? new HttpsProxyAgent(proxy) : undefined
      const result = await new Promise((resolve, reject) => {
        const request = (url.protocol === "https:" ? https : http).get(url, {
          signal,
          agent,
          lookup: (_host, options, callback) => options?.all ? callback(null, [pinned]) : callback(null, pinned.address, pinned.family),
          headers: { "User-Agent": "OpenCode-Moyu/0.1 (+local reading library)", Accept: "text/html,text/plain;q=0.9", "Accept-Encoding": "gzip, br, deflate" },
        }, async (response) => {
          try {
            const status = response.statusCode ?? 0
            if ([301, 302, 303, 307, 308].includes(status) && response.headers.location) {
              response.resume()
              resolve({ redirect: response.headers.location })
              return
            }
            if (status < 200 || status >= 300) { response.resume(); throw new Error(`来源返回 HTTP ${status}；停止抓取`) }
            const contentType = String(response.headers["content-type"] ?? "text/html")
            if (!/^(text\/|application\/(xhtml\+xml|xml|json))/i.test(contentType)) { response.resume(); throw new Error(`当前文字来源不支持：${contentType}`) }
            const encoding = response.headers["content-encoding"]
            const stream = encoding === "gzip" ? response.pipe(createGunzip()) : encoding === "br" ? response.pipe(createBrotliDecompress()) : encoding === "deflate" ? response.pipe(createInflate()) : response
            const chunks = []
            let size = 0
            for await (const chunk of stream) {
              size += chunk.length
              if (size > maxBytes) { request.destroy(); throw new Error("来源页面超过大小限制") }
              chunks.push(chunk)
            }
            const bytes = Buffer.concat(chunks)
            const declared = contentType.match(/charset\s*=\s*["']?([^\s;"']+)/i)?.[1] ?? bytes.subarray(0, 4096).toString("latin1").match(/charset\s*=\s*["']?([\w-]+)/i)?.[1]
            const text = declared ? new TextDecoder(declared).decode(bytes) : decodeBook(bytes)
            resolve({ url: url.href, text, contentType })
          } catch (error) { reject(error) }
        })
        request.setTimeout(timeoutMs, () => request.destroy(new Error("来源请求超时")))
        const deadline = setTimeout(() => request.destroy(new Error("来源请求超过总时限")), timeoutMs)
        request.on("close", () => clearTimeout(deadline))
        request.on("error", reject)
      })
      if (result.redirect) { url = httpUrl(new URL(result.redirect, url).href); continue }
      return result
    }
    throw new Error("来源重定向次数过多")
  }
}
