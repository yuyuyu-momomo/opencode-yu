import test from "node:test"
import assert from "node:assert/strict"
import { mkdtemp, readFile, writeFile, readdir, mkdir, copyFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"
import { parse } from "jsonc-parser"

const script = fileURLToPath(new URL("../dist/install.mjs", import.meta.url))
const install = (dir, ...args) => spawnSync(process.execPath, [script, "--config-dir", dir, "--opencode-major", "1", ...args], { encoding: "utf8" })

test("安装、重复安装和卸载保留原有插件、JSONC 注释和 provider 配置", async () => {
  const dir = await mkdtemp(join(tmpdir(), "moyu-install-"))
  const file = join(dir, "tui.jsonc")
  const original = '{\n // 保留注释\n "theme": "custom",\n "plugin": ["other-plugin"],\n}\n'
  await writeFile(file, original)
  await writeFile(join(dir, "opencode.json"), '{"provider":{"test":"unchanged"}}')
  assert.equal(install(dir).status, 0)
  const installed = await readFile(file, "utf8")
  assert.ok(installed.includes("// 保留注释"))
  assert.equal(parse(installed).theme, "custom")
  assert.equal(parse(installed).plugin[0], "other-plugin")
  assert.equal(parse(installed).plugin.length, 2)
  assert.equal(install(dir).status, 0)
  assert.equal(await readFile(file, "utf8"), installed)
  const backups = (await readdir(dir)).filter((name) => name.includes("backup"))
  assert.equal(backups.length, 2)
  const tuiBackup = backups.find((name) => name.startsWith("tui.jsonc"))
  assert.equal(await readFile(join(dir, tuiBackup), "utf8"), original)
  assert.equal(install(dir, "--remove").status, 0)
  assert.deepEqual(parse(await readFile(file, "utf8")).plugin, ["other-plugin"])
  const server = parse(await readFile(join(dir, "opencode.json"), "utf8"))
  assert.deepEqual(server.provider, { test: "unchanged" })
  assert.deepEqual(server.plugin, [])
})

test("损坏的配置拒绝写入", async () => {
  const dir = await mkdtemp(join(tmpdir(), "moyu-install-bad-"))
  const file = join(dir, "tui.json")
  await writeFile(file, '{"plugin": [ broken')
  assert.notEqual(install(dir).status, 0)
  assert.equal(await readFile(file, "utf8"), '{"plugin": [ broken')
})

test("免依赖安装包可从含空格的目录安装，删除解压目录后仍可使用和卸载", async () => {
  const dir = await mkdtemp(join(tmpdir(), "摸鱼 免依赖-"))
  const extracted = join(dir, "解压 目录"), configDir = join(dir, "config")
  await mkdir(join(extracted, "dist"), { recursive: true })
  await mkdir(join(extracted, "books"))
  for (const name of ["install.mjs", "tui.js", "server.js", "tui-v2.js", "server-v2.js"]) await copyFile(fileURLToPath(new URL("../dist/" + name, import.meta.url)), join(extracted, "dist", name))
  await copyFile(fileURLToPath(new URL("../books/夜班便利店.txt", import.meta.url)), join(extracted, "books", "夜班便利店.txt"))
  const result = spawnSync(process.execPath, [join(extracted, "dist/install.mjs"), "--config-dir", configDir, "--opencode-major", "1"], { encoding: "utf8" })
  assert.equal(result.status, 0, result.stderr)
  const config = parse(await readFile(join(configDir, "tui.json"), "utf8"))
  const installed = fileURLToPath(config.plugin[0][0])
  await rm(extracted, { recursive: true })
  assert.ok((await readFile(installed, "utf8")).includes("opencode-moyu"))
  assert.ok((await readFile(join(config.plugin[0][1].booksDir, "夜班便利店.txt"), "utf8")).includes("第一章"))
  const uninstall = spawnSync(process.execPath, [join(configDir, "extensions/opencode-moyu/dist/install.mjs"), "--config-dir", configDir, "--opencode-major", "1", "--remove"], { encoding: "utf8" })
  assert.equal(uninstall.status, 0, uninstall.stderr)
  assert.deepEqual(parse(await readFile(join(configDir, "tui.json"), "utf8")).plugin, [])
})

test("OpenCode 2 使用包目录与双入口，重复安装、卸载保留模型和其他插件", async () => {
  const dir = await mkdtemp(join(tmpdir(), "moyu-install-v2-"))
  await writeFile(join(dir, "opencode.json"), '{"model":"test/model","plugins":[{"package":"other","options":{"x":1}}]}')
  const run = (...args) => install(dir, "--opencode-major", "2", ...args)
  assert.equal(run().status, 0)
  const server = parse(await readFile(join(dir, "opencode.json"), "utf8"))
  assert.ok(server.plugins[1].package.endsWith("/extensions/opencode-moyu"))
  const pkg = JSON.parse(await readFile(join(fileURLToPath(server.plugins[1].package), "package.json"), "utf8"))
  assert.equal(pkg.exports["."], "./dist/server-v2.js")
  assert.equal(pkg.exports["./tui"], "./dist/tui-v2.js")
  assert.equal(server.model, "test/model")
  assert.equal(run().status, 0)
  assert.equal(parse(await readFile(join(dir, "opencode.json"), "utf8")).plugins.length, 2)
  assert.equal(run("--remove").status, 0)
  assert.deepEqual(parse(await readFile(join(dir, "opencode.json"), "utf8")).plugins, [{ package: "other", options: { x: 1 } }])
})
