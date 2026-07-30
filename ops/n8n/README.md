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

1. Daily cron trigger
2. Draft generation with explicit source-needed markers
3. App-side schema, MDX, duplicate, and quality validation
4. Commit the draft to the `content-staging` GitHub branch
5. Open a pull request for human source, claims, image, and copy review
6. A human reviewer changes `reviewState` to `approved` and `status` to `published`
7. Normal tested deployment publishes the approved merge
8. Indexing happens only after the approved deployment

The automation API rejects published or approved payloads. There is no direct
generate-to-production or generate-to-indexing path.

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
