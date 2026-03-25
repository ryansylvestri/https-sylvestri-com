import type { MetadataRoute } from "next";

import { resourcePages } from "@/lib/resource-pages";
import { brandEntries, landingPages, siteConfig, squeezePages } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/buyers",
    "/sellers",
    "/network",
    "/brands",
    "/landing",
    "/squeeze",
    "/resources",
    "/intake",
  ];

  return [
    ...routes.map((route) => ({
      url: `${siteConfig.siteUrl}${route || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...brandEntries.map((brand) => ({
      url: `${siteConfig.siteUrl}/brands/${brand.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...landingPages.map((page) => ({
      url: `${siteConfig.siteUrl}/landing/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...squeezePages.map((page) => ({
      url: `${siteConfig.siteUrl}/squeeze/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...resourcePages.map((page) => ({
      url: `${siteConfig.siteUrl}/resources/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
