"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { submitLead } from "@/lib/lead-client";
import { leadTypeRequiresPropertyAddress } from "@/lib/lead-contract";
import { intakeOptions } from "@/lib/site-content";
import { pushDataLayerEvent, sourcePathToToken } from "@/lib/tracking";

type LeadMagnetOption = {
  value: string;
  label: string;
};

type LeadCaptureFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  source: string;
  campaign: string;
  compact?: boolean;
  defaultInterest?: string;
  defaultLeadType?: string;
  leadMagnetOptions?: LeadMagnetOption[];
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  leadType: string;
  timeline: string;
  market: string;
  propertyAddress: string;
  notes: string;
  leadMagnet: string;
  consentEmail: boolean;
  consentSms: boolean;
  honeypot: string;
};

const leadTypeHints: Record<string, string> = {
  buyer: "Tell Ryan your budget range, towns, and where you feel stuck.",
  seller: "Share your timing, condition, and goals for the sale.",
  "home-valuation": "Include your property address so the valuation can be accurate.",
  "seller-distress":
    "Use notes for urgency details (foreclosure notices, probate, divorce, or legal timelines).",
  investor: "Drop your criteria, target returns, and preferred deal profile.",
  renter: "Share move timing, towns, and household details.",
  "ai-coaching": "Describe your AI or systems project and the bottleneck.",
  newsletter: "Use notes for the updates you want to receive.",
  "agent-match": "Describe the situation and Ryan will route you correctly.",
  other: "Tell us what you need and we will route this manually.",
};

function getInitialState(defaultLeadType: string, leadMagnetOptions?: LeadMagnetOption[]): FormState {
  return {
    fullName: "",
    email: "",
    phone: "",
    leadType: defaultLeadType,
    timeline: "",
    market: "",
    propertyAddress: "",
    notes: "",
    leadMagnet: leadMagnetOptions?.[0]?.value || "",
    consentEmail: true,
    consentSms: false,
    honeypot: "",
  };
}

function normalizeLeadType(defaultLeadType?: string, defaultInterest?: string) {
  if (defaultLeadType) return defaultLeadType;
  if (defaultInterest) return defaultInterest;
  return "agent-match";
}

export function LeadCaptureForm({
  title,
  description,
  submitLabel,
  source,
  campaign,
  compact = false,
  defaultInterest,
  defaultLeadType,
  leadMagnetOptions = [],
}: LeadCaptureFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const normalizedDefaultLeadType = normalizeLeadType(defaultLeadType, defaultInterest);

  const [form, setForm] = useState<FormState>(() =>
    getInitialState(normalizedDefaultLeadType, leadMagnetOptions),
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [justSubmittedLeadType, setJustSubmittedLeadType] = useState(normalizedDefaultLeadType);
  const [justSubmittedMagnet, setJustSubmittedMagnet] = useState("");

  const wrapperClassName = useMemo(
    () =>
      compact
        ? "mesh-panel glow-outline rounded-[1.75rem] border border-[rgba(15,23,42,0.08)] bg-white/92 p-6"
        : "mesh-panel glow-outline rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/92 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]",
    [compact],
  );

  const requiresPropertyAddress = leadTypeRequiresPropertyAddress(form.leadType);
  const helperText = leadTypeHints[form.leadType] || leadTypeHints["agent-match"];

  useEffect(() => {
    pushDataLayerEvent("lead_form_view", {
      source,
      campaign,
      sourcePath: pathname,
      leadType: form.leadType,
    });
  }, [campaign, form.leadType, pathname, source]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    if (form.honeypot.trim()) {
      setStatus("success");
      setMessage("Thanks. We have your request.");
      return;
    }

    pushDataLayerEvent("lead_form_submit", {
      source,
      campaign,
      sourcePath: pathname,
      leadType: form.leadType,
      leadMagnet: form.leadMagnet || "",
    });

    try {
      const payload = await submitLead({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        leadType: form.leadType,
        timeline: form.timeline,
        market: form.market,
        propertyAddress: form.propertyAddress,
        notes: form.notes,
        leadMagnet: form.leadMagnet || undefined,
        consentEmail: form.consentEmail,
        consentSms: form.consentSms,
        source,
        campaign,
        sourcePath: pathname,
        submittedAt: new Date().toISOString(),
        sourceToken: sourcePathToToken(pathname),
        honeypot: form.honeypot,
      });

      setStatus("success");
      setMessage(payload.message || "Details received. Ryan can review the intake from here.");
      setJustSubmittedLeadType(form.leadType);
      setJustSubmittedMagnet(form.leadMagnet);

      pushDataLayerEvent("lead_form_success", {
        source,
        campaign,
        sourcePath: pathname,
        leadType: form.leadType,
      });

      if (form.leadMagnet) {
        pushDataLayerEvent("lead_magnet_download", {
          source,
          campaign,
          sourcePath: pathname,
          leadType: form.leadType,
          leadMagnet: form.leadMagnet,
        });
      }

      setForm(getInitialState(normalizedDefaultLeadType, leadMagnetOptions));

      const params = new URLSearchParams({
        source,
        campaign,
        leadType: form.leadType,
        from: pathname,
      });
      if (form.leadMagnet) params.set("magnet", form.leadMagnet);
      window.setTimeout(() => router.push(`/thank-you?${params.toString()}`), 900);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Lead capture failed.");
    }
  }

  return (
    <div className={wrapperClassName}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,_rgba(217,166,90,0.14),_transparent)]" />
      <div className="relative space-y-3">
        <div className="inline-flex rounded-full border border-[rgba(183,90,36,0.18)] bg-[rgba(255,248,239,0.88)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-copper">
          Structured intake
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-copper">
          {title}
        </p>
        <p className="text-base leading-7 text-body-ink">{description}</p>
      </div>

      <form className="relative mt-6 grid gap-4" onSubmit={handleSubmit}>
        <input
          tabIndex={-1}
          autoComplete="off"
          name="website"
          value={form.honeypot}
          onChange={(event) => setForm((current) => ({ ...current, honeypot: event.target.value }))}
          className="hidden"
          aria-hidden
        />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Full name
            <input
              required
              name="fullName"
              value={form.fullName}
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Email
            <input
              required
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Phone
            <input
              name="phone"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Lead type
            <select
              name="leadType"
              value={form.leadType}
              onChange={(event) => setForm((current) => ({ ...current, leadType: event.target.value }))}
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            >
              {intakeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-[1.2rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.86)] px-4 py-3 text-sm leading-6 text-body-ink">
          {helperText}
        </div>

        {requiresPropertyAddress ? (
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Property address
            <input
              required
              name="propertyAddress"
              value={form.propertyAddress}
              onChange={(event) =>
                setForm((current) => ({ ...current, propertyAddress: event.target.value }))
              }
              placeholder="123 Main St, Fishkill, NY"
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            />
          </label>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Timeline
            <input
              name="timeline"
              value={form.timeline}
              onChange={(event) => setForm((current) => ({ ...current, timeline: event.target.value }))}
              placeholder="ASAP, 30-60 days, researching, etc."
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Market or town
            <input
              name="market"
              value={form.market}
              onChange={(event) => setForm((current) => ({ ...current, market: event.target.value }))}
              placeholder="Beacon, Fishkill, Cold Spring, etc."
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            />
          </label>
        </div>

        {leadMagnetOptions.length > 0 ? (
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Requested lead magnet
            <select
              name="leadMagnet"
              value={form.leadMagnet}
              onChange={(event) =>
                setForm((current) => ({ ...current, leadMagnet: event.target.value }))
              }
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            >
              {leadMagnetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        <label className="grid gap-2 text-sm font-medium text-brand-ink">
          Notes
          <textarea
            name="notes"
            rows={compact ? 4 : 5}
            value={form.notes}
            onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
            placeholder="Tell us what you're trying to do, what kind of property or move you have in mind, and anything that would help us route this correctly."
            className="rounded-[1.5rem] border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
          />
        </label>

        <label className="flex items-start gap-3 rounded-[1.2rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.72)] px-4 py-3 text-sm text-body-ink">
          <input
            type="checkbox"
            checked={form.consentEmail}
            onChange={(event) =>
              setForm((current) => ({ ...current, consentEmail: event.target.checked }))
            }
            className="mt-1"
          />
          <span>I agree to receive email follow-up about this request.</span>
        </label>

        <label className="flex items-start gap-3 rounded-[1.2rem] border border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.72)] px-4 py-3 text-sm text-body-ink">
          <input
            type="checkbox"
            checked={form.consentSms}
            onChange={(event) =>
              setForm((current) => ({ ...current, consentSms: event.target.checked }))
            }
            className="mt-1"
          />
          <span>I agree to receive SMS updates (optional).</span>
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-[linear-gradient(135deg,_#142033,_#21415e_60%,_#b75a24)] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting..." : submitLabel}
        </button>

        <div aria-live="polite" aria-atomic="true" role="status">
          {message ? (
            <p
              className={`rounded-[1.2rem] border px-4 py-3 text-sm leading-6 ${
                status === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.9)] text-body-ink"
              }`}
            >
              {message}
            </p>
          ) : null}
          {status === "success" && justSubmittedMagnet ? (
            <p className="mt-2 text-xs text-muted-ink">
              Delivery queued for <strong>{justSubmittedMagnet}</strong> and the{" "}
              <strong>{justSubmittedLeadType}</strong> follow-up sequence.
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
