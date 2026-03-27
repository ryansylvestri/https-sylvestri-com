import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const DEFAULT_SITE_URL = "https://sylvestri.com";

type PodcastAssetRow = {
  id: number;
  secure_url: string;
  bytes: number | null;
  format: string | null;
  created_at: string;
  context: Record<string, unknown> | null;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function inferMimeFromFormat(format: string | null) {
  if (!format) return "audio/mpeg";
  const normalized = format.toLowerCase();
  if (normalized === "mp3") return "audio/mpeg";
  if (normalized === "m4a") return "audio/mp4";
  if (normalized === "wav") return "audio/wav";
  if (normalized === "ogg" || normalized === "oga") return "audio/ogg";
  return "audio/mpeg";
}

function getContextValue(context: Record<string, unknown> | null, key: string) {
  const value = context?.[key];
  return typeof value === "string" ? value : "";
}

function buildFeed(items: PodcastAssetRow[], siteUrl: string) {
  const channelTitle = "Ryan Sylvestri Podcast";
  const channelDescription =
    "Applied real estate, systems, and AI conversations from the Sylvestri platform.";

  const xmlItems = items
    .map((item) => {
      const title = getContextValue(item.context, "title") || `Episode ${item.id}`;
      const description =
        getContextValue(item.context, "description") ||
        "Podcast episode published from the Sylvestri media pipeline.";
      const guid = `${siteUrl}/podcast/episodes/${item.id}`;
      const pubDate = new Date(
        getContextValue(item.context, "publishedAt") || item.created_at,
      ).toUTCString();
      const length = item.bytes ?? 0;
      const mime = inferMimeFromFormat(item.format);

      return [
        "<item>",
        `<title>${escapeXml(title)}</title>`,
        `<description>${escapeXml(description)}</description>`,
        `<guid isPermaLink="false">${escapeXml(guid)}</guid>`,
        `<pubDate>${escapeXml(pubDate)}</pubDate>`,
        `<enclosure url="${escapeXml(item.secure_url)}" length="${length}" type="${mime}" />`,
        "</item>",
      ].join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">',
    "<channel>",
    `<title>${escapeXml(channelTitle)}</title>`,
    `<link>${escapeXml(siteUrl)}</link>`,
    `<description>${escapeXml(channelDescription)}</description>`,
    `<language>en-us</language>`,
    `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `<itunes:author>${escapeXml("Ryan Sylvestri")}</itunes:author>`,
    `<itunes:explicit>false</itunes:explicit>`,
    xmlItems,
    "</channel>",
    "</rss>",
  ].join("");
}

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return new NextResponse(buildFeed([], siteUrl), {
      headers: {
        "content-type": "application/rss+xml; charset=utf-8",
        "cache-control": "public, s-maxage=300, stale-while-revalidate=900",
      },
    });
  }

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
  const { data, error } = await client
    .from("assets")
    .select("id, secure_url, bytes, format, created_at, context")
    .eq("kind", "podcast")
    .eq("status", "ready")
    .eq("access", "public")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return new NextResponse(buildFeed((data || []) as PodcastAssetRow[], siteUrl), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=900",
    },
  });
}
