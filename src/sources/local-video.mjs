import { stableId } from "../library/store.mjs"
import { inspectVideo } from "../media/runtime.mjs"
import { cleanText } from "../library/text-reader.mjs"

/** Video references use encrypted resource metadata; source bytes stay in place. */
export async function addLocalVideo(library, input, cwd) {
  const media = await inspectVideo(input, cwd)
  media.title = cleanText(media.title)
  const id = stableId("local-video:" + media.path)
  await library.putResource({ schemaVersion: 1, id, kind: "video", title: media.title, source: { adapter: "local-video", url: media.path }, assets: [{ role: "media", mime: "video/*", path: media.path }], metadata: { ...media, originalFile: true }, updatedAt: new Date().toISOString() })
  return { ...media, id }
}

export async function resolveLocalVideo(resource) {
  if (resource.kind !== "video" || resource.source.adapter !== "local-video") throw new Error("暂不支持这个视频来源")
  const path = resource.assets.find((asset) => asset.role === "media")?.path
  if (!path) throw new Error("视频记录没有本地文件路径")
  return { ...await inspectVideo(path), id: resource.id, title: resource.title }
}
