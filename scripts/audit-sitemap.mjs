#!/usr/bin/env node

const DEFAULT_SITEMAP_URL = "https://sylvestri.com/sitemap.xml";

function parseArgs(args) {
  const positional = [];
  let originOverride = null;
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--origin") {
      originOverride = args[index + 1];
      index += 1;
    } else if (arg.startsWith("--origin=")) {
      originOverride = arg.slice("--origin=".length);
    } else {
      positional.push(arg);
    }
  }
  return { sitemapUrl: positional[0] || DEFAULT_SITEMAP_URL, originOverride };
}

function extract(xml, pattern) {
  return Array.from(xml.matchAll(pattern)).map((match) => match[1].trim());
}

function auditUrl(canonical, override) {
  if (!override) return canonical;
  const url = new URL(canonical);
  const origin = new URL(override);
  url.protocol = origin.protocol;
  url.host = origin.host;
  return url.toString();
}

function metaContent(html, name, attribute = "name") {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const key = tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"))?.[1];
    if (key?.toLowerCase() !== name.toLowerCase()) continue;
    return tag.match(/content=["']([^"']*)["']/i)?.[1]?.trim() || "";
  }
  return "";
}

function linkHref(html, rel) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const value = tag.match(/rel=["']([^"']+)["']/i)?.[1];
    if (value?.toLowerCase().split(/\s+/).includes(rel)) {
      return tag.match(/href=["']([^"']+)["']/i)?.[1]?.trim() || "";
    }
  }
  return "";
}

async function run() {
  const { sitemapUrl, originOverride } = parseArgs(process.argv.slice(2));
  const sitemapResponse = await fetch(sitemapUrl);
  if (!sitemapResponse.ok) throw new Error(`Could not fetch sitemap: ${sitemapResponse.status}`);

  const canonicalUrls = extract(await sitemapResponse.text(), /<loc>(.*?)<\/loc>/g);
  const failures = [];
  const pages = [];
  const titles = new Map();
  const descriptions = new Map();
  const internalLinks = new Map();

  for (const canonicalUrl of canonicalUrls) {
    const requestedUrl = auditUrl(canonicalUrl, originOverride);
    const response = await fetch(requestedUrl, { redirect: "manual" });
    if (response.status !== 200) {
      failures.push({ url: canonicalUrl, check: "status", actual: response.status });
      continue;
    }
    const html = await response.text();
    const title = html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() || "";
    const description = metaContent(html, "description");
    const canonical = linkHref(html, "canonical");
    const robots = metaContent(html, "robots");
    const h1Count = (html.match(/<h1\b/gi) || []).length;
    const ogTitle = metaContent(html, "og:title", "property");
    const ogDescription = metaContent(html, "og:description", "property");
    const ogImage = metaContent(html, "og:image", "property");

    for (const [check, value] of Object.entries({ title, description, canonical, robots, ogTitle, ogDescription, ogImage })) {
      if (!value) failures.push({ url: canonicalUrl, check: `missing-${check}` });
    }
    if (h1Count !== 1) failures.push({ url: canonicalUrl, check: "h1-count", actual: h1Count });
    if (/Application error|Internal Server Error|NEXT_NOT_FOUND|Replace with generated|Lorem ipsum/i.test(html)) {
      failures.push({ url: canonicalUrl, check: "exception-or-placeholder-text" });
    }
    if (canonical && new URL(canonical, canonicalUrl).toString() !== canonicalUrl) {
      failures.push({ url: canonicalUrl, check: "canonical-mismatch", actual: canonical });
    }

    titles.set(title, [...(titles.get(title) || []), canonicalUrl]);
    descriptions.set(description, [...(descriptions.get(description) || []), canonicalUrl]);
    const links = extract(html, /<a\b[^>]*href=["']([^"'#]+)["']/gi)
      .map((href) => new URL(href, requestedUrl))
      .filter((url) => url.origin === new URL(requestedUrl).origin && !url.pathname.startsWith("/api/"));
    for (const link of links) internalLinks.set(link.toString(), canonicalUrl);
    pages.push({ canonicalUrl, requestedUrl });
  }

  for (const [title, urls] of titles) {
    if (title && urls.length > 1) failures.push({ check: "duplicate-title", value: title, urls });
  }
  for (const [description, urls] of descriptions) {
    if (description && urls.length > 1) failures.push({ check: "duplicate-description", value: description, urls });
  }

  for (const [link, source] of internalLinks) {
    const response = await fetch(link, { redirect: "manual" });
    if (response.status >= 400) failures.push({ url: source, check: "broken-internal-link", link, actual: response.status });
  }

  const report = {
    ok: failures.length === 0,
    sitemapUrl,
    auditedOrigin: originOverride,
    canonicalUrlCount: canonicalUrls.length,
    htmlPagesAudited: pages.length,
    internalLinksChecked: internalLinks.size,
    failures,
  };
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) process.exitCode = 1;
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
