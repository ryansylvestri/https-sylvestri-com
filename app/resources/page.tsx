import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading, SiteShell } from "@/components/site-shell";
import { resourcePages } from "@/lib/resource-pages";
import { siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Homeowner Resources",
  description:
    "In-depth guides for Hudson Valley homeowners navigating divorce sales, probate, foreclosure, tax liens, downsizing, relocation, and more. Free resources from Ryan Sylvestri.",
  alternates: { canonical: "/resources" },
};

const tagLabels: Record<string, string> = {
  distressed: "Financial Distress",
  "life-event": "Life Events",
  lifestyle: "Lifestyle Moves",
  property: "Property Situations",
  market: "Market Challenges",
};

const tagIcons: Record<string, string> = {
  distressed: "⚠️",
  "life-event": "💙",
  lifestyle: "🏡",
  property: "🏚️",
  market: "📊",
};

const uniqueTags = [...new Set(resourcePages.map((p) => p.tag))];

export default function ResourcesIndex() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-copper">
            Homeowner Resources
          </p>
          <h1 className="font-display text-5xl leading-none text-balance text-brand-ink md:text-7xl">
            Information for Every Situation
          </h1>
          <p className="max-w-3xl text-xl leading-9 text-body-ink">
            Whether you are facing foreclosure, going through a divorce,
            relocating for work, or simply ready to downsize — we have a
            detailed guide for your exact situation. No pressure, no sales
            pitch — just the information you need to make the right decision.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {uniqueTags.map((tag) => (
            <a
              key={tag}
              href={`#${tag}`}
              className="rounded-full border border-[rgba(15,23,42,0.1)] bg-white/70 px-4 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
            >
              {tagIcons[tag]} {tagLabels[tag]}
            </a>
          ))}
        </div>
      </section>

      {uniqueTags.map((tag) => {
        const pages = resourcePages.filter((p) => p.tag === tag);
        return (
          <section
            key={tag}
            id={tag}
            className="mx-auto max-w-7xl px-6 py-16"
          >
            <SectionHeading
              eyebrow={`${tagIcons[tag]} ${tagLabels[tag]}`}
              title={`${tagLabels[tag]} Resources`}
              description={`Guides for homeowners dealing with ${tagLabels[tag].toLowerCase()} situations in the Hudson Valley.`}
            />

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/resources/${page.slug}`}
                  className="group rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/80 p-8 transition hover:border-brand-gold hover:shadow-[0_16px_60px_rgba(15,23,42,0.07)]"
                >
                  <h3 className="font-display text-xl leading-tight text-brand-ink transition group-hover:text-brand-copper">
                    {page.heroHeadline}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-body-ink">
                    {page.heroSubheadline.slice(0, 140)}…
                  </p>
                  <p className="mt-4 text-sm font-semibold text-brand-copper">
                    Read the full guide →
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="font-display text-3xl text-brand-ink md:text-4xl">
          Not Sure Which Guide Fits Your Situation?
        </h2>
        <p className="mt-4 text-lg leading-8 text-body-ink">
          Call Ryan directly for a confidential conversation about
          your options. No obligation, no pressure.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={siteConfig.phoneHref}
            className="rounded-full bg-brand-ink px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.16)] transition hover:bg-brand-copper"
          >
            Call {siteConfig.phone}
          </a>
          <a
            href={siteConfig.emailHref}
            className="rounded-full border border-[rgba(15,23,42,0.12)] bg-white/70 px-8 py-4 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
          >
            Email Ryan
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
