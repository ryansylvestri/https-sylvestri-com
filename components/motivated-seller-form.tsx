"use client";

import { FormEvent, useState } from "react";

/**
 * Webhook endpoint — configurable via env var.
 * Falls back to the Hostinger n8n instance.
 */
const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ||
  "https://n8n.srv1106931.hstgr.cloud/webhook/lead-capture";

type MotivatedSellerFormProps = {
  /** Slug of the source page, e.g. "divorce-home-sale" */
  sourceSlug: string;
  /** CTA button label */
  ctaLabel?: string;
  /** Visual variant */
  variant?: "light" | "dark" | "embedded";
};

type Status = "idle" | "submitting" | "success" | "error";

export function MotivatedSellerForm({
  sourceSlug,
  ctaLabel = "Get My Free Consultation",
  variant = "light",
}: MotivatedSellerFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  const isDark = variant === "dark";
  const isEmbedded = variant === "embedded";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: fd.get("firstName")?.toString().trim() ?? "",
      lastName: fd.get("lastName")?.toString().trim() ?? "",
      email: fd.get("email")?.toString().trim() ?? "",
      phone: fd.get("phone")?.toString().trim() ?? "",
      propertyAddress: fd.get("propertyAddress")?.toString().trim() ?? "",
      message: fd.get("message")?.toString().trim() ?? "",
      source: sourceSlug,
      category: "motivated-seller",
      system: "sylvestri-lead-pages",
      submittedAt: new Date().toISOString(),
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setStatus("success");
      e.currentTarget.reset();

      // Auto-generate homeowner report if property address was provided
      const addr = payload.propertyAddress;
      if (addr) {
        fetch("/api/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ownerName: `${payload.firstName} ${payload.lastName}`.trim(),
            propertyAddress: addr,
            leadSource: sourceSlug,
          }),
        }).catch(() => {
          /* report generation is best-effort */
        });
      }

      // Redirect to canonical domain after a short delay so they see the thank-you
      setTimeout(() => {
        window.location.href = "https://sylvestri.com?ref=lead-capture&source=" + encodeURIComponent(sourceSlug);
      }, 4000);
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  /* ── Success ── */
  if (status === "success") {
    const bg = isDark
      ? "border-emerald-400/30 bg-emerald-950/40"
      : "border-emerald-200 bg-emerald-50";
    return (
      <div className={`rounded-[2rem] border p-8 text-center ${bg}`}>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-2xl text-white">
          ✓
        </div>
        <h3
          className={`text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}
        >
          Thank You
        </h3>
        <p className={`mt-3 text-base leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          Ryan will review your situation and reach out within 24 hours — often
          much sooner. Your personalized homeowner report is being prepared.
        </p>
        <p className={`mt-3 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Redirecting you to <strong>sylvestri.com</strong> in a few seconds...
        </p>
        <p className={`mt-4 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          Need immediate help?{" "}
          <a href="tel:+18458672646" className="font-semibold underline">
            (845) 867-2646
          </a>
        </p>
      </div>
    );
  }

  /* ── Styling tokens ── */
  const label = `block text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`;
  const input = [
    "mt-1.5 w-full rounded-2xl border px-4 py-3 text-sm outline-none transition focus:ring-2",
    isDark
      ? "border-white/10 bg-white/5 text-white placeholder-slate-500 focus:border-[#0054A4] focus:ring-[#0054A4]/30"
      : "border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:border-[#0054A4] focus:ring-[#0054A4]/20",
  ].join(" ");

  const wrapCls = isEmbedded
    ? ""
    : isDark
      ? "rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 backdrop-blur"
      : "rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]";

  return (
    <div className={wrapCls}>
      <form onSubmit={onSubmit} className="space-y-5" id={`msf-${sourceSlug}`}>
        {/* Name row */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`fn-${sourceSlug}`} className={label}>First Name *</label>
            <input id={`fn-${sourceSlug}`} name="firstName" required placeholder="First name" className={input} />
          </div>
          <div>
            <label htmlFor={`ln-${sourceSlug}`} className={label}>Last Name *</label>
            <input id={`ln-${sourceSlug}`} name="lastName" required placeholder="Last name" className={input} />
          </div>
        </div>

        {/* Contact row */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`em-${sourceSlug}`} className={label}>Email *</label>
            <input id={`em-${sourceSlug}`} name="email" type="email" required placeholder="you@email.com" className={input} />
          </div>
          <div>
            <label htmlFor={`ph-${sourceSlug}`} className={label}>Phone</label>
            <input id={`ph-${sourceSlug}`} name="phone" type="tel" placeholder="(555) 123-4567" className={input} />
          </div>
        </div>

        {/* Property */}
        <div>
          <label htmlFor={`addr-${sourceSlug}`} className={label}>Property Address</label>
          <input id={`addr-${sourceSlug}`} name="propertyAddress" placeholder="123 Main St, Fishkill, NY 12524" className={input} />
        </div>

        {/* Message */}
        <div>
          <label htmlFor={`msg-${sourceSlug}`} className={label}>Tell Us About Your Situation</label>
          <textarea
            id={`msg-${sourceSlug}`}
            name="message"
            rows={3}
            placeholder="Any details help us give you better guidance."
            className={`${input} resize-none`}
          />
        </div>

        {/* Error */}
        {status === "error" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {errMsg || "Something went wrong. Please try again or call us directly."}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`w-full rounded-full px-6 py-4 text-sm font-semibold transition ${
            isDark
              ? "bg-white text-slate-950 hover:bg-slate-100 disabled:bg-slate-500"
              : "bg-[#0054A4] text-white shadow-[0_16px_40px_rgba(0,84,164,0.2)] hover:bg-[#00417f] disabled:bg-slate-400"
          }`}
        >
          {status === "submitting" ? "Sending…" : ctaLabel}
        </button>

        <p className={`text-center text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
          100% confidential. We never share or sell your data.
        </p>
      </form>
    </div>
  );
}
