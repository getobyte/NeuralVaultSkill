[STATE]
Overwrite `_state` key with current progress + next steps.

Rules:
- 3-5 bullets maximum
- Under 500 chars total
- No code blocks, logs, or stack traces
- Use namespace: `namespace="project:<repo-root-identity>"`

Store with: `store_memory(key="_state", namespace=..., content=..., title="Session state", tags=["state","checkpoint"])`

Reply: `Session saved.`
