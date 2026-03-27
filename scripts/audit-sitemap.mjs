#!/usr/bin/env node

const DEFAULT_SITEMAP_URL = "https://sylvestri.com/sitemap.xml";

function parseArgs(rawArgs) {
  const positional = [];
  let originOverride = "";

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];

    if (arg === "--origin" && rawArgs[index + 1]) {
      originOverride = rawArgs[index + 1];
      index += 1;
      continue;
    }

    if (arg.startsWith("--origin=")) {
      originOverride = arg.replace("--origin=", "");
      continue;
    }

    positional.push(arg);
  }

  const sitemapUrl = positional[0] || DEFAULT_SITEMAP_URL;

  if (!originOverride && positional[1] && /^https?:\/\//i.test(positional[1])) {
    originOverride = positional[1];
  }

  return {
    sitemapUrl,
    originOverride: originOverride || null,
  };
}

function toAuditedUrl(canonicalUrl, originOverride) {
  if (!originOverride) return canonicalUrl;

  const canonical = new URL(canonicalUrl);
  const origin = new URL(originOverride);
  canonical.protocol = origin.protocol;
  canonical.host = origin.host;
  return canonical.toString();
}

function extractLocs(xml) {
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map((match) => match[1]);
}

function extractTitle(html) {
  const match = html.match(/<title>(.*?)<\/title>/is);
  return match ? match[1].trim() : "";
}

function hasPattern(html, pattern) {
  return pattern.test(html);
}

async function run() {
  const { sitemapUrl, originOverride } = parseArgs(process.argv.slice(2));
  const sitemapResponse = await fetch(sitemapUrl);
  if (!sitemapResponse.ok) {
    throw new Error(`Could not fetch sitemap: ${sitemapResponse.status}`);
  }

  const sitemapXml = await sitemapResponse.text();
  const urls = extractLocs(sitemapXml);
  const summary = {
    sitemapUrl,
    auditedOrigin: originOverride,
    urlCount: urls.length,
    skippedNonHtml: [],
    redirected: [],
    non200: [],
    titleDuplicates: {},
    missingMetaDescription: [],
    missingCanonical: [],
    missingH1: [],
    headingSkips: [],
    missingRobotsMeta: [],
  };

  const titleMap = new Map();

  for (const canonicalUrl of urls) {
    const auditedUrl = toAuditedUrl(canonicalUrl, originOverride);
    const response = await fetch(auditedUrl);
    if (!response.ok) {
      summary.non200.push({
        canonicalUrl,
        auditedUrl,
        status: response.status,
      });
      continue;
    }

    if (response.redirected) {
      summary.redirected.push({
        canonicalUrl,
        auditedUrl,
        finalUrl: response.url,
        status: response.status,
      });

      const finalPathname = new URL(response.url).pathname;
      if (finalPathname.startsWith("/login")) {
        continue;
      }
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("text/html")) {
      summary.skippedNonHtml.push({
        canonicalUrl,
        auditedUrl,
        contentType,
      });
      continue;
    }

    const html = await response.text();
    const title = extractTitle(html);
    const current = titleMap.get(title) || [];
    current.push(canonicalUrl);
    titleMap.set(title, current);

    if (!hasPattern(html, /<meta[^>]+name=["']description["']/i)) {
      summary.missingMetaDescription.push(canonicalUrl);
    }
    if (!hasPattern(html, /<link[^>]+rel=["']canonical["']/i)) {
      summary.missingCanonical.push(canonicalUrl);
    }
    if (!hasPattern(html, /<meta[^>]+name=["']robots["']/i)) {
      summary.missingRobotsMeta.push(canonicalUrl);
    }

    const headings = Array.from(html.matchAll(/<h([1-6])\b/gi)).map((match) => Number(match[1]));
    if (!headings.includes(1)) {
      summary.missingH1.push(canonicalUrl);
    }

    for (let i = 1; i < headings.length; i += 1) {
      if (headings[i] - headings[i - 1] > 1) {
        summary.headingSkips.push(canonicalUrl);
        break;
      }
    }
  }

  for (const [title, values] of titleMap.entries()) {
    if (title && values.length > 1) {
      summary.titleDuplicates[title] = values;
    }
  }

  console.log(JSON.stringify(summary, null, 2));
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
