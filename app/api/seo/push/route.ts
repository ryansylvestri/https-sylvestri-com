import { NextResponse } from "next/server";

import { validateN8nRequestAuth } from "@/lib/ops-contract";
import { pingSitemaps, pushUrls, seoPushPayloadSchema } from "@/lib/seo-ping";

export const runtime = "nodejs";

function json(payload: unknown, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const auth = validateN8nRequestAuth(request, rawBody);
  if (!auth.ok) {
    return json({ ok: false, message: auth.message }, auth.status);
  }

  let payload: unknown = {};
  if (rawBody.trim()) {
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return json({ ok: false, message: "Invalid JSON payload." }, 400);
    }
  }

  const parsed = seoPushPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Invalid SEO push payload.",
        issues: parsed.error.flatten(),
      },
      400,
    );
  }

  const [pushResults, sitemapResults] = await Promise.all([
    pushUrls(parsed.data.urls, parsed.data.dryRun),
    pingSitemaps(parsed.data.sitemapPaths, parsed.data.dryRun),
  ]);

  return json({
    ok: true,
    dryRun: parsed.data.dryRun,
    pushResults,
    sitemapResults,
  });
}
