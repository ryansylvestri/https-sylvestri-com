# Deployment Plan

## Validate

```bash
python3 /Users/ryansylvestri/.codex/skills/n8n-workflow-forge/scripts/validate_workflow.py \
  /Users/ryansylvestri/dev/github/https-sylvestri-com/ops/n8n/forge/daily-sylvestri-articles/WORKFLOW.json
```

```bash
python3 /Users/ryansylvestri/.codex/skills/n8n-workflow-forge/scripts/validate_workflow.py \
  /Users/ryansylvestri/dev/github/https-sylvestri-com/ops/n8n/forge/daily-sylvestri-articles/WORKFLOW.json \
  --check-security \
  --allow-unsafe
```

## Deploy

```bash
python3 /Users/ryansylvestri/.codex/skills/n8n-workflow-forge/scripts/deploy_workflow.py \
  --mode ssh \
  --workflow /Users/ryansylvestri/dev/github/https-sylvestri-com/ops/n8n/forge/daily-sylvestri-articles/WORKFLOW.json \
  --base-url https://n8n.srv1106931.hstgr.cloud \
  --ssh-host vps \
  --container n8n-n8n-1
```
