"use client";

import { FormEvent, useMemo, useState } from "react";

import { intakeOptions } from "@/lib/site-content";

type LeadCaptureFormProps = {
  title: string;
  description: string;
  submitLabel: string;
  source: string;
  campaign: string;
  compact?: boolean;
  defaultInterest?: string;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  timeline: string;
  location: string;
  notes: string;
};

function getInitialState(defaultInterest: string): FormState {
  return {
    fullName: "",
    email: "",
    phone: "",
    interest: defaultInterest,
    timeline: "",
    location: "",
    notes: "",
  };
}

export function LeadCaptureForm({
  title,
  description,
  submitLabel,
  source,
  campaign,
  compact = false,
  defaultInterest = "agent-match",
}: LeadCaptureFormProps) {
  const [form, setForm] = useState<FormState>(() => getInitialState(defaultInterest));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const wrapperClassName = useMemo(
    () =>
      compact
        ? "mesh-panel glow-outline rounded-[1.75rem] border border-[rgba(15,23,42,0.08)] bg-white/92 p-6"
        : "mesh-panel glow-outline rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/92 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)]",
    [compact],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source,
          campaign,
          submittedAt: new Date().toISOString(),
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Lead capture failed.");
      }

      setStatus("success");
      setMessage(payload.message || "Details received. Ryan can review the intake from here.");
      setForm(getInitialState(defaultInterest));
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
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Full name
            <input
              required
              value={form.fullName}
              onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Email
            <input
              required
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
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Lead type
            <select
              value={form.interest}
              onChange={(event) => setForm((current) => ({ ...current, interest: event.target.value }))}
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

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Timeline
            <input
              value={form.timeline}
              onChange={(event) => setForm((current) => ({ ...current, timeline: event.target.value }))}
              placeholder="ASAP, 30-60 days, researching, etc."
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-brand-ink">
            Market or town
            <input
              value={form.location}
              onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
              placeholder="Beacon, Fishkill, Cold Spring, etc."
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium text-brand-ink">
          Notes
          <textarea
            rows={compact ? 4 : 5}
            value={form.notes}
            onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
            placeholder="Tell us what you're trying to do, what kind of property or move you have in mind, and anything that would help us route this correctly."
            className="rounded-[1.5rem] border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 outline-none transition focus:border-brand-copper"
          />
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
        </div>
      </form>
    </div>
  );
}
