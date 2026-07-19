---
name: metabot
description: "Unified MetaBot CLI for personal memory, Skill Hub, agent registry and inbox relay, Agent Teams, T5T, and bridge runtime operations."
---

# MetaBot Personal CLI

Use `metabot` as the single CLI. Legacy `mm`, `mh`, and `mb` binaries are
retired. This bundle is engine-neutral and can be installed for Codex, Kimi
Code, or Claude Code.

## Fast Path

```bash
metabot memory search "query"
metabot memory get <id|path>
metabot skills list
metabot agents list
metabot agents talk <agent> "message"
metabot inbox poll --loop
metabot teams status <team> --summary
metabot t5t projects list
metabot health
```

Run `metabot help` or `metabot <surface> --help` before assuming an optional
bridge-local command is available.

## Authentication

- Personal Core defaults to `http://127.0.0.1:9200`.
- Override it with `METABOT_CORE_URL` when using your own remote Core.
- Use `METABOT_CORE_TOKEN`, or the first line of `~/.metabot-core/token`.
- Never print tokens, bot secrets, or complete credential files.
- Verify identity with `metabot agents whoami`.

## Memory

```bash
metabot memory list [folder]
metabot memory search "query"
metabot memory get <id|path>
metabot memory create "title" "content" --share --tags a,b
metabot memory update <id> "content" [--share|--no-share]
metabot memory mkdir "name"
metabot memory health
```

Search before creating. Bare writes belong in the caller's own namespace;
use an explicit `--path` only when the target is known to be writable. A
document is cross-agent readable only when `shared=true`.

## Skill Hub

```bash
metabot skills list
metabot skills get <name>
metabot skills install <name> [--to <dir>]
metabot skills publish <name> --from <bundle-dir>
metabot skills remove <name>
```

Install complete bundles, not only `SKILL.md`. Standard destinations are
`.codex/skills`, `.agents/skills`, and `.claude/skills`; MetaBot's installer
mirrors its owned bundles to all three while preserving unrelated skills.

## Agent Registry And Inbox Relay

```bash
metabot agents list
metabot agents whoami
metabot agents talk <peer>[/<bot>] [<chatId>] "message"
metabot inbox register [--bot-name <name>]
metabot inbox poll [--chat <id>] [--once|--loop]
metabot inbox peek [--chat <id>]
```

When `chatId` is omitted, the CLI derives a project-scoped conversation id from
the current working directory. Pass an explicit id for a thread that must be
shared across machines. Preserve returned message ids for diagnostics. Inbox
polling is intended for CLI-only Codex/Kimi/Claude agents without a resident
bridge; use Agent Teams when you need owned tasks and run state.

## Agent Teams

Use the separate `metabot-team` skill for the full workflow. Common commands:

```bash
metabot teams create <team> --description "..."
metabot teams dispatch <team> <agent> "subject" --description "..." --plain
metabot teams next <team> <agent> --read
metabot teams status <team> --summary
metabot teams runs list <team>
```

Teams are local orchestration. Agent Bus delivery does not prove a remote
worker can mutate the sender's local team store.

## T5T

```bash
metabot t5t projects list
metabot t5t projects show <project>
metabot t5t board [project]
metabot t5t push <project> <YYYY-MM-DD> "entry"
metabot t5t feedback <entryId> "comment"
```

Record meaningful `START`, `MILESTONE`, `BLOCKER`, `REVIEW`, `SMOKE`,
`RELEASE`, and `FINAL` events. Include changed targets, verification evidence,
the exact blocker, and the next safe action.

## Bridge Runtime

Installed personal runtimes may expose:

```bash
metabot update
metabot restart
metabot status
metabot logs
metabot bots
metabot peers
metabot health
```

Before runtime changes, verify the target process, cwd, ports, and package
version. Preserve `.env`, `bots.json`, local Core data, tokens, logs, workspace
instructions, and unrelated user changes.
