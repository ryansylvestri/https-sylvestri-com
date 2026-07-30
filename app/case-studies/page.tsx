import Link from "next/link";

import { SiteShell } from "@/components/site-shell";
import { caseStudies } from "@/lib/case-studies";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Case Studies",
  description:
    "Three practical examples showing how Ryan handles probate, divorce, and relocation decision paths.",
  path: "/case-studies",
  noIndex: true,
});

export default function CaseStudiesIndexPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-copper">
          Case studies
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-brand-ink md:text-6xl">
          Real situations, clear process, measurable outcomes
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-body-ink">
          These short cases show how high-stakes transactions are handled with structure, not
          guesswork.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {caseStudies.map((item) => (
            <Link
              key={item.slug}
              href={`/case-studies/${item.slug}`}
              className="rounded-[1.9rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-7 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition hover:border-brand-gold"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-copper">
                {item.lane}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-brand-ink">{item.title}</h2>
              <p className="mt-4 text-base leading-7 text-body-ink">{item.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
