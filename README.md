# ⚡ NeuralVaultSkill *(Safe-Mini)*

> Canonical safe-mini prompt for [NeuralVaultCore](https://github.com/getobyte/NeuralVaultCore).

NeuralVaultSkill is a compact system prompt for agents that use NeuralVaultCore as an MCP memory server. Installs two slash commands into Claude Code: `/nvc:init` and `/nvc:end`.

The prompt is optimized for **low-token memory workflows**, but it does not trade away operational safety. It enforces namespace discipline, concise `_state`, stable memory keys, and explicit secret redaction.

> The MCP server name exposed in clients is `neural-vault-core`.

![Tokens](https://img.shields.io/badge/Tokens-~392-0D1117?style=flat-square&logo=anthropic&logoColor=4488FF)
![License](https://img.shields.io/badge/License-MIT-0D1117?style=flat-square&logo=opensourceinitiative&logoColor=4CAF50)
![Ecosystem](https://img.shields.io/badge/Ecosystem-NeuralVault-0D1117?style=flat-square&logo=anthropic&logoColor=9F7AEA)

---

## 🚀 Installation

```bash
# Global — available in every workspace (recommended)
npx github:getobyte/NeuralVaultSkill --global

# Local — current project only
npx github:getobyte/NeuralVaultSkill --local
```

### Cursor / VS Code

```bash
curl -sL https://raw.githubusercontent.com/getobyte/NeuralVaultSkill/main/SKILL.md > .cursorrules
```

### Claude Code / Ollama / Custom UIs

1. Open `SKILL.md` in the repository.
2. Copy the full content.
3. Paste it into your agent's **System Prompt** or **Custom Instructions**.

---

## 🛠️ Usage

```
/nvc:init  →  loads project context via get_context()
/nvc:end   →  saves a short _state checkpoint
```

Work normally between commands — meaningful saves happen autonomously in the background *(appended as `Stored to NVC`)*.

---

## 🧠 What It Enforces

| Rule | Details |
|------|---------|
| **Stable namespace** | Always use `namespace="project:<repo-root-identity>"` on every call |
| **Cheap resume** | Use `get_context()` at session start — never `list_all_memories` |
| **Low-token reads** | Search with `keys_only=True`, summarize with `view="head_tail"` |
| **Safe memory** | Never store `.env`, API keys, tokens, or raw secrets |
| **Stable keys** | Update existing topic memories instead of creating duplicates |
| **Short `_state`** | Keep it to 3–5 bullets, under 500 chars |
| **Clean writes** | Store only confirmed decisions, bugfixes, and env facts |

---

## 🌐 NeuralVault Ecosystem

| Component | Role |
|-----------|------|
| 🧠 [**NeuralVaultCore**](https://github.com/getobyte/NeuralVaultCore) | MCP memory server — the brain |
| ⚡ **NeuralVaultSkill** *(you are here)* | Session memory automation — `/nvc:init` + `/nvc:end` |
| 🧹 [**NeuralVaultArchivist**](https://github.com/getobyte/NeuralVaultArchivist) | Memory consolidation — on-demand cleanup |
| 🛠️ [**NeuralSkillBuilder**](https://github.com/getobyte/NeuralSkillBuilder) | Skill builder — design, scaffold, audit |
| 🔄 [**NeuralVaultFlow**](https://github.com/getobyte/NeuralVaultFlow) | Dev workflow — brainstorm to deploy |

---

<div align="center">

**NeuralVaultSkill** — Cyber-Draco Legacy  
Built by [getobyte](https://github.com/getobyte) · Romania 🇷🇴

</div>
