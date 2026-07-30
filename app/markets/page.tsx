import Link from "next/link";

import { PageHero, SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Hudson Valley Markets",
  description:
    "A responsible starting point for researching Hudson Valley real estate markets without invented neighborhood claims.",
  path: "/markets",
});

const researchLenses = [
  ["Housing fit", "Property type, condition, ownership costs, availability, and the records that still need verification."],
  ["Daily movement", "Actual travel times, work patterns, transit options, and seasonal conditions tested against your routine."],
  ["Services and access", "The practical locations and services important to your household, verified directly rather than generalized."],
  ["Future decisions", "How long you expect to stay, what could change, and which property or location tradeoffs matter most."],
];

export default function MarketsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Hudson Valley markets"
        title="Research the place as carefully as the property."
        description="The Hudson Valley is varied. Start with the questions that shape daily life, then verify current property, travel, service, and local information from direct sources."
        primaryCta={{ href: "/guides", label: "Explore guides" }}
        secondaryCta={{ href: "/intake", label: "Ask Ryan" }}
      />
      <nav aria-label="Breadcrumb" className="site-container py-5 text-xs text-muted-ink">
        <Link href="/" className="hover:text-brand-copper">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Markets</span>
      </nav>
      <section className="editorial-section">
        <div className="site-container">
          <p className="eyebrow">Research framework</p>
          <h2 className="section-title mt-4">Four lenses for a more useful comparison.</h2>
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
            {researchLenses.map(([title, copy], index) => (
              <article key={title} className="editorial-card">
                <span className="text-xs font-bold text-brand-copper">0{index + 1}</span>
                <h2 className="mt-3 font-display text-3xl text-brand-ink">{title}</h2>
                <p className="mt-4 text-base leading-8 text-body-ink">{copy}</p>
              </article>
            ))}
          </div>
          <p className="mt-12 max-w-3xl border-l-2 border-brand-copper pl-5 text-sm leading-7 text-body-ink">
            Market pages will be added only when their claims can be supported by current, direct sources. This page does not rank places or characterize residents.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
