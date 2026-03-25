import type { Metadata } from "next";
import Link from "next/link";

import { LeadCaptureForm } from "@/components/lead-capture-form";
import { SectionHeading, SiteShell } from "@/components/site-shell";
import { landingPageCategories, landingPages } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Landing Pages",
  description:
    "In-depth landing pages for buyers, sellers, investors, and homeowners navigating complex situations in the Hudson Valley.",
};

export default function LandingIndexPage() {
  const groupedPages = Object.entries(landingPageCategories).map(([key, label]) => ({
    key,
    label,
    pages: landingPages.filter((page) => page.category === key),
  }));

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Landing-page library"
          title="Specific pages convert better than generic promises."
          description="These pages are built for real situations, real intent, and one obvious next step. Find the page that matches the visitor before the signal goes cold."
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="space-y-12">
            {groupedPages.map((group) => (
              <div key={group.key} className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="font-display text-4xl text-brand-ink">{group.label}</h2>
                  <span className="rounded-full border border-[rgba(15,23,42,0.12)] px-4 py-2 text-sm font-semibold text-body-ink">
                    {group.pages.length} pages
                  </span>
                </div>
                <div className="grid gap-6 xl:grid-cols-2">
                  {group.pages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/landing/${page.slug}`}
                      className="rounded-[1.9rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-7 transition hover:border-brand-gold"
                    >
                      <h3 className="font-display text-3xl leading-tight text-brand-ink">
                        {page.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-body-ink">
                        {page.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <LeadCaptureForm
            title="Need the right page?"
            description="Tell Ryan what you are trying to do and he can point you to the best-fit next step instead of the wrong funnel."
            submitLabel="Help me choose"
            source="landing-index"
            campaign="sylvestri-landing-library"
          />
        </div>
      </section>
    </SiteShell>
  );
}
