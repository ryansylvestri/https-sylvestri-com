import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-content";
import { noIndexRoutePrefixes } from "@/lib/canonical-routes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", ...noIndexRoutePrefixes],
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
