# Architecture

## Flow

1. Daily schedule trigger at `05:05` `America/New_York`
2. Deterministic topic selector rotates through Sylvestri authority topics
3. OpenAI draft generation returns strict JSON
4. Code node normalizes slug, excerpt, tags, and MDX frontmatter
5. Dry-run validation checks the full draft contract
6. GitHub stages the MDX draft on `content-staging`
7. GitHub opens a human-review pull request
8. Only an approved, tested merge may publish and become indexable

## Failure Behavior

- malformed AI JSON stops execution before any publish
- publish quality gate failures stop before GitHub staging
- automated payloads with `status: published` or `reviewState: approved` are rejected
- the workflow has no SEO push node
- optional auth headers are only attached when env vars exist
