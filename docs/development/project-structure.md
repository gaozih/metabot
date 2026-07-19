# Project Structure

MetaBot is a Node.js >= 22.19 TypeScript ESM monorepo (`"type": "module"`;
local imports use `.js` extensions).

## Directory Layout

```text
metabot/
├── src/                              # IM Bridge runtime
│   ├── index.ts                      # Entrypoint and lifecycle
│   ├── config.ts                     # Environment and bots.json loader
│   ├── bridge/
│   │   ├── message-bridge.ts         # Commands, queues, tasks, engine execution
│   │   ├── command-handler.ts        # Chat command surface
│   │   └── outputs-manager.ts        # Output file lifecycle
│   ├── engines/
│   │   ├── index.ts                  # Codex-default engine router
│   │   ├── types.ts                  # Shared Engine / Executor contracts
│   │   ├── codex/                    # codex exec JSONL + resume adapter
│   │   ├── kimi/                     # Kimi Code 0.27+ local Server API adapter
│   │   └── claude/                   # Claude Code compatibility adapter
│   ├── feishu/                       # Lark events, cards, media, group routing
│   ├── telegram/                     # Telegram long-polling adapter
│   ├── wechat/                       # WeChat/ClawBot adapter
│   ├── agent-teams/                  # Durable teams, tasks, members, and runs
│   ├── session/                      # Shared session state
│   ├── scheduler/                    # Persistent scheduling
│   ├── api/                          # Bridge HTTP routes, peers, voice
│   ├── memory/                       # Core Memory client and events
│   ├── sync/                         # Feishu Wiki sync
│   ├── skills/                       # Bundled Bridge-side skills
│   ├── web/                          # Bridge WebSocket compatibility layer
│   └── utils/                        # Logging and helpers
├── packages/
│   ├── server/                       # Personal Core HTTP backend
│   ├── web-ui/                       # Personal Core React application
│   ├── cli/                          # Feature CLI shipped as metabot
│   ├── cli-core/                     # Shared CLI HTTP client
│   ├── metamemory/                   # Memory client package
│   ├── skill-hub/                    # Skill registry client package
│   └── skills/                       # Core-distributed skill bundles
├── bin/                              # metabot and helper launchers
├── scripts/                          # Release and packaging scripts
├── tests/                            # Bridge Vitest suites
├── docs/                             # MkDocs sources and landing page
├── install.sh / install.ps1          # Personal-edition installers
├── bots.example.json                 # Multi-bot example
├── .env.example                      # Environment example
└── package.json                      # npm workspaces root
```

## Engine Adapters

| Path | Role |
|---|---|
| `src/engines/codex/executor.ts` | Runs `codex exec --json` / `exec resume`; translates JSONL into shared events. |
| `src/engines/codex/session-lister.ts` | Discovers resumable Codex sessions without claiming app-server support. |
| `src/engines/kimi/daemon-client.ts` | Starts or connects to Kimi Code's official loopback Server API. |
| `src/engines/kimi/executor.ts` | Maps Sessions, snapshots, steering, questions, tools, subagents, and goals. |
| `src/engines/kimi/session-lister.ts` | Lists Kimi Sessions through the Server API. |
| `src/engines/claude/` | Keeps existing Claude CLI / Agent SDK behavior compatible. |

All engines implement the shared boundary in `src/engines/types.ts`; the Bridge
does not identify a bot by its current engine.

## Key Dependencies and Runtimes

| Package or runtime | Purpose |
|---|---|
| Node.js >= 22.19 | Supported runtime baseline |
| Codex CLI | Default external engine executable; authenticated with `codex login` |
| Kimi Code >= 0.27 | External `kimi` executable and official local Server API |
| `@anthropic-ai/claude-agent-sdk` | Claude compatibility integration |
| `@larksuiteoapi/node-sdk` | Feishu/Lark API and WebSocket SDK |
| `grammy` | Telegram integration |
| `better-sqlite3` | Local sessions, teams, schedules, and routing state |
| `node-pty` | Claude compatibility PTY backend |
| `ws` | Bridge and WebSocket transport |
| Vitest + TypeScript + ESLint | Test, build, and lint toolchain |

Codex and Kimi Code are intentionally external user-managed executables, not
embedded SDK dependencies. This lets personal-edition users authenticate with
their own subscriptions and update the engine CLIs independently.
