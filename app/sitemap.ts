import type { MetadataRoute } from "next";

import { guideSlugs } from "@/lib/guide-topics";
import { resourcePages } from "@/lib/resource-pages";
import { brandEntries, landingPages, siteConfig, squeezePages } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const now = new Date().toISOString();

  /* ── Static pages ── */
  const staticEntries = [
    { url: `${base}/`, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${base}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/story`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/buyers`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/sellers`, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${base}/investors`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/renters`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/ai`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/brands`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/network`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/intake`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/landing`, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${base}/squeeze`, changeFrequency: "weekly" as const, priority: 0.6 },
    { url: `${base}/resources`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/guides`, changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticEntries.map((entry) => ({
    ...entry,
    lastModified: now,
  }));

  /* ── Landing pages ── */
  const landingRoutes: MetadataRoute.Sitemap = landingPages.map((page) => ({
    url: `${base}/landing/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  /* ── Squeeze pages ── */
  const squeezeRoutes: MetadataRoute.Sitemap = squeezePages.map((page) => ({
    url: `${base}/squeeze/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  /* ── Resource pages ── */
  const resourceRoutes: MetadataRoute.Sitemap = resourcePages.map((page) => ({
    url: `${base}/resources/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /* ── Brand detail pages ── */
  const brandRoutes: MetadataRoute.Sitemap = brandEntries.map((brand) => ({
    url: `${base}/brands/${brand.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  /* ── Guide pages ── */
  const guideRoutes: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${base}/guides/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...landingRoutes,
    ...squeezeRoutes,
    ...resourceRoutes,
    ...brandRoutes,
    ...guideRoutes,
  ];
}
