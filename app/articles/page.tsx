import { ContentSearch } from "@/components/content-search";
import { SectionHeading, SiteShell } from "@/components/site-shell";
import { getPublishedContent } from "@/lib/content-engine";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Articles",
  description: "Long-form articles and essays published from the shared MDX content engine.",
  path: "/articles",
});

export default function ArticlesIndexPage() {
  const articles = getPublishedContent("articles");

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <h1 className="sr-only">Articles</h1>
        <SectionHeading
          eyebrow="Articles"
          title="Long-form articles built on the new publishing engine"
          description="Articles are the new long-form destination for content that sits outside the current guide system."
        />
        <div className="mt-10">
          <ContentSearch
            items={articles.map((doc) => ({
              id: doc.id,
              title: doc.title,
              routePath: doc.routePath,
              category: doc.category,
              summary: doc.summary,
              tags: doc.tags,
              access: doc.access,
            }))}
            emptyLabel="No articles are published yet."
          />
        </div>
      </section>
    </SiteShell>
  );
}
