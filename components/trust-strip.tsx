import Link from "next/link";

import { siteConfig } from "@/lib/site-content";

const trustItems = [
  "ABR + PSA designations",
  "Hudson Valley market coverage",
  "Structured same-day intake routing",
  "24-hour response standard",
];

export function TrustStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-6 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-copper">
              Trust signals
            </p>
            <p className="mt-2 text-sm leading-7 text-body-ink">
              Licensed Associate RE Broker, RE/MAX Town &amp; Country, and a workflow-first service
              model built for clear follow-through.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {trustItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.92)] px-4 py-2 text-sm font-semibold text-brand-ink"
              >
                {item}
              </span>
            ))}
            <a
              href={siteConfig.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[rgba(15,23,42,0.12)] bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
            >
              View Google Reviews
            </a>
            <Link
              href="/lead-magnets"
              className="rounded-full border border-[rgba(15,23,42,0.12)] bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
            >
              Get Free Guides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
