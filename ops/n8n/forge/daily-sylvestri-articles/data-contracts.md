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
- `frontmatter.status`: `published`
- `frontmatter.access`: `public`
- `content`: markdown, minimum `160` characters

## SEO Push Payload

- `urls`: new route path returned by publish response
- `sitemapPaths`:
  - `/sitemap.xml`
  - `/sitemap-content.xml`
