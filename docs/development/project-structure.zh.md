# 项目结构

MetaBot 是 Node.js >= 22.19 的 TypeScript ESM monorepo（`"type": "module"`；
本地导入使用 `.js` 扩展名）。

## 目录布局

```text
metabot/
├── src/                              # IM Bridge 运行时
│   ├── index.ts                      # 入口和生命周期
│   ├── config.ts                     # 环境变量和 bots.json 加载器
│   ├── bridge/
│   │   ├── message-bridge.ts         # 命令、队列、任务、引擎执行
│   │   ├── command-handler.ts        # Chat 命令面
│   │   └── outputs-manager.ts        # 输出文件生命周期
│   ├── engines/
│   │   ├── index.ts                  # Codex 默认的引擎路由
│   │   ├── types.ts                  # 共享 Engine / Executor contract
│   │   ├── codex/                    # codex exec JSONL + resume 适配器
│   │   ├── kimi/                     # Kimi Code 0.27+ 本地 Server API 适配器
│   │   └── claude/                   # Claude Code 兼容适配器
│   ├── feishu/                       # Lark 事件、卡片、媒体、群路由
│   ├── telegram/                     # Telegram 长轮询适配器
│   ├── wechat/                       # 微信/ClawBot 适配器
│   ├── agent-teams/                  # 持久 Team、任务、成员和运行
│   ├── session/                      # 共享会话状态
│   ├── scheduler/                    # 持久调度
│   ├── api/                          # Bridge HTTP 路由、Peers、语音
│   ├── memory/                       # Core Memory 客户端和事件
│   ├── sync/                         # 飞书知识库同步
│   ├── skills/                       # Bridge 侧内置 Skills
│   ├── web/                          # Bridge WebSocket/静态服务
│   └── utils/                        # 日志和工具
├── packages/
│   ├── server/                       # 个人 Core HTTP 后端
│   ├── web-ui/                       # 个人 Core React 应用
│   ├── cli/                          # 作为 metabot 发布的功能 CLI
│   ├── cli-core/                     # 共享 CLI HTTP 客户端
│   ├── metamemory/                   # Memory 客户端 Package
│   ├── skill-hub/                    # Skill 注册表客户端 Package
│   └── skills/                       # Core 分发的 Skill bundles
├── web/                              # Bridge 浏览器 UI
├── bin/                              # metabot 和辅助启动器
├── scripts/                          # Release 和打包脚本
├── tests/                            # Bridge Vitest 测试
├── docs/                             # MkDocs 源文件和 Landing Page
├── install.sh / install.ps1          # 个人版安装器
├── bots.example.json                 # 多 Bot 示例
├── .env.example                      # 环境变量示例
└── package.json                      # npm workspaces 根
```

## 引擎适配器

| 路径 | 作用 |
|---|---|
| `src/engines/codex/executor.ts` | 运行 `codex exec --json` / `exec resume`，把 JSONL 转为共享事件。 |
| `src/engines/codex/session-lister.ts` | 发现可续接 Codex 会话，不宣称支持 app-server。 |
| `src/engines/kimi/daemon-client.ts` | 启动或连接 Kimi Code 官方 loopback Server API。 |
| `src/engines/kimi/executor.ts` | 映射 Session、快照、插话、问题、工具、子 Agent 和 Goal。 |
| `src/engines/kimi/session-lister.ts` | 通过 Server API 列出 Kimi Session。 |
| `src/engines/claude/` | 保持现有 Claude CLI / Agent SDK 行为兼容。 |

所有引擎都实现 `src/engines/types.ts` 中的共享边界；Bridge 不会用当前引擎
标识 Bot 身份。

## 核心依赖与运行时

| Package 或运行时 | 用途 |
|---|---|
| Node.js >= 22.19 | 支持的运行时基线 |
| Codex CLI | 默认外部引擎可执行文件；使用 `codex login` 认证 |
| Kimi Code >= 0.27 | 外部 `kimi` 可执行文件和官方本地 Server API |
| `@anthropic-ai/claude-agent-sdk` | Claude 兼容集成 |
| `@larksuiteoapi/node-sdk` | 飞书/Lark API 和 WebSocket SDK |
| `grammy` | Telegram 集成 |
| `better-sqlite3` | 本地会话、Teams、调度和路由状态 |
| `node-pty` | Claude 兼容 PTY 后端 |
| `ws` | Bridge 和 WebSocket 传输 |
| Vitest + TypeScript + ESLint | 测试、构建和 lint 工具链 |

Codex 和 Kimi Code 有意保持为用户管理的外部可执行文件，而不是内嵌 SDK
依赖。个人版用户可以使用自己的订阅认证，并独立更新引擎 CLI。
