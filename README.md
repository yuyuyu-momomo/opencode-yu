# OpenCode 摸鱼阅读

在 OpenCode 的**原生右侧栏**看小说和视频，适配 OpenCode 2.1.3，兼容 2.1.2 / 1.19.x。点击顶部「小说 / 视频」切换，终端需要显示会话侧栏；首页没有侧栏。

## 快速安装

[下载安装包 ZIP](https://github.com/yuyuyu-momomo/opencode-yu/raw/refs/heads/main/releases/opencode-moyu-v0.4.1.zip)，解压后运行 `bash install.sh`；Windows 原生 OpenCode 可双击 `install.cmd`。

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
| `Ctrl+X` 后按 `J` | 打开宽高设置（也可直接点击面板按钮） |
| `Alt+D` | 删除当前资料及采集缓存，操作前确认 |

直接点击面板中的「书架」「目录」「宽度」「高度」、进度或翻页按钮即可操作；弹窗选项也可鼠标点击，无需快捷键。按钮在松开鼠标后打开菜单，避免同一次点击把新菜单关掉。「隐藏」会折叠正文，点击「显示阅读」即可恢复。`Ctrl+P` 搜索 `moyu` 或「摸鱼阅读」可以找到全部命令；`/read` 和 `/moyu` 打开书架，`/chapters` 打开目录，`/readsize` 打开宽高设置。

2.x 中小说保持在侧栏上方，OpenCode 自带的 Context、任务等信息放到底部并预留高度；缩小阅读区时，两部分之间留白，统计信息不会紧跟正文上移。

点击「目录」时自动滚动到当前章节并选中，直接回车保持当前章节，也可搜索或点击其他章节。

按 `Alt+O` 选择「打开本地文件」，输入路径，例如 `/mnt/d/books/三体.txt`。导入会生成加密副本，外部原文件保留。支持 UTF-8、带 BOM 的 UTF-16、GBK / GB18030、Markdown；单本最多 32 MiB。目前不支持 EPUB、PDF。

进度按文件路径分别保存在 OpenCode 自身的插件存储中，翻页及退出时自动保存。宽度或高度变化会按实际正文区域重新分页，保留阅读位置。翻页阅读不调用模型，也不把正文写入对话。

v0.4.1 优化切换开销：同宽度调高度复用已排好的文字行；视频或隐藏状态不重排小说。连续尺寸 / 画质变更合并处理，输出像素尺寸相同时复用当前解码；切走时取消未完成的解密，仍立即清理临时明文。视频帧分块拼接只复制一次，像素模式复用文本节点。

## 侧栏视频

点击顶部「视频」→「视频库」→「打开本地视频」，输入 MP4、MKV、WebM、MOV、AVI、M4V、MPEG 或 GIF 路径；也可输入 `/video` 打开视频库。在线视频支持 B 站及 YouTube 的单个公开视频；直播和整套播放列表尚未接入。

- 默认「自动清晰」：OpenCode 2.1.2 的图片组件在支持 Sixel / Kitty 图片协议的终端内直接显示原画，保持比例并随侧栏宽高调整。画面、播放控件和选片始终在 OpenCode 内，无需外部画面窗口。
- 点击底部「画质」切换「自动清晰 / 像素风」，选择自动保存。未启用图片协议时自动使用「细腻字符」；旧版宿主没有图片组件时使用「像素风」。界面显示实际模式，字符画面受终端字符格限制，不能达到原画清晰度。原画表示直接显示视频帧，实际细节仍受源视频和面板大小限制。
- 默认 10 帧 / 秒；像素风保留原来的半格字符画面。多路复用器或终端未上报图片能力时可能回退字符模式；图片能力由宿主检测，插件不强制开启不支持的协议。
- 打开及重启后均暂停、静音，点击「播放」开始；点击「开启声音」才播放音轨，「静音」立即停止声音。无音轨或音频后端不可用时明确提示。
- 支持前后 10 秒、点击时间输入秒数或 `分:秒` 跳转，以及共享的宽高调整。切回小说、隐藏或离开面板时暂停画面和声音，小说与视频分别保存进度。
- 视频库保存加密的文件路径、标题及媒体信息，播放进度保存到插件存储。**本地导入的视频直接读取原文件，不复制、不加密原文件**；平台下载的视频则加密保存。顶部「删除」移除记录、进度及平台下载缓存，保留本地导入的原文件。

视频需要 [FFmpeg](https://ffmpeg.org/download.html) 的 `ffmpeg`、`ffprobe`，开声还需要 `ffplay` 和可用的系统音频设备。插件会查找 PATH、用户私有目录 `~/.local/share/opencode-moyu/media/bin` 及现有 Conda 环境；小说功能不依赖这些程序。也可用 `MOYU_MEDIA_BIN` 指定目录，或分别设置 `MOYU_FFMPEG`、`MOYU_FFPROBE`、`MOYU_FFPLAY`。安装包仅包含插件，不附带 FFmpeg 二进制；可使用发行版提供的 FFmpeg 包，Windows 可将官方页面链接的构建解压后把 bin 加入 PATH。WSL 可复用 Linux 解码器和 Windows `ffplay.exe`，插件会转换文件路径。

## B 站 / YouTube 来源

视频顶部直接点击「搜索」输入关键词，或点击「热门」浏览 B 站热门，每页最多 10 个，可点击「换一批 / 上一批」。点击结果即可下载到加密视频库，不必自行找链接；B 站热门无需 API Key，搜索和热门请求可点击取消。

也可在「视频库」选择「B 站 / YouTube 视频链接」，粘贴完整视频链接或 BV 号。单次下载一个视频，优先选择短边不超过 480 的最佳清晰度，兼容竖屏；若没有低清格式则选最小可用清晰度。同等清晰度优先 H.264，兼容无音轨视频。最长 60 分钟、成品不超过 256 MiB；下载行可点击取消。相同规范化 URL 已入库时复用缓存。

B 站公开搜索及视频信息无需 API Key，接口有访问限制时显示实际错误。YouTube 搜索和视频信息使用 [YouTube Data API v3](https://developers.google.com/youtube/v3/docs/search/list)，填写方式：

1. 在 [Google Cloud](https://console.cloud.google.com/apis/library/youtube.googleapis.com) 启用 YouTube Data API v3，并在凭据中创建 API Key。
2. 打开「视频库」→「视频来源设置」→「填写 YouTube API Key」，粘贴并保存。
3. 返回「搜索在线视频」选择 YouTube。已有密钥可更新或移除；也支持 `YOUTUBE_API_KEY` 环境变量，本地保存的密钥优先。

密钥保存在 `.moyu/settings/youtube.enc`，沿用资料库 AES-256-GCM 加密；不写项目配置、聊天记录或模型工具参数。输入时只在设置对话框中填写，保存后界面只显示「已配置」，不会回显。Google 请求使用密钥请求头，不把密钥放入 URL；密钥状态表示已保存，不代表已通过远端验证。

视频媒体由 [yt-dlp](https://github.com/yt-dlp/yt-dlp#installation) 通过 HTTP 获取。API Key 只用于数据查询，不能提供下载权限或解除登录、人机验证、地区等限制；遇到这些限制停止并报出原因。下载不启动浏览器、不读取浏览器 Cookie、不使用用户登录；YouTube 解析可使用 Node.js 运行时。需要官方 yt-dlp（优先放在 `~/.local/share/opencode-moyu/media/bin`，也可在 PATH 或由 `MOYU_YTDLP` 指定），安装包不附带下载器。

下载先写私有临时目录，成功后流式加密为 `.moyu/media/<资源ID>.moyuvid` 并清理下载临时文件。播放时在权限受限的临时目录解密，切回小说、隐藏、删除或正常退出后清理；异常退出遗留的临时文件在下次插件启动时按进程状态清理。原始视频和帧不会进入模型上下文或项目仓库。

当前模型可调用 `moyu_video_search`、`moyu_video_info` 和 `moyu_video_import`。例如在普通对话中说「把这个 B 站链接下载到 Moyu 视频库」，完成后用 `/video` 选择播放；视频任务使用独立工具，`/moyu 书名` 仍用于小说采集。下载时保存来源、标题、实际时长及画面信息，数据接口可用时一并保存作者、简介和播放量。

## 调整阅读区域大小

点击阅读区顶部的「宽度」或「高度」，再点击所需比例，设置即时生效并自动保存，重启后恢复。

- 宽度（OpenCode 2.x）：25%、33%、40%、50%、60%，按当前会话可用宽度计算；同时调整侧栏与正文排版，至少给主会话保留 44 列。「默认宽度」恢复宿主原有宽度，隐藏阅读时也会恢复。
- 高度：25%、50%、75%、100%，另有自定义 10–100% 和「自动高度」。页码、翻页和操作提示随正文区域一起移动，末页也保留相同高度。

高度比例按侧栏预留标题和操作栏后的可用正文高度计算，正文最少保留 4 行。宽度至少保留 36 列，过小的终端会限制可用尺寸。1.19.x 保留原生侧栏宽度，支持点击调高、目录和翻页。快捷键 `Ctrl+X` 后按 `J` 与 `/readsize` 仍可打开设置。

## 让当前模型采集小说

OpenCode 2.x 中，在输入框提交：

```text
/moyu 忘语的凡人修仙传，先采集20章
```

或输入 `/moyu` 打开书架，选择「让当前模型采集小说…」，填写书名、作者或目录链接。输入命令后若先出现补全结果，按 Enter 补全，再按 Enter 提交。

聊天区只显示一句 `采集小说：你输入的书名或要求`。HTTP 采集方式、工具调用及失败处理规则放在后台模型上下文中，不再作为长段用户消息显示。

插件会沿用当前选中的模型，每次采集创建一个独立的普通会话，不携带编程对话历史，避免先触发旧会话压缩。原会话保留，可从会话列表返回。模型查找来源、核对目录，再分批存进加密书架，不需要另配 API 密钥。采集进度和错误在 OpenCode 对话中显示；完成后输入 `/moyu` 选择小说阅读。目录默认只返回 10 章，正文在插件内部提取并分批加密入库，交给右侧阅读器显示。默认先采集 20 章，也可在要求中指定数量。请在可联网并允许工具执行的 agent 中使用；访问授权沿用 OpenCode 的现有设置。

采集任务限定为纯 HTTP/HTTPS：目录和正文由插件直接下载、解析并加密入库。`/moyu` 在后台注入的模型规则明确禁止浏览器、无头浏览器、Playwright、Selenium、CDP、浏览器 MCP，以及依赖浏览器的搜索技能。只有书名时使用内置 `moyu_search` 调用已有的 HTTP 搜索接口；搜索接口不可用时报告缺少目录链接，不安装浏览器或搜索环境。目录为空、需要 JavaScript、登录或验证码时停止该来源，不回退浏览器、不加载整页 HTML 到模型上下文。

1.19.x 仍支持采集工具，在普通对话中向模型提出同样要求即可。

2.x 内置 `moyu_search`，复用 OpenCode 的 HTTP 搜索接口，最多返回 5 条标题、链接和短摘要，省去网页全文。默认使用 Exa，可通过插件选项 `searchProvider` 指定 `exa`、`tavily`、`parallel` 或 `firecrawl`。

模型可调用 `moyu_search` 查找来源、`moyu_sources` 查看来源能力、`moyu_catalog` 查看目录、`moyu_import` 分批采集、`moyu_library` 查看资源、`moyu_delete` 删除用户指定的资源。相同 URL 重复采集会续接未完成章节，成功章节不重复下载；抓到的书按 `Alt+O` 即可打开。

默认适配器支持可直接访问的 HTML 目录和正文页，可指定 `catalogSelector` / `contentSelector` 适配网站。不会执行页面脚本；登录、验证码、动态渲染页面和分页目录需要专用来源适配器。访问来源沿用 OpenCode 的 `webfetch` 权限。工具返回进度和路径摘要，正文留在本地资料库。

## 加密与删除

导入和采集的正文、章节缓存、任务记录、资源索引均以 AES-256-GCM 加密后落盘，文件名使用资源 ID。密钥独立保存在安装目录的 `keys/library.key`（Linux 权限 `0600`），默认书架在 `books/`。阅读时在内存中解密。附带的原创示例源文件为普通 TXT。

阅读区顶部的「书架 / 目录 / 删除」操作行提供删除入口。先打开要删除的小说，再点击「删除」，核对书名后确认；取消会保留资料。删除会清理当前资料的加密正文、索引和续采缓存，外部原文件保留。快捷键 `Alt+D` 也可打开确认。删除属于文件系统中的逻辑删除。密钥由本机账号管理；这不是需要密码解锁的保险箱，也不防拥有本机账号权限的程序。迁移资料库时需要单独备份密钥，丢失密钥无法解密已有内容。卸载插件默认保留资料及密钥。

## 安装与卸载

解压安装包后，运行安装脚本即可。需要 Node.js 22+ 和 OpenCode 2.1.2–2.1.3 / 1.19.x，**不需要 `npm install`、编译或手改配置**。

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

架构与来源接入说明见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。当前内置小说来源、阅读器、B 站 / YouTube 视频来源及像素播放器；资源契约另预留音频、图片及数据集类型。

```bash
npm ci --ignore-scripts
npm run build
npm run typecheck
npm test
```

构建将阅读逻辑和文本排版依赖打包，Solid / OpenTUI 及 2.x 插件 API 由 OpenCode 宿主提供。2.x 使用 [CLI 插件 API](https://opencode.ai/v2/docs/build/plugins/cli/) 的 `sidebar.content` 插槽；1.19.x 使用 `sidebar_content` 插槽。两代入口共享阅读、资料库及来源服务；内置示例为原创短篇。
