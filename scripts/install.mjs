import { parse, modify, applyEdits } from "jsonc-parser"
import { readFile, writeFile, copyFile, rename, stat, mkdir, access, unlink } from "node:fs/promises"
import { constants } from "node:fs"
import { resolve, join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { homedir } from "node:os"
import { parseArgs } from "node:util"
import { randomUUID } from "node:crypto"
import { spawnSync } from "node:child_process"

const { values } = parseArgs({ options: { "config-dir": { type: "string" }, "opencode-major": { type: "string" }, remove: { type: "boolean", default: false }, "dry-run": { type: "boolean", default: false } } })
const version = values["opencode-major"] ?? (spawnSync(process.env.MOYU_OPENCODE_BINARY || "opencode", ["--version"], { encoding: "utf8", timeout: 15000 }).stdout || "").match(/(?:^|\s)v?([12])\.\d+\.\d+/m)?.[1]
if (version !== "1" && version !== "2") throw new Error("无法识别 OpenCode 版本。请先确认 opencode --version 能运行，或指定 --opencode-major 1 / 2。")
const v2 = version === "2"
const field = v2 ? "plugins" : "plugin"
const root = fileURLToPath(new URL("../", import.meta.url))
const dir = resolve(values["config-dir"] || process.env.OPENCODE_CONFIG_DIR || join(process.env.XDG_CONFIG_HOME || join(homedir(), ".config"), "opencode"))
const installedRoot = join(dir, "extensions", "opencode-moyu")
const assets = ["tui.js", "server.js", "tui-v2.js", "server-v2.js", "install.mjs"]
async function exists(path) { try { await access(path); return true } catch (error) { if (error.code === "ENOENT") return false; throw error } }
if (!values.remove) for (const name of assets) await access(join(root, "dist", name))

async function plan(base, asset, defaultSettings, alignLibrary = false) {
  const json = join(dir, base + ".json"), jsonc = join(dir, base + ".jsonc")
  if (await exists(json) && await exists(jsonc)) throw new Error(`同时存在 ${json} 和 ${jsonc}，请先统一配置文件`)
  const file = await exists(jsonc) ? jsonc : json
  const present = await exists(file)
  const original = present ? await readFile(file, "utf8") : JSON.stringify({ $schema: "https://opencode.ai/" + (base === "tui" ? "tui" : "config") + ".json" }, null, 2) + "\n"
  const errors = [], config = parse(original, errors, { allowTrailingComma: true })
  if (errors.length || !config || typeof config !== "object" || Array.isArray(config)) throw new Error(`无法解析 ${file}；原文件未修改`)
  if (config[field] !== undefined && !Array.isArray(config[field])) throw new Error(`${field} 必须是数组：${file}`)
  const target = pathToFileURL(v2 ? installedRoot : join(installedRoot, "dist", asset)).href
  const own = [target, pathToFileURL(v2 ? root : join(root, "dist", asset)).href]
  if (v2) for (const base of [root, installedRoot]) for (const name of assets.filter((name) => name !== "install.mjs")) own.push(pathToFileURL(join(base, "dist", name)).href)
  const matches = (row) => own.includes(Array.isArray(row) ? row[0] : typeof row === "object" && row ? row.package : row)
  const plugins = config[field] ?? [], previous = plugins.find(matches)
  const previousOptions = Array.isArray(previous) ? previous[1] : previous?.options
  const settings = previousOptions && typeof previousOptions === "object" ? { ...previousOptions } : {}
  if (!settings.booksDir || settings.booksDir === join(root, "books")) settings.booksDir = defaultSettings.booksDir
  settings.keyFile ||= defaultSettings.keyFile
  if (alignLibrary) { settings.booksDir = defaultSettings.booksDir; settings.keyFile = defaultSettings.keyFile }
  const next = []
  const entry = v2 ? { package: target, options: settings } : [target, settings]
  let inserted = false
  for (const row of plugins) {
    if (matches(row)) {
      if (!values.remove && !inserted) { next.push(entry); inserted = true }
    } else next.push(row)
  }
  if (!values.remove && !inserted) next.push(entry)
  const changed = JSON.stringify(next) !== JSON.stringify(plugins)
  const output = changed ? applyEdits(original, modify(original, [field], next, { formattingOptions: { insertSpaces: true, tabSize: 2 } })) : original
  return { file, present, original, output, changed, settings }
}

const defaults = { booksDir: join(installedRoot, "books"), keyFile: join(installedRoot, "keys/library.key") }
const shared = v2 ? await plan("opencode", "server-v2.js", defaults) : undefined
const hasCLI = v2 && (await exists(join(dir, "cli.json")) || await exists(join(dir, "cli.jsonc")))
const tui = v2 ? (hasCLI ? await plan("cli", "tui-v2.js", shared.settings) : shared) : await plan("tui", "tui.js", defaults)
const server = tui === shared ? shared : await plan("opencode", v2 ? "server-v2.js" : "server.js", tui.settings, true)
const plans = tui === server ? [server] : [tui, server]
if (values["dry-run"]) {
  console.log(`将${values.remove ? "移除" : "注册"}阅读侧栏与模型工具：\n${plans.map((item) => item.file).join("\n")}\n插件目录：${installedRoot}\n书架：${tui.settings.booksDir}`)
  process.exit(0)
}
await mkdir(dir, { recursive: true, mode: 0o700 })
if (!values.remove) {
  await mkdir(join(installedRoot, "dist"), { recursive: true, mode: 0o700 })
  await mkdir(tui.settings.booksDir, { recursive: true, mode: 0o700 })
  for (const name of assets) {
    const source = join(root, "dist", name), destination = join(installedRoot, "dist", name)
    if (source === destination) continue
    const temporary = destination + "." + randomUUID() + ".tmp"
    await copyFile(source, temporary, constants.COPYFILE_EXCL)
    await rename(temporary, destination)
  }
  await writeFile(join(installedRoot, "package.json"), JSON.stringify({ name: "opencode-moyu", version: "0.2.0", type: "module", exports: { ".": "./dist/server-v2.js", "./tui": "./dist/tui-v2.js" } }, null, 2) + "\n", { mode: 0o600 })
  // Local directories resolve conventional entry names; npm packages use exports.
  await writeFile(join(installedRoot, "index.js"), 'export { default } from "./dist/server-v2.js"\n', { mode: 0o600 })
  await writeFile(join(installedRoot, "tui.js"), 'export { default } from "./dist/tui-v2.js"\n', { mode: 0o600 })
  const sample = join(tui.settings.booksDir, "夜班便利店.txt")
  if (!await exists(sample)) await copyFile(join(root, "books/夜班便利店.txt"), sample, constants.COPYFILE_EXCL)
}
// Parse both configs before writing either one. Roll back earlier writes on error.
const written = []
try {
  for (const item of plans.filter((item) => item.changed)) {
    if (item.present) {
      const backup = item.file + ".moyu-backup-" + new Date().toISOString().replaceAll(":", "-") + "-" + randomUUID().slice(0, 8)
      await copyFile(item.file, backup, constants.COPYFILE_EXCL)
      console.log(`配置备份：${backup}`)
    }
    const temporary = item.file + ".moyu-" + randomUUID() + ".tmp"
    await writeFile(temporary, item.output, { mode: item.present ? (await stat(item.file)).mode & 0o777 : 0o600, flag: "wx" })
    await rename(temporary, item.file)
    written.push(item)
  }
} catch (error) {
  for (const item of written.reverse()) {
    if (item.present) await writeFile(item.file, item.original)
    else await unlink(item.file)
  }
  throw error
}
console.log(`已${values.remove ? "移除" : "安装 / 更新"} OpenCode ${version}.x 阅读侧栏与模型工具；重启 OpenCode 后生效。`)
if (!values.remove) console.log(`书架：${tui.settings.booksDir}\n密钥：${defaults.keyFile}\n安装后可删除解压目录。\n卸载：node ${join(installedRoot, "dist/install.mjs")} --remove`)
