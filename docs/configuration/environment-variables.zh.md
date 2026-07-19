# 环境变量

所有配置通过 `.env` 文件或系统环境变量。复制 `.env.example` 到 `.env` 开始使用。

## MetaBot 核心

| 变量 | 默认 | 说明 |
|------|------|------|
| `BOTS_CONFIG` | — | `bots.json` 路径（多 Bot 模式） |
| `METABOT_ENGINE` | `codex` | 默认引擎：`codex`、`kimi` 或兼容引擎 `claude` |
| `FEISHU_APP_ID` | — | 飞书 App ID（单 Bot 模式） |
| `FEISHU_APP_SECRET` | — | 飞书 App Secret（单 Bot 模式） |
| `API_PORT` | `9100` | HTTP API 端口 |
| `API_SECRET` | — | Bearer Token 认证 |
| `LOG_LEVEL` | `info` | 日志级别（debug, info, warn, error） |
| `METABOT_LOCAL_ADDRESS` | — | 所有飞书 socket（REST + wss 长连接）绑定到该本机源 IP，触发 source-based routing 绕过 VPN 智能分流（如某些企业 VPN 把 `*.feishu.cn` 劫持进失效隧道）。不设则走默认路由 |
| `METABOT_FEISHU_WS_PING_TIMEOUT_SEC` | `20` | 飞书 WebSocket 的 Pong 看门狗，安全范围 5–300 秒 |
| `METABOT_FEISHU_WS_HANDSHAKE_TIMEOUT_MS` | `15000` | 飞书 WebSocket 建连/重连握手超时，安全范围 1000–120000 毫秒 |

## 工作区与 Claude 兼容

| 变量 | 默认 | 说明 |
|------|------|------|
| `CLAUDE_DEFAULT_WORKING_DIRECTORY` | — | 单 Bot 工作区的历史变量名；所有引擎都会使用 |
| `CLAUDE_MAX_TURNS` | 不限 | 每次请求最大轮次 |
| `CLAUDE_MAX_BUDGET_USD` | 不限 | 每次请求费用上限（美元） |
| `CLAUDE_MODEL` | SDK 默认 | Claude 模型 |
| `CLAUDE_EXECUTABLE_PATH` | 自动检测 | `claude` 二进制路径 |

## Codex CLI

| 变量 | 默认 | 说明 |
|------|------|------|
| `CODEX_MODEL` | Codex 默认 | Codex 模型 |
| `CODEX_API_KEY` | — | Codex 的 OpenAI 兼容 API Key。子进程里会标准化成 `OPENAI_API_KEY` |
| `CODEX_BASE_URL` | Codex 默认 | OpenAI 兼容 API Base URL。会传给 Codex：`-c openai_base_url="..."` |
| `CODEX_PROFILE` | — | Codex 配置 profile |
| `CODEX_APPROVAL_POLICY` | `never` | 审批策略（`untrusted`、`on-failure`、`on-request`、`never`） |
| `CODEX_SANDBOX` | `workspace-write` | 沙箱模式（`read-only`、`workspace-write`、`danger-full-access`） |
| `CODEX_REASONING_EFFORT` | — | 可选默认值：`low`、`medium`、`high`、`xhigh`、`max` 或 `ultra` |
| `CODEX_BYPASS_APPROVALS_AND_SANDBOX` | — | 仅在宿主隔离边界明确时设置为 `true` |
| `CODEX_EXECUTABLE_PATH` | 自动检测 | `codex` 二进制路径 |

公开版当前使用 `codex exec --json` 和 `codex exec resume`；这些变量不会启用
Codex app-server 或原生执行中 steering。

## Kimi Code 0.27+

| 变量 | 默认 | 说明 |
|------|------|------|
| `KIMI_CODE_SERVER_URL` | `http://127.0.0.1:58627` | 已有本地 Kimi Server 地址；否则 MetaBot 按需启动 |
| `KIMI_CODE_HOME` | `~/.kimi-code` | Kimi Code 配置和本地 Server Token 目录 |
| `KIMI_API_KEY` | Kimi 登录状态 | 可选 Provider API Key，由本地 Server 继承 |

使用 `npm install -g @moonshot-ai/kimi-code@latest` 安装支持的 CLI，然后执行
`kimi login`。MetaBot 使用 Kimi 官方本地 Server API，不再使用旧 Python
`kimi-cli --wire` 协议。每个 Bot 的 `model`、`thinking`、`executable`、
`serverUrl` 和 `contextWindow` 覆盖应写入 `bots.json`；详见
[多 Bot 模式](multi-bot.md#kimi-code-options)。

## MetaMemory

| 变量 | 默认 | 说明 |
|------|------|------|
| `MEMORY_ENABLED` | `true` | 启用内嵌 MetaMemory |
| `MEMORY_PORT` | `8100` | MetaMemory 端口 |
| `MEMORY_SECRET` | `API_SECRET` | MetaMemory 认证（旧版） |
| `MEMORY_ADMIN_TOKEN` | — | 管理员 Token（完整访问） |
| `MEMORY_TOKEN` | — | 读者 Token（仅 shared 文件夹） |
| `META_MEMORY_URL` | `http://localhost:8100` | MetaMemory 地址（CLI 远程访问） |

## 飞书服务应用

| 变量 | 默认 | 说明 |
|------|------|------|
| `FEISHU_SERVICE_APP_ID` | — | 专用于知识库同步和文档阅读的飞书应用 |
| `FEISHU_SERVICE_APP_SECRET` | — | 服务应用密钥 |

未设置时回退到第一个飞书 Bot 的凭证。

## Wiki 同步

| 变量 | 默认 | 说明 |
|------|------|------|
| `WIKI_SYNC_ENABLED` | `true` | 启用 MetaMemory → 知识库同步 |
| `WIKI_SPACE_ID` | — | 飞书知识库空间 ID |
| `WIKI_SPACE_NAME` | `MetaMemory` | 知识库空间名称 |
| `WIKI_AUTO_SYNC` | `true` | 变更时自动同步 |
| `WIKI_AUTO_SYNC_DEBOUNCE_MS` | `5000` | 防抖延迟 |
| `WIKI_SYNC_THROTTLE_MS` | `300` | API 调用间隔 |

## Peers 联邦

| 变量 | 默认 | 说明 |
|------|------|------|
| `METABOT_PEERS` | — | 逗号分隔的 peer URL |
| `METABOT_PEER_SECRETS` | — | 逗号分隔的 peer secret（位置对应） |
| `METABOT_PEER_NAMES` | 自动 | 逗号分隔的 peer 名称 |
| `METABOT_PEER_POLL_INTERVAL_MS` | `30000` | peer 拉取间隔 |
| `METABOT_ALLOWED_PEER_CIDRS` | — | 可选的逗号/空格分隔 IPv4 CIDR 白名单。设置后，任务转发仅允许目标 peer 的字面 IPv4 地址落在指定范围内。基于主机名的 peer 仍受已知 peer 白名单约束，但不受 CIDR 过滤。不设置 = 无 CIDR 约束。示例：`10.0.0.0/8,192.168.0.0/16` |

## 远程访问

| 变量 | 默认 | 说明 |
|------|------|------|
| `METABOT_URL` | `http://localhost:9100` | MetaBot API 地址（CLI 用） |
| `META_MEMORY_URL` | `http://localhost:8100` | MetaMemory 地址（CLI 用） |

## 语音

| 变量 | 默认 | 说明 |
|------|------|------|
| `VOLCENGINE_TTS_APPID` | — | 豆包 STT + TTS（推荐） |
| `VOLCENGINE_TTS_ACCESS_KEY` | — | 豆包 STT + TTS（推荐） |
| `VOLCENGINE_TTS_RESOURCE_ID` | `volc.service_type.10029` | 豆包 TTS 资源 ID |
| `OPENAI_API_KEY` | — | Whisper STT + OpenAI TTS 备选 |
| `ELEVENLABS_API_KEY` | — | ElevenLabs TTS |
| `VOICE_MODEL` | — | 语音模式使用的 Claude 模型（可选覆盖） |

## 第三方 AI 服务商

支持任何 Anthropic 兼容 API：

```bash
# Kimi/月之暗面
ANTHROPIC_BASE_URL=https://api.moonshot.ai/anthropic
ANTHROPIC_AUTH_TOKEN=你的key

# DeepSeek
ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
ANTHROPIC_AUTH_TOKEN=你的key

# GLM/智谱
ANTHROPIC_BASE_URL=https://api.z.ai/api/anthropic
ANTHROPIC_AUTH_TOKEN=你的key
```
