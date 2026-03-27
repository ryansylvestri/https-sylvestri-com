import { NextResponse } from "next/server";

import { validateN8nRequestAuth } from "@/lib/ops-contract";
import { pingSitemaps, seoPingPayloadSchema } from "@/lib/seo-ping";

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

  const parsed = seoPingPayloadSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Invalid SEO ping payload.",
        issues: parsed.error.flatten(),
      },
      400,
    );
  }

  const results = await pingSitemaps(parsed.data.sitemapPaths, parsed.data.dryRun);

  return json({
    ok: true,
    dryRun: parsed.data.dryRun,
    results,
  });
}
