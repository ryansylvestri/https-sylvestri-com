# n8n Content Automation

This repo now ships a repo-first MDX publishing contract for one `n8n` instance per source blog.

## Workflow pattern

1. Daily cron trigger per instance in UTC
2. Topic selection and draft generation
3. QA and duplicate checks
4. `POST /api/ops/content/publish` with `dryRun=true`
5. Optional approval branch
6. `POST /api/ops/content/publish` with `dryRun=false`
7. Optional PDF branch to `POST /api/ops/assets/publish-pdf`
8. Post-deploy call to `POST /api/seo/push`

## Required headers

- `x-hostinger-n8n-webhook-token: $HOSTINGER_N8N_WEBHOOK_TOKEN`
- `x-n8n-source-id: $N8N_SOURCE_ID`
- `x-n8n-signature: sha256=<hmac of raw body using N8N_SIGNATURE_SECRET>`

## Required env contract

- `HOSTINGER_N8N_WEBHOOK_TOKEN`
- `N8N_SIGNATURE_SECRET`
- `N8N_SOURCE_ID`
- `GSC_PING_TOKEN`

## Templates

- `ops/n8n/daily-content-publisher.json`
- `ops/n8n/daily-pdf-publisher.json`
