/** Shared contracts for source adapters, persisted resources, and future viewers. */
export type ContentKind = "novel" | "article" | "video" | "audio" | "image" | "dataset"
export type Capability = "catalog" | "fetch"
export type SourceItem = { id: string; title: string; url: string; kind: ContentKind; metadata?: Record<string, unknown> }
export type SourceCatalog = { title: string; url: string; kind: ContentKind; items: SourceItem[] }
export type ContentAsset = { role: "body" | "media" | "subtitle" | "thumbnail" | "data"; mime: string; path?: string; url?: string }
export type ContentResource = {
  schemaVersion: 1
  id: string
  kind: ContentKind
  title: string
  source: { adapter: string; url: string }
  assets: ContentAsset[]
  metadata: Record<string, unknown>
  updatedAt: string
}
export type SourceContext = {
  signal?: AbortSignal
  page: (url: string) => Promise<{ url: string; text: string; contentType: string }>
  selectors?: { catalog?: string; content?: string }
}
export type SourceAdapter = {
  id: string
  name: string
  kinds: ContentKind[]
  capabilities: Capability[]
  matches: (url: string) => boolean
  catalog: (url: string, context: SourceContext) => Promise<SourceCatalog>
  fetch: (item: SourceItem, context: SourceContext) => Promise<{ title: string; text: string; mime: string; metadata?: Record<string, unknown> }>
}
