# 框架与接入约定

当前版本实现本地小说、HTML 小说目录 / 正文采集、加密资料库及右侧阅读器。视频、音频、图片、数据集是已定义的资源类型，尚未实现这些类型的下载和播放。

```mermaid
flowchart LR
  Input[/moyu 书名或目录链接] --> Host[ui/collect 当前会话提交]
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
| `src/server/v2.ts` | 2.x 工具注册、参数 schema、进度与权限 API 适配 |
| `src/ui/index.tsx` | 原生侧栏、书架、阅读进度、删除确认和快捷键 |
| `src/ui/collect.mjs` | 解析 /moyu 参数，复用宿主当前模型，将采集任务提交到会话队列 |
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

阅读区高度偏好使用插件存储；通过 OpenTUI 侧栏滚动视口的实际高度计算可用正文行数，并监听视口尺寸变化进行重新分页。比例设置保留阅读偏移，不改变原生侧栏布局。

OpenCode 2.x 的 `/moyu` 无参数时打开书架，有参数时通过宿主 `session.switchModel` / `session.prompt` 提交给当前选择的模型；从首页则先创建当前项目的会话。不保存模型凭据，不在 UI 中执行爬虫。书架中的采集表单使用相同接口；1.19.x 通过普通对话调用已注册工具。
