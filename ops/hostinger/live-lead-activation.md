# Hostinger Live Lead Activation

Use this after the Hostinger environment import and redeploy are complete.

## Required Hostinger envs

- `LEAD_ROUTER_URL`
- `LEAD_ROUTER_TOKEN`
- `LEAD_ROUTER_SIGNING_SECRET`
- `FUB_API_TOKEN`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `LEAD_NOTIFICATION_EMAILS`
- `LEAD_NOTIFICATION_FROM`

## Deterministic sequence

```bash
cd /Users/ryansylvestri/dev/github/https-sylvestri-com
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use
npm ci
npm run lead:verify:live -- --base-url https://sylvestri.com
```

## Expected output

- `status: 200`
- `message` confirms router forwarding or direct fallback
- `requestId` is present

## Follow-up verification

1. Look up the returned `requestId` in the live `n8n` router execution log.
2. Confirm the corresponding event or person update exists in Follow Up Boss.
3. Confirm the operator notification reached `bot@sylvestri.com`.
4. If app response succeeds but downstream systems do not, the blocker is now past the website layer.

## Current blocker

- Hostinger environment variable import is still hPanel-managed.
- The API/SSH path is verified for discovery, but not for managed env mutation or redeploy.
