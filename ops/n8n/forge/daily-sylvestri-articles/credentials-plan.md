# Credentials Plan

## n8n Runtime Env

- `OPENAI_API_KEY`
- `HOSTINGER_N8N_WEBHOOK_TOKEN` optional
- `N8N_SOURCE_ID` optional
- `N8N_SIGNATURE_SECRET` optional

## Notes

- current live `sylvestri.com` publish surface accepts unsigned requests because the auth envs are not configured in production yet
- the workflow still computes signed-header support so it does not need to be redesigned later
- no secrets are committed in this pack
