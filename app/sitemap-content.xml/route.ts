import { getPublishedContent } from "@/lib/content-engine";
import { absoluteUrl } from "@/lib/seo";

export const runtime = "nodejs";

function createUrlEntry(url: string, lastModified: string, changefreq: string, priority: number) {
  return [
    "<url>",
    `<loc>${url}</loc>`,
    `<lastmod>${new Date(lastModified).toISOString()}</lastmod>`,
    `<changefreq>${changefreq}</changefreq>`,
    `<priority>${priority.toFixed(1)}</priority>`,
    "</url>",
  ].join("");
}

export async function GET() {
  const resources = getPublishedContent("resources").map((doc) =>
    createUrlEntry(absoluteUrl(doc.routePath), doc.updatedAt, "daily", 0.9),
  );
  const articles = getPublishedContent("articles").map((doc) =>
    createUrlEntry(absoluteUrl(doc.routePath), doc.updatedAt, "daily", 0.9),
  );
  const docs = getPublishedContent("docs").map((doc) =>
    createUrlEntry(absoluteUrl(doc.routePath), doc.updatedAt, "weekly", 0.7),
  );

  const xml = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ...articles,
    ...resources,
    ...docs,
    "</urlset>",
  ].join("");

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
    },
  });
}
