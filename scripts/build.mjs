import { transformAsync } from "@babel/core"
import { build } from "esbuild"
import { readFile, mkdir } from "node:fs/promises"

await mkdir(new URL("../dist/", import.meta.url), { recursive: true })
for (const [entry, outfile] of [["src/ui/index.tsx", "dist/tui.js"], ["src/ui/v2.ts", "dist/tui-v2.js"]]) {
await build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  format: "esm",
  platform: "node",
  target: "es2023",
  external: ["solid-js", "solid-js/*", "@opentui/*", "@opencode-ai/*", "@opencode/plugin", "@opencode/plugin/*"],
  plugins: [{
    name: "opentui-solid",
    setup(builder) {
      builder.onLoad({ filter: /\.tsx$/ }, async ({ path }) => {
        const result = await transformAsync(await readFile(path, "utf8"), {
          filename: path,
          presets: [
            ["babel-preset-solid", { moduleName: "@opentui/solid", generate: "universal" }],
            ["@babel/preset-typescript", { isTSX: true, allExtensions: true }],
          ],
        })
        return { contents: result.code, loader: "js" }
      })
    },
  }],
})
console.log(`Built ${outfile}`)
}
await build({
  entryPoints: ["scripts/install.mjs"],
  outfile: "dist/install.mjs",
  bundle: true,
  format: "esm",
  platform: "node",
  target: "node22",
  mainFields: ["module", "main"],
})
console.log("Built standalone dist/install.mjs")
for (const [entry, outfile] of [["src/server/index.ts", "dist/server.js"], ["src/server/v2.ts", "dist/server-v2.js"]]) {
await build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  format: "esm",
  platform: "node",
  target: "es2023",
  external: ["@opencode/plugin"],
  mainFields: ["module", "main"],
  banner: { js: 'import { createRequire as moyuCreateRequire } from "node:module"; const require = moyuCreateRequire(import.meta.url);' },
})
console.log(`Built ${outfile}`)
}
await import("./licenses.mjs")
