# n8n Automation Contracts

This repo ships two `n8n` contract families:

1. repo-first MDX publishing for one `n8n` instance per source blog
2. lead intake routing from `sylvestri.com` into Follow Up Boss

## Lead intake router

- Browser forms post only to `POST /api/lead`
- The app forwards normalized leads to `LEAD_ROUTER_URL`
- The app includes:
  - `X-Lead-Request-Id`
  - `X-Lead-Signature`
  - optional bearer auth via `LEAD_ROUTER_TOKEN`
- n8n is the primary router into Follow Up Boss
- The app retains direct Follow Up Boss fallback when the router is down
- The app owns SMTP notifications to `bot@sylvestri.com`

Runbook:

- `ops/n8n/lead-intake-router.md`
- `ops/n8n/lead-autoresponder-sequences.md`

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
- `LEAD_ROUTER_URL`
- `LEAD_ROUTER_TOKEN`
- `LEAD_ROUTER_SIGNING_SECRET`
- `FUB_API_TOKEN`

## Templates

- `ops/n8n/daily-content-publisher.json`
- `ops/n8n/daily-pdf-publisher.json`
- `ops/n8n/lead-autoresponder-sequences.md`
