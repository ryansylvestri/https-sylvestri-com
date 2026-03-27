import type { MetadataRoute } from "next";

import { caseStudies } from "@/lib/case-studies";
import { getPublishedContent } from "@/lib/content-engine";
import { guideSlugs } from "@/lib/guide-topics";
import { resourcePages } from "@/lib/resource-pages";
import { brandEntries, landingPages, siteConfig, squeezePages } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const now = new Date().toISOString();
  const engineResourceSlugs = new Set(
    getPublishedContent("resources").map((doc) => doc.slugParts[doc.slugParts.length - 1]),
  );

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
    { url: `${base}/docs`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/articles`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/resources`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/guides`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/lead-magnets`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/tools`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/kpi`, changeFrequency: "weekly" as const, priority: 0.4 },
    { url: `${base}/case-studies`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/podcast/feed.xml`, changeFrequency: "daily" as const, priority: 0.2 },
    { url: `${base}/monkeymaghees`, changeFrequency: "weekly" as const, priority: 0.8 },
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
  const resourceRoutes: MetadataRoute.Sitemap = resourcePages
    .filter((page) => !engineResourceSlugs.has(page.slug))
    .map((page) => ({
      url: `${base}/resources/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  function getFreshness(lastModified: string) {
    const ageInDays =
      (Date.now() - new Date(lastModified).getTime()) / (1000 * 60 * 60 * 24);
    if (ageInDays <= 14) {
      return { changeFrequency: "daily" as const, priority: 0.9 };
    }
    if (ageInDays <= 45) {
      return { changeFrequency: "weekly" as const, priority: 0.8 };
    }
    return { changeFrequency: "monthly" as const, priority: 0.7 };
  }

  const engineResourceRoutes: MetadataRoute.Sitemap = getPublishedContent("resources").map((doc) => ({
    ...getFreshness(doc.updatedAt),
    url: `${base}${doc.routePath}`,
    lastModified: doc.updatedAt,
  }));

  const docsRoutes: MetadataRoute.Sitemap = getPublishedContent("docs").map((doc) => ({
    ...getFreshness(doc.updatedAt),
    url: `${base}${doc.routePath}`,
    lastModified: doc.updatedAt,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getPublishedContent("articles").map((doc) => ({
    ...getFreshness(doc.updatedAt),
    url: `${base}${doc.routePath}`,
    lastModified: doc.updatedAt,
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

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((item) => ({
    url: `${base}/case-studies/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...landingRoutes,
    ...squeezeRoutes,
    ...resourceRoutes,
    ...engineResourceRoutes,
    ...docsRoutes,
    ...articleRoutes,
    ...brandRoutes,
    ...guideRoutes,
    ...caseStudyRoutes,
  ];
}
