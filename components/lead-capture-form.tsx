"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { submitLead } from "@/lib/lead-client";
import { leadTypeRequiresPropertyAddress } from "@/lib/lead-contract";
import { getLeadMagnetByValue } from "@/lib/lead-magnets";
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
  defaultLeadMagnet?: string | null;
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

function getInitialState(
  defaultLeadType: string,
  leadMagnetOptions?: LeadMagnetOption[],
  defaultLeadMagnet?: string | null,
): FormState {
  const hasRequestedMagnet = Boolean(
    defaultLeadMagnet &&
      leadMagnetOptions?.some((option) => option.value === defaultLeadMagnet),
  );

  return {
    fullName: "",
    email: "",
    phone: "",
    leadType: defaultLeadType,
    timeline: "",
    market: "",
    propertyAddress: "",
    notes: "",
    leadMagnet:
      defaultLeadMagnet === null
        ? ""
        : hasRequestedMagnet
          ? defaultLeadMagnet || ""
          : leadMagnetOptions?.[0]?.value || "",
    consentEmail: false,
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
  defaultLeadMagnet,
}: LeadCaptureFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const normalizedDefaultLeadType = normalizeLeadType(defaultLeadType, defaultInterest);

  const [form, setForm] = useState<FormState>(() =>
    getInitialState(normalizedDefaultLeadType, leadMagnetOptions, defaultLeadMagnet),
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [justSubmittedLeadType, setJustSubmittedLeadType] = useState(normalizedDefaultLeadType);
  const [justSubmittedMagnet, setJustSubmittedMagnet] = useState("");

  const wrapperClassName = useMemo(
    () =>
      compact
        ? "border border-[rgba(20,32,51,0.18)] bg-[#fffdf9] p-6"
        : "border border-[rgba(20,32,51,0.18)] bg-[#fffdf9] p-7 md:p-8",
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
      setJustSubmittedMagnet(getLeadMagnetByValue(form.leadMagnet)?.label || form.leadMagnet);

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

      setForm(getInitialState(normalizedDefaultLeadType, leadMagnetOptions, defaultLeadMagnet));

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
      <div className="space-y-3">
        <p className="eyebrow">
          {title}
        </p>
        <p className="text-base leading-7 text-body-ink">{description}</p>
      </div>

      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
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
              autoComplete="name"
              className="min-h-12 border border-[rgba(20,32,51,0.26)] bg-white px-4"
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
              autoComplete="email"
              className="min-h-12 border border-[rgba(20,32,51,0.26)] bg-white px-4"
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
              autoComplete="tel"
              className="min-h-12 border border-[rgba(20,32,51,0.26)] bg-white px-4"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            What is this about?
            <select
              name="leadType"
              value={form.leadType}
              onChange={(event) => setForm((current) => ({ ...current, leadType: event.target.value }))}
              className="min-h-12 border border-[rgba(20,32,51,0.26)] bg-white px-4"
            >
              {intakeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="border-l-2 border-brand-copper bg-[#f4ede3] px-4 py-3 text-sm leading-6 text-body-ink">
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
              autoComplete="street-address"
              className="min-h-12 border border-[rgba(20,32,51,0.26)] bg-white px-4"
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
              className="min-h-12 border border-[rgba(20,32,51,0.26)] bg-white px-4"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Market or town
            <input
              name="market"
              value={form.market}
              onChange={(event) => setForm((current) => ({ ...current, market: event.target.value }))}
              placeholder="Beacon, Fishkill, Cold Spring, etc."
              className="min-h-12 border border-[rgba(20,32,51,0.26)] bg-white px-4"
            />
          </label>
        </div>

        {leadMagnetOptions.length > 0 ? (
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Requested resource
            <select
              name="leadMagnet"
              value={form.leadMagnet}
              onChange={(event) =>
                setForm((current) => ({ ...current, leadMagnet: event.target.value }))
              }
              className="min-h-12 border border-[rgba(20,32,51,0.26)] bg-white px-4"
            >
              <option value="">No resource selected</option>
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
            placeholder="What are you trying to do, and which details would help Ryan understand the question?"
            className="border border-[rgba(20,32,51,0.26)] bg-white px-4 py-3"
          />
        </label>

        <label className="flex items-start gap-3 border-t border-[rgba(20,32,51,0.14)] pt-4 text-sm text-body-ink">
          <input
            type="checkbox"
            checked={form.consentEmail}
            onChange={(event) =>
              setForm((current) => ({ ...current, consentEmail: event.target.checked }))
            }
            className="mt-1 h-4 w-4 shrink-0 accent-[#b65a2a]"
          />
          <span>
            I agree to receive email follow-up about this request. See the{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2">Privacy Policy</Link>.
          </span>
        </label>

        <label className="flex items-start gap-3 text-sm text-body-ink">
          <input
            type="checkbox"
            checked={form.consentSms}
            onChange={(event) =>
              setForm((current) => ({ ...current, consentSms: event.target.checked }))
            }
            className="mt-1 h-4 w-4 shrink-0 accent-[#b65a2a]"
          />
          <span>
            I agree to receive SMS follow-up about this request (optional). Message and data rates may apply. See the{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2">Privacy Policy</Link>.
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="button-primary disabled:cursor-not-allowed disabled:opacity-60"
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
