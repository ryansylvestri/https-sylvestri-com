import "server-only";

import { z } from "zod";

import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site-content";

const optionalUrlArray = z.array(z.string().trim().min(1)).optional().default([]);

export const seoPushPayloadSchema = z.object({
  urls: optionalUrlArray,
  sitemapPaths: optionalUrlArray,
  dryRun: z.boolean().optional().default(false),
});

export const seoPingPayloadSchema = z.object({
  sitemapPaths: optionalUrlArray,
  dryRun: z.boolean().optional().default(false),
});

export type SeoServiceResult = {
  service: string;
  target: string;
  ok: boolean;
  status: number | null;
  message: string;
};

function normalizeAbsoluteUrl(value: string): string {
  return /^https?:\/\//i.test(value) ? value : absoluteUrl(value);
}

async function fetchResult(service: string, target: string, input: string, init?: RequestInit) {
  try {
    const response = await fetch(input, init);
    return {
      service,
      target,
      ok: response.ok,
      status: response.status,
      message: response.ok ? "accepted" : `upstream returned ${response.status}`,
    } satisfies SeoServiceResult;
  } catch (error) {
    return {
      service,
      target,
      ok: false,
      status: null,
      message: error instanceof Error ? error.message : "request failed",
    } satisfies SeoServiceResult;
  }
}

export async function pingSitemaps(
  sitemapPaths: string[],
  dryRun: boolean,
): Promise<SeoServiceResult[]> {
  const targets = (sitemapPaths.length > 0 ? sitemapPaths : ["/sitemap.xml", "/sitemap-content.xml"]).map(
    normalizeAbsoluteUrl,
  );

  if (dryRun) {
    return targets.map((target) => ({
      service: "dry-run",
      target,
      ok: true,
      status: 200,
      message: "sitemap ping skipped in dry-run mode",
    }));
  }

  const results: SeoServiceResult[] = [];

  for (const target of targets) {
    results.push(
      await fetchResult(
        "bing-sitemap",
        target,
        `https://www.bing.com/ping?sitemap=${encodeURIComponent(target)}`,
      ),
    );
  }

  const gscEndpoint = process.env.GSC_PING_ENDPOINT?.trim();
  if (gscEndpoint) {
    results.push(
      await fetchResult(
        "gsc-helper",
        gscEndpoint,
        gscEndpoint,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.GSC_PING_TOKEN
              ? { Authorization: `Bearer ${process.env.GSC_PING_TOKEN}` }
              : {}),
          },
          body: JSON.stringify({
            siteUrl: siteConfig.siteUrl,
            sitemaps: targets,
          }),
        },
      ),
    );
  } else {
    results.push({
      service: "gsc-helper",
      target: "not-configured",
      ok: true,
      status: null,
      message: "GSC_PING_ENDPOINT is not configured; skipped helper call",
    });
  }

  return results;
}

export async function pushUrls(
  urls: string[],
  dryRun: boolean,
): Promise<SeoServiceResult[]> {
  const targets = urls.map(normalizeAbsoluteUrl);

  if (targets.length === 0) {
    return [
      {
        service: "indexnow",
        target: "none",
        ok: true,
        status: null,
        message: "No URLs were supplied for push.",
      },
    ];
  }

  if (dryRun) {
    return targets.map((target) => ({
      service: "dry-run",
      target,
      ok: true,
      status: 200,
      message: "URL push skipped in dry-run mode",
    }));
  }

  const indexNowKey = process.env.INDEXNOW_KEY?.trim();
  if (!indexNowKey) {
    return [
      {
        service: "indexnow",
        target: "not-configured",
        ok: true,
        status: null,
        message: "INDEXNOW_KEY is not configured; skipped IndexNow push",
      },
    ];
  }

  const host = process.env.INDEXNOW_HOST?.trim() || new URL(siteConfig.siteUrl).host;
  const keyLocation = process.env.INDEXNOW_KEY_LOCATION?.trim();

  return [
    await fetchResult(
      "indexnow",
      host,
      "https://api.indexnow.org/indexnow",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          host,
          key: indexNowKey,
          keyLocation,
          urlList: targets,
        }),
      },
    ),
  ];
}
