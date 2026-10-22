import { readFile, writeFile, readdir } from "node:fs/promises"
const packages = new Set()
for (const file of ["dist/tui.js", "dist/tui-v2.js", "dist/server.js", "dist/server-v2.js", "dist/install.mjs"]) {
  for (const match of (await readFile(file, "utf8")).matchAll(/node_modules\/((?:@[^/]+\/)?[^/\s"']+)/g)) packages.add(match[1])
}
let output = "Bundled third-party software notices\n\n"
for (const name of [...packages].sort()) {
  const directory = "node_modules/" + name
  const metadata = JSON.parse(await readFile(directory + "/package.json", "utf8"))
  const license = (await readdir(directory)).find((file) => /^license(?:\.txt|\.md)?$/i.test(file))
  output += "\n===== " + name + " " + metadata.version + " =====\n" + (license ? await readFile(directory + "/" + license, "utf8") : "License: " + metadata.license + "; " + (metadata.repository?.url ?? "")) + "\n"
}
await writeFile("THIRD_PARTY_NOTICES.txt", output)
console.log(`Third-party notices: ${packages.size} packages`)
