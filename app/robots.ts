import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/account", "/auth/", "/api/", "/kpi", "/thank-you"],
      },
    ],
    sitemap: [`${siteConfig.siteUrl}/sitemap.xml`, `${siteConfig.siteUrl}/sitemap-content.xml`],
  };
}
