# 验证记录

日期：2026-10-22。环境：WSL / Linux、Node.js 22.23.1、OpenCode 2.1.2 与 1.19.3。

- 构建及 TypeScript 检查通过。
- 18 个测试通过，覆盖 HTTP 重定向、GBK、响应大小与超时、目录过滤、分批续采、加密认证、删除缓存、两代安装配置保留、免依赖安装，以及 2.x 模型工具参数校验、执行和权限拒绝。
- 真实 OpenCode 2.1.2 在隔离配置、临时数据库和独立 tmux 会话中通过服务端插件加载、右侧阅读、翻页、书架、隐藏同时关闭对话框、重新显示、章节目录、取消、普通输入和重启续读，共 10 项检查。
- 真实 OpenCode 1.19.3 回归通过模型工具注册、右侧阅读、中文文件加密导入、翻页、章节目录、隐藏、重启续读、窗口缩放、删除确认、模型删除同步清空侧栏及普通输入，共 25 项检查。
- 全局安装后，使用实际用户配置在 dfs 目录打开书架成功，原有模型仍可见；安装前后的模型等非插件配置相同，已安装文件与构建产物哈希一致。
- HTTP 请求通过当前 WSL 代理访问 Project Gutenberg 公版书页，解析出 Alice’s Adventures in Wonderland，正文 143955 个字符。此结果验证请求与解析链路，不代表所有小说网站均可解析。
- 测试未向真实外部模型发送生成请求；验证范围为工具注册、执行及界面联动。

可复现命令：

```bash
npm ci --ignore-scripts
npm run build
npm run typecheck
npm test
python3 scripts/smoke-v2.py   # OpenCode 2.1.2
# MOYU_OPENCODE_BINARY=/path/to/opencode-1.19.3 python3 scripts/smoke.py
python3 scripts/package.py
```

真实终端测试需要 tmux。可通过 `MOYU_OPENCODE_BINARY=/path/to/opencode` 指定待测二进制。安装包不需要上述构建依赖。
