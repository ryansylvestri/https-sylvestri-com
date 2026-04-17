# Cross-Repo Duplication Runbook (HRR)

## Summary

Create one new artifact at:
`/Users/ryansylvestri/dev/github/hudsonriverrealtors/docs/docs-resources-media-duplication-runbook.md`

The runbook is canonical for duplicating the docs/resources/media/gating system from `https-sylvestri-com` into `hudsonriverrealtors/blog-site`, while preserving HRR-specific routing and branding.

## Fixed paths

- `SOURCE=/Users/ryansylvestri/dev/github/https-sylvestri-com`
- `TARGET=/Users/ryansylvestri/dev/github/hudsonriverrealtors/blog-site`
- `SOURCE_REF=<required-branch-or-commit>`

## Implementation requirements

- Create a feature branch in `TARGET` and capture the baseline SHA before copying.
- Create a temporary source worktree pinned to `SOURCE_REF`.
- Assert required source paths exist before copying.
- Copy by subsystem:
  - content engine
  - routes
  - access/auth
  - asset pipeline
  - sitemap/robots/nav integration
- Preserve HRR-specific paths and values:
  - never overwrite `app/hub/*`
  - never overwrite `app/quick-start/*`
  - never overwrite `automation/n8n/*`
  - preserve analytics env values and IDs
  - preserve HRR brand/domain constants in `lib/site-content.ts`

## Required contracts

- Frontmatter fields: `section`, `access`, `status`, `assetIds`, date fields
- Asset metadata fields: `kind`, `storageProvider`, `previewUrl`, `downloadable`, `status`
- Expected routes and endpoints:
  - `/docs`
  - `/articles`
  - `/resources`
  - `/api/assets/upload-url`
  - `/api/assets/complete`
  - `/api/assets/:id/access-url`
  - `/api/waitlist/pro`
  - `/api/stripe/webhook`
  - `/podcast/feed.xml`

## Validation

- `npm run lint`
- `npm run build`
- smoke-check `/docs`, `/articles`, `/resources`, one protected page, and one asset preview
- confirm signed URL expiry behavior
- confirm `/hub` and `/quick-start` stay unchanged

## Rollback

- Code rollback on feature branch only using baseline SHA
- Database rollback in reverse dependency order
- Feature-flag fallback: `FEATURE_PAID=false`

## Assumptions

- `SOURCE_REF` is required because `main` may drift.
- Paid launch remains disabled initially.
- Path-based docs launch ships before any subdomain split.
