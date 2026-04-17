import { SiteShell } from "@/components/site-shell";
import { getKpiDashboardCards, getWeeklyCadence } from "@/lib/kpi-dashboard";
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
  const dashboardCards = getKpiDashboardCards();
  const reviewCadence = getWeeklyCadence();

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

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-display text-2xl leading-tight text-brand-ink">{card.title}</h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
                    card.status === "configured"
                      ? "bg-[rgba(6,95,70,0.12)] text-emerald-700"
                      : "bg-[rgba(180,83,9,0.12)] text-amber-700"
                  }`}
                >
                  {card.status}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-body-ink">{card.helper}</p>
              {card.href ? (
                <a
                  href={card.href}
                  className="mt-4 inline-flex rounded-full border border-[rgba(15,23,42,0.14)] bg-white px-4 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
                >
                  {card.actionLabel || "Open dashboard"}
                </a>
              ) : (
                <p className="mt-4 text-xs text-muted-ink">
                  Add the matching `KPI_*` dashboard URL env to turn this card into a direct ops link.
                </p>
              )}
            </div>
          ))}
        </div>

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

        <div className="mt-10 rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-8">
          <h2 className="font-display text-3xl text-brand-ink">Review cadence</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {reviewCadence.map((item) => (
              <div
                key={item.day}
                className="rounded-[1.4rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.72)] p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-copper">
                  {item.day}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-body-ink">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
