# Data Contracts

## AI Output

The model must return one JSON object with:

- `title`
- `slug`
- `excerpt`
- `content`
- `tags`

## Publish Payload

- `section`: `articles`
- `frontmatter.section`: `articles`
- `frontmatter.status`: `draft`
- `frontmatter.reviewState`: `draft`
- `frontmatter.contentKind`: `news`, `guide`, `tutorial`, `experiment`, `idea`, or `story`
- `frontmatter.featuredImage`: absolute `src` and descriptive `alt`
- `frontmatter.sources`: source objects; news requires at least one primary source
- `frontmatter.access`: `public`
- `content`: markdown, minimum `160` characters

## Review Gate

- Drafts are committed to `content-staging`.
- The workflow opens a pull request against `main`.
- A human reviewer verifies sources, claims, imagery, metadata, and links.
- Only the reviewer may set `reviewState: approved` and `status: published`.
