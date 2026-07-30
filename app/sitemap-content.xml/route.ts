import { getPublishedContent } from "@/lib/content-engine";
import { absoluteUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const revalidate = 600;

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const entries = (["articles", "resources"] as const).flatMap((section) =>
    getPublishedContent(section)
      .filter((doc) => doc.access === "public")
      .map((doc) => [
        "<url>",
        `<loc>${escapeXml(absoluteUrl(doc.routePath))}</loc>`,
        `<lastmod>${escapeXml(new Date(doc.updatedAt).toISOString())}</lastmod>`,
        "<changefreq>monthly</changefreq>",
        "</url>",
      ].join("")),
  );

  return new Response(
    [
      "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
      "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
      ...entries,
      "</urlset>",
    ].join(""),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "X-Robots-Tag": "noindex",
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
      },
    },
  );
}
