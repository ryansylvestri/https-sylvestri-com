import { ContentSearch } from "@/components/content-search";
import { SectionHeading, SiteShell } from "@/components/site-shell";
import { getPublishedContent } from "@/lib/content-engine";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Docs",
  description: "Reference docs, playbooks, and operating notes from the Sylvestri platform.",
  path: "/docs",
});

export default function DocsIndexPage() {
  const docs = getPublishedContent("docs");

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <h1 className="sr-only">Docs</h1>
        <SectionHeading
          eyebrow="Docs"
          title="Reference docs for the publishing and systems stack"
          description="This is the in-app documentation layer for repeatable playbooks, implementation notes, and operating guidance."
        />
        <div className="mt-10">
          <ContentSearch
            items={docs.map((doc) => ({
              id: doc.id,
              title: doc.title,
              routePath: doc.routePath,
              category: doc.category,
              summary: doc.summary,
              tags: doc.tags,
              access: doc.access,
            }))}
            emptyLabel="No docs are published yet."
          />
        </div>
      </section>
    </SiteShell>
  );
}
