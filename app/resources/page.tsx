import { ContentSearch } from "@/components/content-search";
import { PageHero, SiteShell } from "@/components/site-shell";
import { getPublishedContent } from "@/lib/content-engine";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Homeowner Resources",
  description:
    "Reviewed Hudson Valley homeowner resources and downloadable educational material from Ryan Sylvestri.",
  path: "/resources",
});

type ResourceCard = {
  id: string;
  title: string;
  routePath: string;
  category: string;
  summary: string;
  tags: string[];
  access: string;
};

function getResourceCards(): ResourceCard[] {
  const mdxResources = getPublishedContent("resources").map((doc) => ({
    id: doc.id,
    title: doc.title,
    routePath: doc.routePath,
    category: doc.category,
    summary: doc.summary,
    tags: doc.tags,
    access: doc.access,
  }));

  return mdxResources.filter((resource) => resource.access === "public");
}

export default function ResourcesIndex() {
  const cards = getResourceCards();

  return (
    <SiteShell>
      <PageHero
        eyebrow="Resources"
        title="Reviewed resources for practical property questions."
        description="Only complete, reviewed resources appear here. Draft and legacy campaign material stays out of public discovery until its claims and sources are checked."
        primaryCta={{ href: "/guides", label: "Browse guides" }}
        secondaryCta={{ href: "/intake", label: "Ask Ryan" }}
      />
      <section className="editorial-section">
        <div className="site-container">
          <div className="mt-8">
            <ContentSearch items={cards} emptyLabel="No reviewed public resources are available yet." />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
