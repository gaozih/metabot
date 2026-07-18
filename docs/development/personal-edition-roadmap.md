# MetaBot OSS Personal Edition Roadmap

MetaBot OSS is the self-hosted personal edition. It is not a delayed mirror of
the company deployment.

Audit baseline (2026-07-18):

- OSS: `7a4b9e19663498b23f1d219f3bbf1c2ed1b96c23` (`v1.0.1`)
- Internal: `7598aa33a88e4b23673977063133f481abee6265`
- Common ancestor: `3add0676dee3a34df8591d04a9c9a2ff673323fa`

The internal branch has hundreds of product, operations, and company-specific
commits after the common ancestor. Features are ported by capability and test
contract, never by merging the internal branch wholesale.

## Product boundary

Keep in the personal edition:

- user-configured Feishu/Lark, Telegram, WeChat, and future public IM adapters;
- Claude Code, Codex, Kimi, and other user-selected engines;
- local MetaBot Core, MetaMemory, Skills, T5T, Agent Bus, and Agent Teams;
- portable message-card UX, reliability, security, packaging, and diagnostics;
- local Bearer-token browser and CLI authentication.

Do not ship:

- Feilian/OIDC, company email login, employee-directory identity, or an
  `X-Forwarded-Email` login requirement;
- private domains, VPN routes, internal Caddy/oauth2-proxy units, or
  `/etc/feilian/*` assumptions;
- TOS/company backup jobs, internal operator readiness scripts, fleet paths,
  embedded company defaults, or credentials;
- company-wide bot discovery or model defaults that silently override the
  self-host owner's choices.

Feishu Bot integration is not corporate login. It remains supported through
the app credentials supplied by the self-host owner.

## Porting queue

### P0: portable reliability and personal auth

- Replace the remaining browser SSO redirects and self-service SSO token flow
  with local Bearer-token login and sign-out.
- [Done] Close the distribution gap with a combined GitHub personal-edition
  package: local Core, token-only Web UI, Bridge, CLI, checksum verification,
  bootstrap-token wiring, and an extracted-package startup smoke.
- Port channel recovery after network changes (`14821a6`), doctor channel
  status (`460620f`), and repeated steer-card completion (`0b4eec1`).
- Review current community PRs for webhook deduplication, output persistence,
  and per-turn output cleanup before duplicating equivalent internal fixes.

### P1: agent runtime and interaction UX

- Port Codex completion/state fixes (`b66ac5b`, `1091ec7`, `e6a6bba`) without
  imposing an internal backend or model default.
- Port sanitized live task details and agent/task cards (`7a32bd4`, `d823df1`,
  `a361e6d`) with hostile markdown and size tests.
- Port Agent Teams continuation, child interaction, and parent activity
  projection (`d0a79d6`, `585e468`, `504bc63`, `c6656a0`) against a local-core
  default.

### P2: local core and workspace agents

- Port the unified workspace-agent lifecycle (`1a516ee` through `16c12d9`) in
  bounded batches: config contract, lifecycle, hot channel binding, then run
  steering.
- Port Memory/T5T performance and visibility fixes (`ba629e1`, `b662ca6`,
  `512f7ef`) with SQLite-only acceptance tests.
- Port T5T tree UX and collaborator controls only after their ownership model
  is expressed without company directory or SSO identity.

### Adapt before porting

- Agent Bus federation: local core is the default; remote federation must be
  explicit and must not require the company service.
- Backup/export: define filesystem export first, then optional S3-compatible
  storage; do not copy TOS credentials or fleet scripts.
- Lark skills: mirror only user-installed public skills; never bundle private
  organization skills.

## Release gates

Every batch requires:

1. no internal domains, secrets, OIDC/Feilian files, or company paths in the
   GitHub diff or release tarball;
2. focused tests plus full GitHub CI on the exact PR head and merged commit;
3. a real package extraction/build smoke and rollback note for release changes;
4. a `metabot-oss` T5T checkpoint and durable Meta Memory report for releases.
