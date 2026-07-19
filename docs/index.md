# MetaBot

**Run Codex and Kimi Code from Feishu/Lark, Telegram, WeChat, or the Web.**

[![CI](https://img.shields.io/github/actions/workflow/status/xvirobotics/metabot/ci.yml?branch=main&style=flat-square)](https://github.com/xvirobotics/metabot/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/xvirobotics/metabot?style=flat-square)](https://github.com/xvirobotics/metabot)

MetaBot is a self-hosted personal agent workspace. It combines a local Core,
token-only Web UI, IM Bridge, CLI, Memory, Skills, T5T, and Agent Teams without
requiring corporate SSO or OIDC.

## Engines

| Engine | Integration | Authentication | Position |
|---|---|---|---|
| **Codex CLI** | `codex exec --json` / `codex exec resume` | `codex login` or API profile | Default engine |
| **Kimi Code 0.27+** | Official local Server API | `kimi login` | First-class alternative with durable Sessions and subagent state |
| **Claude Code** | Compatibility CLI / SDK path | `claude login` or Anthropic-compatible API | Existing-bot compatibility |

The public Codex integration currently uses `codex exec`; it does not claim
Codex app-server or native mid-turn steering. Kimi uses the official local
Server API shared with Kimi's web frontend.

Each bot selects its engine and workspace independently. See
[Multi-Bot Mode](configuration/multi-bot.md).

## Core Capabilities

| Capability | Description |
|---|---|
| **IM Bridge** | Feishu/Lark, Telegram, and WeChat with streaming status, files, and exact @Bot routing |
| **Local Core and Web UI** | Token-authenticated Agents, Chat, Memory, Skills, T5T, Teams, and diagnostics |
| **Agent Teams and Bus** | Parallel teammates, durable tasks/runs, and cross-agent communication |
| **MetaMemory** | Searchable knowledge across sessions with optional Feishu Wiki sync |
| **Engine-native sessions** | Codex resume, durable Kimi Sessions, and Claude compatibility |
| **Optional extensions** | Scheduling, Peers, voice, MetaSkill, and shared Skills |

## Quick Install

Requires **Node.js >= 22.19**.

=== "Linux / macOS"

    ```bash
    curl -fsSL https://github.com/xvirobotics/metabot/releases/latest/download/install.sh | bash
    ```

=== "Windows (PowerShell)"

    ```powershell
    irm https://raw.githubusercontent.com/xvirobotics/metabot/main/install.ps1 | iex
    ```

The Linux/macOS installer verifies the Release checksum, installs the complete
personal edition, stores the Core token at `~/.metabot-core/token` with mode
`0600`, and configures the selected engine and chat channel. Open the local
console at `http://localhost:9200`.

[Get Started](getting-started/installation.md){ .md-button .md-button--primary }
[View on GitHub](https://github.com/xvirobotics/metabot){ .md-button }
