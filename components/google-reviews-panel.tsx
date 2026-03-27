import { siteConfig } from "@/lib/site-content";

const highlights = [
  "Calm guidance through high-stress timing decisions",
  "Faster follow-up than generic inquiry forms",
  "Clear pricing strategy and practical negotiation support",
];

export function GoogleReviewsPanel() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-7 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-copper">
              Google review signal
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-brand-ink">
              Public reputation visible before the first call
            </h2>
            <p className="mt-3 text-base leading-7 text-body-ink">
              Use review proof close to the CTA so buyers and sellers can validate trust without
              leaving the funnel.
            </p>
            <a
              href={siteConfig.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-full border border-[rgba(15,23,42,0.12)] bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
            >
              Open Google Reviews
            </a>
          </div>

          <div className="grid gap-3">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-[1.3rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.9)] px-4 py-3 text-sm text-body-ink"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
