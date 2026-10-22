import { SourceRegistry } from "../core/registry.mjs"
import { htmlNovel } from "./html-novel.mjs"

/** Register new source adapters here; tools and UI do not depend on site details. */
export function createSourceRegistry() {
  return new SourceRegistry().register(htmlNovel)
}
