# MetaBot

**从飞书/Lark、Telegram、微信或 Web 使用 Codex 和 Kimi Code。**

[![CI](https://img.shields.io/github/actions/workflow/status/xvirobotics/metabot/ci.yml?branch=main&style=flat-square)](https://github.com/xvirobotics/metabot/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/xvirobotics/metabot?style=flat-square)](https://github.com/xvirobotics/metabot)

MetaBot 是可自托管的个人 Agent 工作台，把本地 Core、仅 Token 登录的 Web UI、
IM Bridge、CLI、Memory、Skills、T5T 和 Agent Teams 组合在一起，不依赖企业
SSO 或 OIDC。

## 引擎

| 引擎 | 接入 | 认证 | 定位 |
|---|---|---|---|
| **Codex CLI** | `codex exec --json` / `codex exec resume` | `codex login` 或 API profile | 默认引擎 |
| **Kimi Code 0.27+** | 官方本地 Server API | `kimi login` | 支持持久 Session 和子 Agent 状态的一级可选引擎 |
| **Claude Code** | 兼容 CLI / SDK 路径 | `claude login` 或 Anthropic 兼容 API | 现有 Bot 兼容 |

公开版 Codex 当前使用 `codex exec`，暂不宣称 Codex app-server 或原生执行中
steering。Kimi 使用与 Kimi Web 前端同源的官方本地 Server API。

每个 Bot 可以独立选择引擎和工作区。详见[多 Bot 模式](configuration/multi-bot.md)。

## 核心能力

| 能力 | 说明 |
|---|---|
| **IM Bridge** | 飞书/Lark、Telegram 和微信，支持流式状态、文件和精确 @Bot 路由 |
| **本地 Core 与 Web UI** | Token 鉴权的 Agents、Chat、Memory、Skills、T5T、Teams 和诊断 |
| **Agent Teams 与 Bus** | 并行队友、持久任务/运行和跨 Agent 通信 |
| **MetaMemory** | 跨会话检索知识，并可同步到飞书知识库 |
| **引擎原生会话** | Codex 续接、Kimi 持久 Session 和 Claude 兼容 |
| **可选扩展** | 调度、Peers、语音、MetaSkill 和共享 Skills |

## 快速安装

需要 **Node.js >= 22.19**。

=== "Linux / macOS"

    ```bash
    curl -fsSL https://github.com/xvirobotics/metabot/releases/latest/download/install.sh | bash
    ```

=== "Windows (PowerShell)"

    ```powershell
    irm https://raw.githubusercontent.com/xvirobotics/metabot/main/install.ps1 | iex
    ```

Linux/macOS 安装器会验证 Release 校验和、安装完整个人版、把 Core Token 以
`0600` 权限保存到 `~/.metabot-core/token`，并配置选定的引擎和聊天渠道。
本地控制台地址为 `http://localhost:9200`。

[开始使用](getting-started/installation.md){ .md-button .md-button--primary }
[查看 GitHub](https://github.com/xvirobotics/metabot){ .md-button }
