"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { getLeadMagnetByValue, getLeadTypeLabel } from "@/lib/lead-magnets";

export function ThankYouFollowUp() {
  const searchParams = useSearchParams();
  const leadType = searchParams.get("leadType") || "";
  const magnetValue = searchParams.get("magnet") || "";
  const magnet = getLeadMagnetByValue(magnetValue);

  if (!leadType && !magnet) return null;

  const leadTypeLabel = getLeadTypeLabel(leadType);

  return (
    <div className="mt-8 rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.78)] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-copper">
        What happens next
      </p>
      <h2 className="mt-3 font-display text-2xl leading-tight text-brand-ink">
        {magnet ? `${magnet.label} is queued for delivery.` : `${leadTypeLabel} follow-up is queued.`}
      </h2>
      <p className="mt-3 text-base leading-7 text-body-ink">
        The submission already carries source, campaign, and lane context. That lets the follow-up
        sequence start with the right message instead of a generic reply.
      </p>

      {magnet ? (
        <div className="mt-5 rounded-[1.4rem] border border-[rgba(15,23,42,0.08)] bg-white/85 p-5">
          <p className="text-sm font-semibold text-brand-ink">{magnet.deliveryLabel}</p>
          <p className="mt-2 text-sm leading-6 text-body-ink">{magnet.summary}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={magnet.resourceHref}
              className="rounded-full bg-brand-ink px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-copper"
            >
              Preview the route
            </Link>
            <Link
              href={`/lead-magnets/${magnet.slug}`}
              className="rounded-full border border-[rgba(15,23,42,0.14)] bg-white px-5 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
            >
              Review the delivery plan
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
