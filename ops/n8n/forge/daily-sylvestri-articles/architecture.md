# Architecture

## Flow

1. Daily schedule trigger at `05:05` `America/New_York`
2. Deterministic topic selector rotates through Sylvestri authority topics
3. OpenAI draft generation returns strict JSON
4. Code node normalizes slug, excerpt, tags, and MDX frontmatter
5. Dry run publish checks app-side validation
6. Live publish writes the article
7. SEO push pings the new route and sitemap endpoints

## Failure Behavior

- malformed AI JSON stops execution before any publish
- publish quality gate failures stop before live write
- optional auth headers are only attached when env vars exist
