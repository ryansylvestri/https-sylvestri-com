import type { MetadataRoute } from "next";

import { canonicalPublicRoutes } from "@/lib/canonical-routes";
import { getPublishedContent } from "@/lib/content-engine";
import { guideTopics } from "@/lib/guide-topics";
import { siteConfig } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const lastModified = "2026-07-30";

  const staticRoutes: MetadataRoute.Sitemap = canonicalPublicRoutes.map((route) => ({
    url: new URL(route, base).toString(),
    lastModified,
    changeFrequency: route === "/" || route === "/articles" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/intake" ? 0.5 : 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = guideTopics
  .filter((guide) => Boolean(guide.reviewedAt))
  .map((guide) => ({
    url: new URL(`/guides/${guide.slug}`, base).toString(),
    lastModified: guide.reviewedAt || lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getPublishedContent("articles")
    .filter((doc) => doc.access === "public")
    .map((doc) => ({
      url: new URL(doc.routePath, base).toString(),
      lastModified: doc.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const resourceRoutes: MetadataRoute.Sitemap = getPublishedContent("resources")
    .filter((doc) => doc.access === "public")
    .map((doc) => ({
      url: new URL(doc.routePath, base).toString(),
      lastModified: doc.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...staticRoutes, ...guideRoutes, ...articleRoutes, ...resourceRoutes];
}
