import Link from "next/link";

import { ContentSearch } from "@/components/content-search";
import { SectionHeading, SiteShell } from "@/components/site-shell";
import { getPublishedContent } from "@/lib/content-engine";
import { resourcePages } from "@/lib/resource-pages";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-content";

export const metadata = buildPageMetadata({
  title: "Homeowner Resources",
  description:
    "In-depth guides for Hudson Valley homeowners navigating divorce sales, probate, foreclosure, tax liens, downsizing, relocation, and more. Free resources from Ryan Sylvestri.",
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

  const migratedSlugs = new Set(mdxResources.map((item) => item.routePath.split("/").pop()));
  const legacyResources = resourcePages
    .filter((page) => !migratedSlugs.has(page.slug))
    .map((page) => ({
      id: `legacy:${page.slug}`,
      title: page.heroHeadline,
      routePath: `/resources/${page.slug}`,
      category: page.tag,
      summary: page.heroSubheadline,
      tags: [page.tag],
      access: "public",
    }));

  return [...mdxResources, ...legacyResources];
}

export default function ResourcesIndex() {
  const cards = getResourceCards();

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-copper">
            Homeowner Resources
          </p>
          <h1 className="font-display text-5xl leading-none text-balance text-brand-ink md:text-7xl">
            Information for every situation
          </h1>
          <p className="max-w-3xl text-xl leading-9 text-body-ink">
            This route now runs on a hybrid model. Migrated resources come from the new MDX engine,
            while untouched slugs still resolve from the legacy content registry.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/docs"
            className="rounded-full border border-[rgba(15,23,42,0.12)] bg-white/70 px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-gold"
          >
            Browse docs
          </Link>
          <a
            href={siteConfig.phoneHref}
            data-track-event="cta_click_call"
            data-track-label="resources-index-call"
            className="rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-copper"
          >
            Call {siteConfig.phone}
          </a>
        </div>

        <div className="mt-10">
          <SectionHeading
            eyebrow="Resources"
            title="Hybrid migration inventory"
            description="Search across migrated MDX resources and the legacy resource library while the transition stays incremental."
          />
          <div className="mt-8">
            <ContentSearch items={cards} emptyLabel="No resources are available yet." />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
