# Environment Variables

All configuration is via `.env` file or system environment variables. Copy `.env.example` to `.env` to get started.

## MetaBot Core

| Variable | Default | Description |
|----------|---------|-------------|
| `BOTS_CONFIG` | — | Path to `bots.json` for multi-bot mode |
| `METABOT_ENGINE` | `codex` | Default engine: `codex`, `kimi`, or compatibility `claude` |
| `FEISHU_APP_ID` | — | Feishu app ID (single-bot mode) |
| `FEISHU_APP_SECRET` | — | Feishu app secret (single-bot mode) |
| `API_PORT` | `9100` | HTTP API port |
| `API_SECRET` | — | Bearer token auth for API and MetaMemory. Generate one with `openssl rand -hex 32` |
| `LOG_LEVEL` | `info` | Log level (debug, info, warn, error) |
| `METABOT_LOCAL_ADDRESS` | — | Bind all Feishu sockets (REST + wss long-connection) to this local source IP, forcing source-based routing past VPN smart split-tunneling (e.g. a corporate VPN hijacking `*.feishu.cn` into a dead tunnel). Unset = default route |
| `METABOT_FEISHU_WS_PING_TIMEOUT_SEC` | `20` | Pong watchdog for the Feishu WebSocket. Safe range: 5–300 seconds |
| `METABOT_FEISHU_WS_HANDSHAKE_TIMEOUT_MS` | `15000` | Timeout for a Feishu WebSocket connect/reconnect handshake. Safe range: 1000–120000 ms |
| `METABOT_PUBLIC_DISTRIBUTION` | — | metabot-core server flag. The `/cli/*` and `/install/*` install endpoints are token-gated by default; set to `1` (or `true`) to serve them anonymously. Only enable when you intentionally self-distribute and your build embeds no secrets |

## Workspace and Claude Compatibility

| Variable | Default | Description |
|----------|---------|-------------|
| `CLAUDE_DEFAULT_WORKING_DIRECTORY` | — | Historical name for the single-bot workspace; used by every engine |
| `CLAUDE_MAX_TURNS` | unlimited | Max turns per request |
| `CLAUDE_MAX_BUDGET_USD` | unlimited | Max cost per request (USD) |
| `CLAUDE_MODEL` | SDK default | Claude model to use |
| `CLAUDE_EXECUTABLE_PATH` | auto-detect | Path to `claude` binary |

## Codex CLI

| Variable | Default | Description |
|----------|---------|-------------|
| `CODEX_MODEL` | Codex default | Codex model to use |
| `CODEX_API_KEY` | — | OpenAI-compatible API key for Codex. Normalized to `OPENAI_API_KEY` in the Codex child process |
| `CODEX_BASE_URL` | Codex default | OpenAI-compatible API base URL. Passed to Codex as `-c openai_base_url="..."` |
| `CODEX_PROFILE` | — | Codex config profile |
| `CODEX_APPROVAL_POLICY` | `never` | Approval policy (`untrusted`, `on-failure`, `on-request`, `never`) |
| `CODEX_SANDBOX` | `workspace-write` | Sandbox mode (`read-only`, `workspace-write`, `danger-full-access`) |
| `CODEX_REASONING_EFFORT` | — | Optional `low`, `medium`, `high`, `xhigh`, `max`, or `ultra` default |
| `CODEX_BYPASS_APPROVALS_AND_SANDBOX` | — | Set `true` only when the host isolation boundary is intentional |
| `CODEX_EXECUTABLE_PATH` | auto-detect | Path to `codex` binary |

The public adapter currently uses `codex exec --json` and
`codex exec resume`; these variables do not enable Codex app-server or native
mid-turn steering.

## Kimi Code 0.27+

| Variable | Default | Description |
|----------|---------|-------------|
| `KIMI_CODE_SERVER_URL` | `http://127.0.0.1:58627` | Existing local Kimi Server origin; otherwise MetaBot starts it on demand |
| `KIMI_CODE_HOME` | `~/.kimi-code` | Kimi Code configuration and local Server token directory |
| `KIMI_API_KEY` | Kimi login state | Optional provider API key inherited by the local Server |

Install the supported CLI with
`npm install -g @moonshot-ai/kimi-code@latest`, then run `kimi login`.
MetaBot uses Kimi's official local Server API rather than the retired Python
`kimi-cli --wire` protocol. Per-bot `model`, `thinking`, `executable`,
`serverUrl`, and `contextWindow` overrides belong in `bots.json`; see
[Multi-Bot Mode](multi-bot.md#kimi-code-options).

## MetaMemory

| Variable | Default | Description |
|----------|---------|-------------|
| `MEMORY_ENABLED` | `true` | Enable embedded MetaMemory |
| `MEMORY_PORT` | `8100` | MetaMemory port |
| `MEMORY_SECRET` | `API_SECRET` | MetaMemory auth (legacy) |
| `MEMORY_ADMIN_TOKEN` | — | Admin token (full access) |
| `MEMORY_TOKEN` | — | Reader token (shared folders only) |
| `META_MEMORY_URL` | `http://localhost:8100` | MetaMemory URL (for CLI remote access) |

## Feishu Service App

| Variable | Default | Description |
|----------|---------|-------------|
| `FEISHU_SERVICE_APP_ID` | — | Dedicated app for wiki sync & doc reader |
| `FEISHU_SERVICE_APP_SECRET` | — | Service app secret |

Falls back to the first Feishu bot's credentials if not set.

## Wiki Sync

| Variable | Default | Description |
|----------|---------|-------------|
| `WIKI_SYNC_ENABLED` | `true` | Enable MetaMemory → Wiki sync |
| `WIKI_SPACE_ID` | — | Feishu Wiki space ID |
| `WIKI_SPACE_NAME` | `MetaMemory` | Wiki space name |
| `WIKI_AUTO_SYNC` | `true` | Auto-sync on changes |
| `WIKI_AUTO_SYNC_DEBOUNCE_MS` | `5000` | Debounce delay |
| `WIKI_SYNC_THROTTLE_MS` | `300` | Delay between API calls |

## Peers Federation

| Variable | Default | Description |
|----------|---------|-------------|
| `METABOT_PEERS` | — | Comma-separated peer URLs. Prefer HTTPS for internet-reachable peers; use plain HTTP only for localhost or a private overlay network |
| `METABOT_PEER_SECRETS` | — | Comma-separated peer secrets (positional match) |
| `METABOT_PEER_NAMES` | auto | Comma-separated peer names |
| `METABOT_PEER_POLL_INTERVAL_MS` | `30000` | Peer poll interval |
| `METABOT_ALLOWED_PEER_CIDRS` | — | Optional comma/space-separated IPv4 CIDR allowlist. When set, task forwarding only targets peers whose literal-IPv4 host falls inside one of these ranges. Hostname-based peers are still gated by the known-peer allowlist but are not CIDR-filtered. Unset = no CIDR constraint. Example: `10.0.0.0/8,192.168.0.0/16` |

## Remote Access

| Variable | Default | Description |
|----------|---------|-------------|
| `METABOT_URL` | `http://localhost:9100` | MetaBot API URL for CLI. The default is local HTTP; for remote access prefer an HTTPS reverse proxy or a private-network address |
| `META_MEMORY_URL` | `http://localhost:8100` | MetaMemory URL for CLI. The default is local HTTP; for remote access prefer an HTTPS reverse proxy or a private-network address |

## Voice

| Variable | Default | Description |
|----------|---------|-------------|
| `VOLCENGINE_TTS_APPID` | — | Doubao STT + TTS (recommended) |
| `VOLCENGINE_TTS_ACCESS_KEY` | — | Doubao STT + TTS (recommended) |
| `VOLCENGINE_TTS_RESOURCE_ID` | `volc.service_type.10029` | Doubao TTS resource ID |
| `OPENAI_API_KEY` | — | Fallback for Whisper STT + OpenAI TTS |
| `ELEVENLABS_API_KEY` | — | ElevenLabs TTS |
| `VOICE_MODEL` | — | Override Claude model for voice mode |

## Third-Party AI Providers

MetaBot supports any Anthropic-compatible API:

```bash
# Kimi/Moonshot
ANTHROPIC_BASE_URL=https://api.moonshot.ai/anthropic
ANTHROPIC_AUTH_TOKEN=your-key

# DeepSeek
ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
ANTHROPIC_AUTH_TOKEN=your-key

# GLM/Zhipu
ANTHROPIC_BASE_URL=https://api.z.ai/api/anthropic
ANTHROPIC_AUTH_TOKEN=your-key
```
