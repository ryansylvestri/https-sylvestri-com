import Link from "next/link";

import { LeadCaptureForm } from "@/components/lead-capture-form";
import { SectionHeading, SiteShell } from "@/components/site-shell";
import { coreLeadMagnets } from "@/lib/lead-magnets";
import { buildPageMetadata } from "@/lib/seo";
import { landingPageCategories, squeezePages } from "@/lib/site-content";

export const metadata = buildPageMetadata({
  title: "Squeeze Pages",
  description:
    "Quick-start squeeze pages for Hudson Valley buyers, sellers, investors, and homeowners who need a fast first conversion.",
  path: "/squeeze",
});

export default function SqueezeIndexPage() {
  const groupedPages = Object.entries(landingPageCategories).map(([key, label]) => ({
    key,
    label,
    pages: squeezePages.filter((page) => page.category === key),
  }));

  return (
    <SiteShell>
      <h1 className="sr-only">Squeeze Pages</h1>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Fast-entry pages"
          title="Short pages for people who need a low-friction first step."
          description="These squeeze pages are built to capture interest quickly, preserve intent, and hand the visitor into a deeper page only after they raise a hand."
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
                      href={`/squeeze/${page.slug}`}
                      className="rounded-[1.9rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-7 transition hover:border-brand-gold"
                    >
                      <h3 className="font-display text-3xl leading-tight text-brand-ink">
                        {page.title}
                      </h3>
                      <p className="mt-4 text-base leading-7 text-body-ink">
                        {page.subheadline}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <LeadCaptureForm
            title="Need help right now?"
            description="Fill out this form and Ryan can route you into the right deeper page or conversation without making you hunt for it."
            submitLabel="Route me correctly"
            source="squeeze-index"
            campaign="sylvestri-squeeze-library"
            defaultLeadType="agent-match"
            leadMagnetOptions={coreLeadMagnets}
          />
        </div>
      </section>
    </SiteShell>
  );
}
