import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { RevealSection } from "@/components/reveal-section";
import { PageHero, SectionHeading, SiteShell } from "@/components/site-shell";
import {
  guideCategoryLabels,
  guideTopics,
  type GuideTopic,
} from "@/lib/guide-topics";
import { siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Real Estate Guides — Hudson Valley",
  description:
    "Free educational guides covering buying, selling, investing, relocation, and every situation-specific topic for Hudson Valley real estate.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndex() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hudson Valley Real Estate Guides",
    description: metadata.description,
    url: `${siteConfig.siteUrl}/guides`,
  };

  const grouped = guideTopics.reduce<
    Record<GuideTopic["category"], GuideTopic[]>
  >(
    (acc, topic) => {
      acc[topic.category].push(topic);
      return acc;
    },
    { buyer: [], seller: [], investor: [], lifestyle: [], process: [], systems: [] },
  );

  return (
    <SiteShell>
      <JsonLd data={schema} />

      <PageHero
        eyebrow="Guides"
        title="Real estate guides built for the Hudson Valley"
        description="Each guide covers one topic in depth — the kind of clear, specific answers that help you move forward with confidence instead of guessing."
        primaryCta={{ href: "/intake", label: "Start here" }}
        secondaryCta={{ href: "/landing", label: "Landing pages" }}
      />

      <section className="mx-auto max-w-7xl px-6 py-18">
        <div className="space-y-16">
          {(
            Object.entries(grouped) as [GuideTopic["category"], GuideTopic[]][]
          )
            .filter(([, topics]) => topics.length > 0)
            .map(([cat, topics], gi) => (
              <RevealSection key={cat} delay={gi * 80}>
                <SectionHeading
                  eyebrow={guideCategoryLabels[cat]}
                  title={`${topics.length} guide${topics.length > 1 ? "s" : ""}`}
                  description=""
                />
                <div className="mt-8 grid gap-6 lg:grid-cols-2">
                  {topics.map((topic, ti) => (
                    <RevealSection
                      key={topic.slug}
                      delay={ti * 70}
                      direction="scale"
                    >
                      <Link
                        href={`/guides/${topic.slug}`}
                        className="group block rounded-[1.9rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-7 transition hover:border-brand-gold"
                      >
                        <h3 className="font-display text-2xl leading-tight text-brand-ink transition group-hover:text-brand-gold">
                          {topic.title}
                        </h3>
                        <p className="mt-3 text-base leading-7 text-body-ink">
                          {topic.description}
                        </p>
                      </Link>
                    </RevealSection>
                  ))}
                </div>
              </RevealSection>
            ))}
        </div>
      </section>
    </SiteShell>
  );
}
