# Daily Sylvestri Articles

## Goal

Publish one new `articles` entry to `https://sylvestri.com` every weekday-sized daily cycle with a strong personal-brand and local-authority angle.

## Content Lane

- Site: `sylvestri.com`
- Route family: `/articles/[slug]`
- Author voice: Ryan Sylvestri, first person
- Intent focus:
  - best agent in the area
  - local authority
  - buyer and seller trust
  - Hudson Valley market interpretation
- Guardrails:
  - no invented MLS statistics
  - no fair-housing steering
  - no generic national copy

## Runtime Dependencies

- `OPENAI_API_KEY`
- public site publish surface at `POST https://sylvestri.com/api/ops/content/publish`
- optional auth envs if Hostinger later enables them:
  - `HOSTINGER_N8N_WEBHOOK_TOKEN`
  - `N8N_SOURCE_ID`
  - `N8N_SIGNATURE_SECRET`

## Success Criteria

- workflow generates one JSON-safe article draft
- dry run passes publish quality gates
- live publish returns `ok: true`
- SEO push runs against `/api/seo/push`
