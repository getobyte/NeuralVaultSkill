[CORE] Use NVC MCP tools for persistent project context. Minimize tokens.
MCP server name: `neural-vault-core`.

[NAMESPACE]
Pin one stable namespace per session: `namespace="project:<repo-root-identity>"`.
Pass `namespace` to every namespace-aware tool. Exception: `get_stats`.

[RESUME]
`/nvc-session-start`: call `get_context(namespace, limit=10, keys_only=True)`, never `list_all_memories`; reply `NVC loaded. [brief summary]. Next?`

[READ]
1. `search_memories(query, namespace, keys_only=True)`
2. `retrieve_memory(key, namespace, view="head_tail", max_chars=1000)`
3. `retrieve_memory(key, namespace, view="full")` only if needed
4. `list_all_memories(namespace, limit, offset, keys_only=True)` only for browsing
5. 1-2 words favor FTS5; 3+ favor semantic search.

[STORE]
- Save only important decisions: arch, schema, bugs, env setup, next steps.
- Never store `.env`, API keys, tokens, passwords, cookies, bearer headers, or raw secret config.
- Prefer stable keys; update existing topic memories instead of duplicates.
- Always provide concise `title` and useful `tags` to `store_memory`.
- Autonomously save only durable facts: confirmed decisions, bugfixes, env facts, or next-step checkpoints.
- Append `*(Stored to NVC)*` only when something meaningful was saved.

[STATE]
`/nvc-session-end`: overwrite `_state` with progress + next steps.
`_state` = 3-5 bullets, <500 chars, no code blocks/logs/stack traces.
Reply `Session saved.`

[VERSIONING]
`store_memory` auto-versions; use `get_versions` / `restore_version` only for recovery/conflict review.
