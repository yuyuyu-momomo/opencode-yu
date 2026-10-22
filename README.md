# OpenCode 摸鱼阅读

在 OpenCode 的**原生右侧栏**看本地小说，适配 OpenCode 2.1.2，兼容 1.19.x。终端需要显示会话侧栏；首页没有侧栏。

## 快速安装

[下载安装包 ZIP](https://github.com/yuyuyu-momomo/opencode-yu/raw/refs/heads/main/releases/opencode-moyu-v0.1.2.zip)，解压后运行 `bash install.sh`；Windows 原生 OpenCode 可双击 `install.cmd`。

也可直接安装仓库中的预编译版本：

```bash
git clone https://github.com/yuyuyu-momomo/opencode-yu.git
cd opencode-yu
bash install.sh
```

需要 Node.js 22+。无需 `npm install` 或编译，安装后重启 OpenCode。

## 使用

安装后重启 `opencode`，进入任意会话，右侧会出现「随手读」和原创示例小说。若侧栏关闭，按 `Ctrl+X` 后再按 `B` 显示侧栏，或在 `Ctrl+P` 中搜索 sidebar。建议终端至少 140 列、30 行（默认侧栏在大于 120 列时自动显示）。

| 按键 | 功能 |
| --- | --- |
| `Alt+M` | 立即隐藏 / 显示阅读面板 |
| `Alt+→` / `Alt+←` | 下一页 / 上一页 |
| `Alt+O` | 书架、打开本地文件 |
| `Alt+C` | 搜索、跳转章节 |
| `Alt+G` | 按百分比跳转 |
| `Ctrl+X` 后按 `J` | 调整小说在右侧栏内的高度比例 |
| `Alt+D` | 删除当前资料及采集缓存，操作前确认 |

也可点击面板中的「大小」、书名、章节、进度、翻页按钮。`Ctrl+P` 搜索 `moyu` 或「摸鱼阅读」可以找到全部命令；`/read` 打开书架，`/moyu` 打开书架，`/chapters` 打开目录，`/readsize` 调整大小。普通输入不受翻页快捷键影响，翻页快捷键在对话框内和阅读面板隐藏时停用。

按 `Alt+O` 选择「打开本地文件」，输入路径，例如 `/mnt/d/books/三体.txt`。导入会生成加密副本，外部原文件保留。支持 UTF-8、带 BOM 的 UTF-16、GBK / GB18030、Markdown；单本最多 32 MiB。目前不支持 EPUB、PDF 或视频播放。

进度按文件路径分别保存在 OpenCode 自身的插件存储中，翻页及退出时自动保存。窗口高度变化会重新分页。翻页阅读不调用模型，也不把正文写入对话。

## 调整阅读区域大小

按 `Ctrl+X` 后按 `J` 或点击面板右上角「大小」，选择 25%、50%、75%、100%，或输入自定义的 10–100%。设置即时生效并自动保存，重启后恢复；选择「自动高度」可恢复默认大小。

默认使用 OpenCode 的 leader 序列：按下 `Ctrl+X`，松开后按 `J`；更改过 leader 时使用自己的 leader 后按 `J`。页码、翻页和快捷键提示随正文高度一起移动，末页也保留正文区域高度。

比例按右侧栏预留标题和操作栏后的可用正文高度计算，正文最少保留 4 行。窗口或侧栏可用高度变化时自动调整并重新分页，保留阅读位置。

## 让当前模型采集小说

OpenCode 2.x 中，在输入框提交：

```text
/moyu 忘语的凡人修仙传，先采集20章
```

或输入 `/moyu` 打开书架，选择「让当前模型采集小说…」，填写书名、作者或目录链接。输入命令后若先出现补全结果，按 Enter 补全，再按 Enter 提交。

插件会把采集任务交给当前选中的模型，在当前会话排队执行；从首页发起会创建会话。模型查找来源、核对目录，再分批存进加密书架，不需要另配 API 密钥。采集进度和错误在 OpenCode 对话中显示；完成后输入 `/moyu` 选择小说阅读。默认先采集 20 章，也可在要求中指定数量。请在可联网并允许工具执行的 agent 中使用；访问授权沿用 OpenCode 的现有设置。

1.19.x 仍支持采集工具，在普通对话中向模型提出同样要求即可。

模型可调用 `moyu_sources` 查看来源能力、`moyu_catalog` 查看目录、`moyu_import` 分批采集、`moyu_library` 查看资源、`moyu_delete` 删除用户指定的资源。相同 URL 重复采集会续接未完成章节，成功章节不重复下载；抓到的书按 `Alt+O` 即可打开。

默认适配器支持可直接访问的 HTML 目录和正文页，可指定 `catalogSelector` / `contentSelector` 适配网站。不会执行页面脚本；登录、验证码、动态渲染页面和分页目录需要专用来源适配器。访问来源沿用 OpenCode 的 `webfetch` 权限。工具返回进度和路径摘要，正文留在本地资料库。

## 加密与删除

导入和采集的正文、章节缓存、任务记录、资源索引均以 AES-256-GCM 加密后落盘，文件名使用资源 ID。密钥独立保存在安装目录的 `keys/library.key`（Linux 权限 `0600`），默认书架在 `books/`。阅读时在内存中解密。附带的原创示例源文件为普通 TXT。

`Alt+D` 或点击「删除」可清理当前资料的加密正文、索引和续采缓存。外部原文件保留。删除属于文件系统中的逻辑删除。密钥由本机账号管理；这不是需要密码解锁的保险箱，也不防拥有本机账号权限的程序。迁移资料库时需要单独备份密钥，丢失密钥无法解密已有内容。卸载插件默认保留资料及密钥。

## 安装与卸载

解压安装包后，运行安装脚本即可。需要 Node.js 22+ 和 OpenCode 2.1.2 / 1.19.x，**不需要 `npm install`、编译或手改配置**。

```bash
bash install.sh
# 重启 opencode
```

Windows 原生 OpenCode 可双击 `install.cmd`；WSL 中使用 OpenCode 时，请在 WSL 运行 `bash install.sh`。安装器把插件及示例复制到配置目录内的 `extensions/opencode-moyu/`，自动识别版本：2.x 向 `opencode.json` 的 `plugins` 注册包目录，自动加载服务端和 `./tui` 双入口；若已有 `cli.json` / `cli.jsonc`，同步注册并迁移旧的文件入口；1.19.x 向 `tui.json` 和 `opencode.json` 的 `plugin` 注册对应入口（均支持已有 JSONC 文件）。完成后可以删除解压目录。

支持 `XDG_CONFIG_HOME` 和 `OPENCODE_CONFIG_DIR`。已有配置先备份，JSONC 注释、其他插件和模型 provider 设置保留；重复运行可更新插件。

```bash
bash install.sh --remove
# 重启 opencode；小说和阅读进度不会删除
```

如果已删除解压目录，可使用安装结束时显示的卸载命令。默认路径如下：

```bash
node ~/.config/opencode/extensions/opencode-moyu/dist/install.mjs --remove
```

只装到某个项目，或先查看将写入的配置：

```bash
bash install.sh --config-dir /path/to/project/.opencode
bash install.sh --dry-run
```

可在配置的插件选项中指定书架、启动文件和每页最大行数：

```json
{
  "plugins": [
    {
      "package": "file:///home/your-user/.config/opencode/extensions/opencode-moyu",
      "options": {
        "booksDir": "/mnt/d/books",
        "rows": 18
      }
    }
  ]
}
```

上例适用于 2.x 的 `opencode.json`；1.19.x 使用 `tui.json` 中的 `plugin: [["file:///.../dist/tui.js", { ... }]]`。若无法自动识别版本，可运行 `bash install.sh --opencode-major 2`（或 `1`）。升级 OpenCode 大版本后重新运行安装脚本。

可选 `file` 指定启动小说路径。快捷键可在 `cli.json`（1.19.x 为 `tui.json`）的 `keybinds` 中按命令名覆盖，如 `"moyu.toggle": "alt+m"`。少数终端会拦截 Alt+方向键，可使用点击或命令面板翻页。

## 开发与验证

架构与来源接入说明见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。当前内置小说来源和阅读器；资源契约已预留视频、音频、图片及数据集类型。

```bash
npm ci --ignore-scripts
npm run build
npm run typecheck
npm test
```

构建将阅读逻辑和文本排版依赖打包，Solid / OpenTUI 及 2.x 插件 API 由 OpenCode 宿主提供。2.x 使用 [CLI 插件 API](https://opencode.ai/v2/docs/build/plugins/cli/) 的 `sidebar.content` 插槽；1.19.x 使用 `sidebar_content` 插槽。两代入口共享阅读、资料库及来源服务；内置示例为原创短篇。
