# 安装

## 前置条件

- **Node.js >= 22.19**
- Git
- 至少一个引擎和一个聊天渠道的凭证
- Linux/macOS 才能使用完整的签名校验个人版生命周期

Codex 是默认引擎，Kimi Code 是一级可选引擎；Claude Code 作为现有工作区
的可选兼容引擎保留。

## 一行安装

=== "Linux / macOS"

    ```bash
    curl -fsSL https://github.com/xvirobotics/metabot/releases/latest/download/install.sh | bash
    ```

=== "Windows (PowerShell)"

    ```powershell
    irm https://raw.githubusercontent.com/xvirobotics/metabot/main/install.ps1 | iex
    ```

Linux/macOS 安装器会：

1. 下载最新公开 GitHub Release 并验证 `SHA256SUMS`；
2. 安装本地 Core、仅 Token 登录的 Web UI、Bridge、CLI 和内置 Skills；
3. 把自动生成的 Core Token 以 `0600` 权限保存到 `~/.metabot-core/token`；
4. 引导选择工作区、引擎、认证和 IM 渠道；
5. 将 Core 和 Bridge 作为独立 PM2 应用启动。

个人控制台地址为 `http://localhost:9200`。安装器不会把原始 Token 输出到
日志。Core 数据默认存放在 `~/.metabot-core/`，Bridge 状态默认存放在
`~/.metabot/`。

安装到其他目录：

```bash
METABOT_HOME=/opt/metabot bash install.sh
```

默认目录为 `~/metabot`。

## 引擎认证

请在独立终端执行登录命令。

### Codex CLI（默认）

```bash
npm install -g @openai/codex
codex login
```

MetaBot 公开版当前使用 `codex exec --json` 和 `codex exec resume`，不要求、
也不宣称支持 Codex app-server。

### Kimi Code 0.27+

```bash
npm install -g @moonshot-ai/kimi-code@latest
kimi login
```

MetaBot 使用 Kimi Code 官方 loopback Server API，与 Kimi Web UI 使用同一套
前端协议。该路径不再支持旧 Python `kimi-cli --wire` 集成。

### Claude Code 兼容

只有现有 Bot 或工作区明确选择 `"engine": "claude"` 时，才需要安装并执行
`claude login`。

## 更新

Package 安装从稳定 GitHub Release 资源更新：

```bash
metabot update
```

源码 checkout 显式使用 Git：

```bash
metabot update --git
```

更新器会保留 `.env`、`bots.json`、用户数据、日志、工作区说明和用户修改过的
Skills。Release 与源码更新路径相互独立。

## 使用已有外部 Core

只安装 Bridge 并连接已有 Core：

```bash
METABOT_INSTALL_CORE=0 bash install.sh
```

配置 `METABOT_CORE_URL` 和 `METABOT_CORE_TOKEN`。安装器不会替换其他目录的
Core PM2 进程或其数据。

## 源码开发安装

```bash
git clone https://github.com/xvirobotics/metabot.git ~/metabot
cd ~/metabot
npm ci --include=dev
cp bots.example.json bots.json
cp .env.example .env
npm run dev
```

## Windows 说明

PowerShell 安装器会配置 Bridge，并为 `metabot` CLI 安装 `.cmd` wrapper；需要
Git for Windows。完整本地 Core/Web UI 生命周期目前仍由 Linux/macOS Release
安装器提供，直到 Windows 打包能力达到同等水平。

下一步：[快速配置](quick-setup.md)或详细的[飞书应用配置](feishu-app-setup.md)。
