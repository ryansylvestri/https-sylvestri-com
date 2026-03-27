import Link from "next/link";
import { Suspense } from "react";

import { ThankYouTracker } from "@/components/thank-you-tracker";
import { SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Thank You",
  description:
    "Ryan received your details. The next step is already queued with source context for faster routing.",
  path: "/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <SiteShell>
      <Suspense fallback={null}>
        <ThankYouTracker />
      </Suspense>
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="rounded-[2.2rem] border border-[rgba(15,23,42,0.08)] bg-white/90 p-10 shadow-[0_22px_60px_rgba(15,23,42,0.08)] md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
            Intake received
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-brand-ink md:text-5xl">
            Thanks. Your request is in the queue.
          </h1>
          <p className="mt-5 text-lg leading-8 text-body-ink">
            Ryan has the source context, lead type, and notes needed to route this correctly.
            If this is urgent, call directly.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="tel:+18458672646"
              data-track-event="cta_click_call"
              data-track-label="thank-you-call"
              className="rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-copper"
            >
              Call (845) 867-2646
            </a>
            <Link
              href="/"
              className="rounded-full border border-[rgba(15,23,42,0.14)] bg-white px-6 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
