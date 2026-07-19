# `metabot` Agent Skill bundle

Engine-neutral instructions for the unified `metabot` CLI in MetaBot Personal
Edition. The same bundle works with Codex, Kimi Code, and Claude Code.

The one-line installer mirrors the complete bundle to:

- `~/.codex/skills/metabot`
- `~/.agents/skills/metabot`
- `~/.claude/skills/metabot`
- the matching per-workspace skill roots

To install it manually, choose the destination for your engine:

```bash
metabot skills install metabot --to ~/.codex/skills/metabot
metabot skills install metabot --to ~/.agents/skills/metabot
metabot skills install metabot --to ~/.claude/skills/metabot
```

This bundle documents Memory, Skill Hub, the personal-edition agent registry
and inbox relay, Agent Teams routing, T5T, and runtime operations. Legacy
`mm`, `mh`, and `mb` binaries are intentionally absent.

Publish changes from this directory:

```bash
metabot skills publish metabot --from packages/skills/metabot
```
