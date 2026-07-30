import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { PageHero, SiteShell } from "@/components/site-shell";
import { guideTopics } from "@/lib/guide-topics";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Hudson Valley Real Estate and Homeownership Guides",
  description:
    "Educational guides for Hudson Valley buyers, sellers, homeowners, property maintenance, and market research.",
  path: "/guides",
});

const sections = [
  {
    id: "buyer-guides",
    title: "Buyer Guides",
    description: "Prepare for financing, the search, inspections, contracts, and closing.",
    slugs: ["buyers", "first-time", "inspection", "closing"],
  },
  {
    id: "seller-guides",
    title: "Seller Guides",
    description: "Understand preparation, pricing context, presentation, negotiation, and the next move.",
    slugs: ["sellers", "valuation", "staging", "negotiation"],
  },
  {
    id: "homeownership",
    title: "Homeownership",
    description: "Resources for decisions that continue after a purchase or before a future move.",
    slugs: ["downsizing", "inherited", "renters"],
  },
  {
    id: "property-maintenance",
    title: "Property Maintenance",
    description: "Use property condition and documentation to prepare better questions for qualified professionals.",
    slugs: ["inspection", "vacant", "code-violation"],
  },
  {
    id: "market-updates",
    title: "Market Updates",
    description: "Market and investing context that should always be checked against current sources.",
    slugs: ["market", "investors", "river-town", "relocation"],
  },
];

export default function GuidesIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hudson Valley Real Estate and Homeownership Guides",
    url: "https://sylvestri.com/guides",
  };

  return (
    <SiteShell>
      <JsonLd data={schema} />
      <PageHero
        eyebrow="Learn"
        title="Practical guides for owning and moving."
        description="Start with a focused topic, note what is time-sensitive, and use the guide to prepare the next questions for your property or move."
        primaryCta={{ href: "#buyer-guides", label: "Browse guides" }}
        secondaryCta={{ href: "/intake", label: "Ask Ryan" }}
      />
      <nav aria-label="Breadcrumb" className="site-container py-5 text-xs text-muted-ink">
        <Link href="/" className="hover:text-brand-copper">Home</Link>{" "}
        <span aria-hidden="true">/</span>{" "}
        <span aria-current="page">Guides</span>
      </nav>
      {sections.map((section, index) => {
        const topics = section.slugs
          .map((slug) => guideTopics.find((guide) => guide.slug === slug))
          .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));
        return (
          <section
            key={section.id}
            id={section.id}
            className={`editorial-section scroll-mt-24 ${index % 2 ? "bg-[#f4ede3]" : ""}`}
          >
            <div className="site-container">
              <p className="eyebrow">0{index + 1} / Learn</p>
              <div className="mt-4 grid gap-7 lg:grid-cols-[0.75fr_1.25fr]">
                <h2 className="section-title">{section.title}</h2>
                <p className="section-copy">{section.description}</p>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-2">
                {topics.map((topic) => (
                  <article key={topic.slug} className="editorial-card">
                    <h3 className="font-display text-2xl leading-tight text-brand-ink">
                      <Link href={`/guides/${topic.slug}`} className="hover:text-brand-copper">{topic.title}</Link>
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-body-ink">{topic.description}</p>
                    <Link href={`/guides/${topic.slug}`} className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.14em] text-brand-copper">
                      Read guide →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </SiteShell>
  );
}
