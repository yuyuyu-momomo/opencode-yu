/** Slash completion may pass either the full input or only its arguments. */
export function collectionQuery(input) {
  return typeof input === "string" ? input.trim().replace(/^\/?moyu(?:\s+|$)/iu, "").trim() : ""
}

export function collectionPrompt(query) {
  return `采集小说：${query.replace(/\s+/gu, " ")}`
}

/** Submit through OpenCode itself; credentials and generation stay with the host. */
export async function requestCollection(host, input) {
  const query = collectionQuery(input)
  if (!query || query.length > 2000) throw new Error("请输入 1–2000 字的书名、作者或小说目录链接")
  const selected = host.ui.model.current()
  if (!selected) throw new Error("请先在 OpenCode 中选择可用模型")
  const model = { providerID: selected.providerID, id: selected.modelID, ...(selected.variant ? { variant: selected.variant } : {}) }
  const route = host.ui.router.current()
  // Keep the task in an ordinary session: native parentID would turn it into a
  // subagent view whose composer is hidden. Link the source through metadata.
  const session = await host.client.session.create({ title: `Moyu · ${query.slice(0, 50)}`, location: host.location ?? host.data.location.default(), model, metadata: { origin: "moyu", ...(route.type === "session" ? { sourceSessionID: route.sessionID } : {}) } })
  const sessionID = session.id
  host.ui.router.navigate({ type: "session", sessionID })
  await host.client.session.prompt({ sessionID, text: collectionPrompt(query), delivery: "queue", metadata: { origin: "moyu", query } })
  return sessionID
}
