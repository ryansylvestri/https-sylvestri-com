import Link from "next/link";

import { PageHero, SiteShell } from "@/components/site-shell";
import { getPublishedContent, type ContentDocument } from "@/lib/content-engine";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "AI News, Tools, Experiments, and Ideas",
  description:
    "Plain-English AI reporting, practical tutorials, experiments, builds, and useful ideas from Ryan Sylvestri.",
  path: "/ai",
});

const sections = [
  {
    id: "ai-news",
    title: "AI News",
    kind: "news",
    description: "Reported changes with sources, context, and a clear explanation of why they matter.",
  },
  {
    id: "tools-tutorials",
    title: "Tools & Tutorials",
    kind: "tutorial",
    description: "Practical walkthroughs that state their inputs, limits, and the result they are meant to produce.",
  },
  {
    id: "experiments-builds",
    title: "Experiments & Builds",
    kind: "experiment",
    description: "Working notes from prototypes and systems, including what failed or remains unresolved.",
  },
  {
    id: "useful-ideas",
    title: "Useful Ideas",
    kind: "idea",
    description: "Short concepts that can make real work clearer, more repeatable, or easier to examine.",
  },
] as const;

function cardsForKind(articles: ContentDocument[], kind: string) {
  return articles.filter((article) => article.contentKind === kind).slice(0, 3);
}

export default function AIPage() {
  const articles = getPublishedContent("articles");

  return (
    <SiteShell>
      <PageHero
        eyebrow="AI & Ideas"
        title="Plain-English reporting and practical work with new tools."
        description="A reviewed collection of AI news, tutorials, experiments, builds, and ideas. Reported facts link to sources; experiments are labeled as experiments."
        primaryCta={{ href: "#ai-news", label: "Explore the sections" }}
        secondaryCta={{ href: "/articles", label: "View all stories" }}
      />
      <nav aria-label="Breadcrumb" className="site-container py-5 text-xs text-muted-ink">
        <Link href="/" className="hover:text-brand-copper">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">AI & Ideas</span>
      </nav>

      {sections.map((section, index) => {
        const cards = cardsForKind(articles, section.kind);
        return (
          <section
            key={section.id}
            id={section.id}
            className={`editorial-section scroll-mt-24 ${index % 2 ? "bg-[#f4ede3]" : ""}`}
          >
            <div className="site-container">
              <p className="eyebrow">0{index + 1} / AI & Ideas</p>
              <div className="mt-4 grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
                <h2 className="section-title">{section.title}</h2>
                <p className="section-copy">{section.description}</p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-3">
                {cards.length ? cards.map((article) => (
                  <article key={article.slug} className="editorial-card">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-copper">{article.category}</p>
                    <h3 className="mt-3 font-display text-2xl leading-tight text-brand-ink">
                      <Link href={article.routePath} className="hover:text-brand-copper">{article.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-body-ink">{article.summary}</p>
                  </article>
                )) : (
                  <p className="md:col-span-3 border-t border-[rgba(20,32,51,0.18)] pt-5 text-sm leading-7 text-muted-ink">
                    No reviewed {section.title.toLowerCase()} entries are published yet.
                  </p>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </SiteShell>
  );
}
