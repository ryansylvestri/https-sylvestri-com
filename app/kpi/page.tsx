import { SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "KPI Dashboard",
  description:
    "Weekly KPI review template for GA4, Clarity, n8n router health, and Follow Up Boss lead outcomes.",
  path: "/kpi",
  noIndex: true,
});

const checklist = [
  "Sessions, users, and source/medium splits (GA4)",
  "Lead form views -> submits -> success conversion rates",
  "Heatmap and rage-click anomalies (Clarity)",
  "Top landing pages by assisted conversion",
  "n8n webhook failures, retries, and request-ID trace checks",
  "FUB assignment speed and 24-hour response SLA",
  "Lead magnets: opt-in counts and email delivery rates",
];

export default function KpiPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-copper">
          Weekly operations
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-brand-ink md:text-6xl">
          KPI dashboard review
        </h1>
        <p className="mt-5 text-lg leading-8 text-body-ink">
          Run this checklist every week. The goal is to protect lead capture quality, speed, and
          source attribution before scaling traffic.
        </p>

        <div className="mt-10 rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-8">
          <h2 className="font-display text-3xl text-brand-ink">Weekly checklist</h2>
          <ul className="mt-5 space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base leading-7 text-body-ink">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-copper" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
