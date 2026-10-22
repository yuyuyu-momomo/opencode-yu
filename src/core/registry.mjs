/** Adapter registration is independent of OpenCode and of any specific website. */
export class SourceRegistry {
  #adapters = new Map()
  register(adapter) {
    if (!adapter.id || this.#adapters.has(adapter.id)) throw new Error(`来源 ID 为空或重复：${adapter.id}`)
    if (!Array.isArray(adapter.kinds) || !adapter.kinds.length) throw new Error("来源必须声明内容类型")
    for (const capability of adapter.capabilities ?? []) {
      if (!["catalog", "fetch"].includes(capability) || typeof adapter[capability] !== "function") throw new Error(`无效来源能力：${capability}`)
    }
    this.#adapters.set(adapter.id, adapter)
    return this
  }
  list() {
    return [...this.#adapters.values()].map(({ id, name, kinds, capabilities }) => ({ id, name, kinds, capabilities }))
  }
  resolve(url, id) {
    const adapter = id ? this.#adapters.get(id) : [...this.#adapters.values()].find((item) => item.matches(url))
    if (!adapter) throw new Error(`没有匹配的来源适配器：${id || url}`)
    return adapter
  }
}
