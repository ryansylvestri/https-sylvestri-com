import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import { getPublishedContent } from "@/lib/content-engine";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Stories, Guides, Experiments, and Updates",
  description:
    "Reviewed stories, guides, tutorials, experiments, ideas, and reported updates from Ryan Sylvestri.",
  path: "/articles",
});

export default function ArticlesIndexPage() {
  const articles = getPublishedContent("articles");

  return (
    <SiteShell>
      <section className="editorial-section">
        <div className="site-container">
          <p className="eyebrow">Stories</p>
          <h1 className="page-title mt-5">Stories, guides, experiments, and updates.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-body-ink">
            Published entries pass the editorial review gate. Factual and time-sensitive work
            includes sources; experiments and opinion are labeled for what they are.
          </p>
        </div>
      </section>
      <nav aria-label="Breadcrumb" className="site-container py-5 text-xs text-muted-ink">
        <Link href="/" className="hover:text-brand-copper">Home</Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span aria-current="page">Stories</span>
      </nav>
      <section className="editorial-section pt-10">
        <div className="site-container">
          {articles.length ? (
            <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article key={article.id} className="editorial-card">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-copper">
                    {article.contentKind} / {article.category}
                  </p>
                  <h2 className="mt-4 font-display text-3xl leading-tight text-brand-ink">
                    <Link href={article.routePath} className="hover:text-brand-copper">{article.title}</Link>
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-body-ink">{article.summary}</p>
                  <p className="mt-5 text-xs text-muted-ink">
                    {new Date(article.publishedAt).toLocaleDateString("en-US")}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <p className="text-body-ink">No reviewed articles are published yet.</p>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
