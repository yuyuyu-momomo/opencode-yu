# 框架与接入约定

当前版本实现本地小说、HTML 小说目录 / 正文采集、加密资料库及右侧阅读器。视频、音频、图片、数据集是已定义的资源类型，尚未实现这些类型的下载和播放。

```mermaid
flowchart LR
  Input[/moyu 书名或目录链接] --> Host[ui/collect 独立轻量会话]
  Host --> Model[当前 OpenCode 模型]
  Model --> Tools[server 模型工具]
  Tools --> Service[services 采集编排]
  Service --> Registry[core 来源注册表]
  Registry --> HTML[sources HTML 小说]
  Registry -.扩展.-> Other[视频 / API / RSS 来源]
  HTML --> HTTP[core HTTP 请求]
  Service --> Store[library 资料库]
  Store --> Vault[AES-256-GCM 加密]
  Vault --> Disk[正文 / 任务 / 缓存 / 索引]
  Store --> UI[ui 侧栏阅读]
```

## 目录职责

| 目录 | 职责 |
| --- | --- |
| `src/domain/contracts.ts` | 内容类型、来源能力、目录项、统一资源和附件契约 |
| `src/core/registry.mjs` | 注册来源、按 URL 或 ID 选择适配器 |
| `src/core/http.mjs` | 超时、大小限制、压缩和编码处理、代理、重定向检查、DNS 地址校验 |
| `src/sources/` | 网站 / API 的解析与来源适配；不引用 OpenCode 或 UI |
| `src/services/ingestion.mjs` | 目录读取、分批采集、限速、任务状态、续采与去重 |
| `src/library/store.mjs` | 资源索引、章节分片、锁、原子写入、入库与删除 |
| `src/library/vault.mjs` | 随机密钥、随机 nonce、AES-GCM 认证加密 |
| `src/library/text-reader.mjs` | TXT 解码、中文分页、章节识别、加密书籍读取 |
| `src/server/index.ts` | 将服务层封装为当前模型可调用的 OpenCode 工具 |
| `src/server/v2.ts` | 2.x 工具注册、参数 schema、进度、权限及模型上下文 hook 适配 |
| `src/server/collection-context.mjs` | 注入后台采集规则、精简旧搜索结果、压缩请求移除工具定义 |
| `src/server/search-summary.mjs` | HTTP 搜索结果限量与正文剥离，避免搜索全文进入模型上下文 |
| `src/ui/index.tsx` | 原生侧栏、书架、阅读进度、删除确认和快捷键 |
| `src/ui/collect.mjs` | 解析 /moyu 参数，复用宿主当前模型，将采集任务提交到会话队列 |
| `src/ui/sidebar-layout.mjs` | 2.x 侧栏宽度适配、会话最小宽度及隐藏 / 卸载时恢复宿主布局 |
| `src/ui/v2.ts` | 2.x 插槽、存储、键盘、主题和对话框 API 适配 |
| `scripts/` | 构建、独立安装器、打包、真实终端验证 |

依赖方向为入口 → 服务 → 来源 / 存储 → 基础设施。来源适配器不写文件；存储不解析网页；模型工具和 UI 不包含网站选择器逻辑。

## 新增来源

1. 在 `src/sources/` 新建模块，实现 `SourceAdapter`。声明 `id`、`kinds` 和 `capabilities`。
2. `catalog(url, context)` 返回统一目录；`fetch(item, context)` 返回获取结果。请求使用注入的 `context.page`，继承超时、大小限制和取消能力。
3. 在 `src/sources/index.mjs` 注册，专用网站适配器放在通用 HTML 适配器之前。
4. 用固定 HTML / API 响应测试解析，并通过注入 transport 测试失败与续采。不要在模型工具中按域名增加分支。

```js
registry.register({
  id: "my-site", name: "自定义来源",
  kinds: ["novel"], capabilities: ["catalog", "fetch"],
  matches: url => new URL(url).hostname === "example.com",
  async catalog(url, ctx) { /* 返回 SourceCatalog */ },
  async fetch(item, ctx) { /* 返回 text、title、mime */ },
})
```

通用来源只覆盖可直接请求的 HTML，目录最多识别 5000 个同站章节链接；默认每批 5 章，最大每批 50 章，章节间隔 800 ms。单页最大 2 MiB、请求总时限 15 秒、最多跟随 4 次重定向；正文总量上限 32 MiB。支持环境变量 `HTTP_PROXY`、`HTTPS_PROXY` 和主机名形式的 `NO_PROXY`。直接连接会固定已校验的 DNS 地址；代理连接由受信任的代理完成目标连接。目录翻页、章节内翻页、认证、浏览器渲染、搜索和站点特殊规则应由专用适配器扩展。

## 接入视频等类型

统一 `ContentResource` 使用 `kind` 与 `assets`，附件通过 `role` 区分正文、媒体、字幕、封面和数据，`mime` 指定格式，`path` / `url` 指定位置。`metadata` 保存来源特有信息。存储层允许这些类型的资源索引；当前文字采集服务会明确拒绝非小说目录，避免把媒体误作 TXT。

接入新类型时依次增加：来源适配器 → 对应采集服务 / 媒体存储策略 → 对应展示器。视频需要独立的流式下载、缓存配额、清晰度 / 分段策略和播放器；不要通过解除文字页面大小限制来下载视频。今后若提供在线播放，媒体 URL、字幕和封面仍通过统一附件契约传递。

## 任务、加密与删除

资源 ID 由来源适配器 ID 和规范化 URL 确定，任务记录持久化目录及成功章节下标。每章成功后先写加密分片，再记录完成位置。后续调用自动从未完成章节续接。任务失败保存错误并停止，不进行无限重试。进程间文件锁避免同一本书同时采集；已退出进程留下的锁可在重试时回收。

资料目录 `books/` 内的 `.moyubook`、`.moyu/jobs/*.enc`、`.moyu/parts/**/*.enc` 和 `.moyu/resources/*.enc` 均加密。`keys/library.key` 放在书架之外，权限 `0600`，不进入源码仓库或安装包。附带的原创示例 TXT 不属于敏感资料。

本地 TXT 导入为加密副本，外部源文件保留。删除资源会同时删除加密正文、索引、任务记录和章节分片，使用同一任务锁避免边采集边删除。删除是逻辑删除；默认密钥文件由本机账号持有，不提供密码解锁或操作系统管理员隔离。OpenCode KV 仅存储阅读位置、显示状态及哈希文件路径。

## 验证边界

`npm run build` 生成两代侧栏、两代服务端入口和独立安装器共五个文件；`npm run typecheck` 检查入口与契约；`npm test` 验证编码、分页、配置保留、免依赖安装、加密认证、目录过滤、分批续采、删除和来源扩展。

`python3 scripts/smoke.py` 使用临时 XDG 配置和数据库、独立 tmux 会话启动真实 OpenCode，检查工具 ID、侧栏、导入、加密、翻页、目录、隐藏、重启续读、窗口缩放和删除确认；不会发送模型请求。模型工具已注册与真实外部模型完成一轮自主采集，是两个不同的验证范围。

阅读区宽高偏好使用插件存储；正文按实际渲染宽度及侧栏滚动视口的可用高度重新分页，比例设置保留阅读偏移。2.x 宿主当前把侧栏及外层容器固定为 42 列，宽度适配器只调整已识别的侧栏容器，并为主会话保留至少 44 列；隐藏或卸载时恢复原尺寸。此适配依赖已验证的 2.1.2 容器结构，宿主升级后需要终端回归。1.x 不修改宿主宽度。

可点击操作统一在 `onMouseUp` 消费完整点击后打开弹窗；按钮关闭文本选择，并忽略拖动结束，防止一次点击的释放事件关闭新弹窗。正文仍支持文本选择。书架、章节、宽高、翻页、隐藏与恢复都有可见鼠标入口。

2.x 的 `sidebarDock` 给原侧栏内容容器设置视口最小高度，阅读区下方使用自动边距，使宿主 Context / 任务卡片保持底部位置。按原生卡片实际高度为正文预留空间，保留宿主原有渲染、更新和操作；隐藏阅读或卸载时恢复容器尺寸与原有布局回调。删除按钮位于顶部操作行，异步删除完成时只清空仍在阅读的同一资源，避免影响用户随后打开的另一本书。

OpenCode 2.x 的 `/moyu` 无参数时打开书架，有参数时通过宿主 `session.create` / `session.prompt` 在当前项目创建独立普通会话，沿用当前选中的模型；以 metadata.sourceSessionID 记录来源会话，不使用会隐藏输入框的原生子代理视图。不保存模型凭据，不在 UI 中执行爬虫。书架中的采集表单使用相同接口；1.19.x 通过普通对话调用已注册工具。

`/moyu` 采集提示将传输方式限定为 HTTP/HTTPS，禁止模型调用浏览器、无头浏览器、Playwright / Selenium、CDP、浏览器 MCP 或相关技能；搜索接口不可用或目录为空时停止该来源。此限制通过 2.x 的 `session.context` hook 添加到模型 system，目录与正文工具本身使用 Node HTTP 客户端。用户消息仅保留一句采集要求及 `origin: moyu` 元数据；hook 从最新 user 消息的元数据识别任务，普通对话不注入采集规则。

2.x 的 `moyu_search` 默认复用宿主 Exa HTTP 接口，最多返回 5 个来源及各 100 字符短摘要，总条目内容不超过 3600 字符；不返回原始网页正文。采集请求会移除原生 websearch/webfetch，目录默认返回 10 项。压缩 hook 仅作用于 Moyu 任务：把历史原生搜索结果缩成链接元数据，并去掉压缩请求的工具定义，让模型返回文字检查点。原始聊天记录与普通编码会话不改写。
