# `metabot-team` — MetaBot Agent Team skill bundle

This directory ships the canonical Agent Team skill for `metabot teams`.
It is optimized for Codex-first delegation, teammate task claiming, concise
handoffs, run inspection, and lead reporting.

## Install

```bash
metabot skills install metabot-team --to ~/.codex/skills/metabot-team
metabot skills install metabot-team --to ~/.agents/skills/metabot-team
metabot skills install metabot-team --to ~/.claude/skills/metabot-team
```

The one-line MetaBot installer mirrors this bundle to all three locations for
Codex, Kimi Code, and Claude Code compatibility.

## Source of truth

The runtime copy lives at `src/skills/metabot-team/SKILL.md`. Keep this packaged
copy in sync before publishing:

```bash
cp src/skills/metabot-team/SKILL.md packages/skills/metabot-team/SKILL.md
metabot skills publish metabot-team --from packages/skills/metabot-team
```
