# NeuralVaultSkill (Safe-Mini)

> Canonical safe-mini prompt for [NeuralVaultCore](https://github.com/getobyte/NeuralVaultCore).

NeuralVaultSkill is a compact system prompt for agents that use NeuralVaultCore as an MCP memory server. This repository ships one primary prompt only: [SKILL.md](./SKILL.md).

The prompt is optimized for low-token memory workflows, but it does not trade away operational safety. It enforces namespace discipline, concise `_state`, stable memory keys, and explicit secret redaction.

The MCP server name exposed in clients is `neural-vault-core`.

## Measured Size

Current [SKILL.md](./SKILL.md) size:

- **1,534 chars**
- **186 words**
- **~383 tokens** using NeuralVaultCore's rough estimator: `chars // 4`

## What It Enforces

- **Stable namespace:** use `namespace="project:<repo-root-identity>"` on every namespace-aware tool; `get_stats` is the only exception.
- **Cheap resume:** use `get_context(...)` for session start; do not use `list_all_memories` for resume.
- **Low-token reads:** search with `search_memories(..., keys_only=True)`, summarize with `retrieve_memory(..., view="head_tail", max_chars=1000)`, use `view="full"` only when needed.
- **Cheap browsing:** `list_all_memories` must explicitly pass `keys_only=True`.
- **Clean writes:** store only important decisions and always provide concise `title` and useful `tags`.
- **Safe memory:** never store `.env`, API keys, tokens, passwords, cookies, bearer headers, or raw secret config values.
- **Stable keys:** update existing topic memories instead of creating duplicates.
- **Durable auto-saves:** autonomous saves should capture only confirmed decisions, bugfixes, env facts, or next-step checkpoints.
- **Short `_state`:** keep it to 3-5 bullets under 500 chars, with no code blocks, logs, or stack traces.
- **Version recovery only:** `store_memory` already auto-versions; `get_versions` and `restore_version` are for recovery/conflict review.

## Compatible NeuralVaultCore Tools

The prompt is aligned with the actual NeuralVaultCore MCP tools:

- `store_memory`
- `retrieve_memory`
- `search_memories`
- `list_all_memories`
- `get_context`
- `delete_memory`
- `get_versions`
- `restore_version`
- `get_stats`

## Installation

### Cursor / VS Code

Run this in your project root:

```bash
curl -sL https://raw.githubusercontent.com/getobyte/NeuralVaultSkill/main/SKILL.md > .cursorrules
```

### Claude Code / Ollama / Custom UIs

1. Open [SKILL.md](./SKILL.md).
2. Copy the full prompt.
3. Paste it into your agent's system prompt or custom instructions.

## Usage

1. Type `/nvc-session-start` to load project context with `get_context`.
2. Work normally; meaningful autonomous saves append `*(Stored to NVC)*`.
3. Type `/nvc-session-end` to save a short `_state` checkpoint.

Built for NeuralVaultCore v1.0 | Created by [getobyte](https://github.com/getobyte)
