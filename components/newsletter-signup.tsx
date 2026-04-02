"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";

import { submitLead } from "@/lib/lead-client";
import { pushDataLayerEvent, sourcePathToToken } from "@/lib/tracking";

type NewsletterSignupProps = {
  source: string;
  campaign: string;
};

export function NewsletterSignup({ source, campaign }: NewsletterSignupProps) {
  const pathname = usePathname();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    if (honeypot.trim()) {
      setStatus("success");
      setMessage("Subscribed. You will get market and systems updates.");
      return;
    }

    try {
      pushDataLayerEvent("lead_form_submit", {
        source,
        campaign,
        sourcePath: pathname,
        leadType: "newsletter",
      });

      const payload = await submitLead({
        fullName,
        email,
        leadType: "newsletter",
        source,
        campaign,
        sourcePath: pathname,
        sourceToken: sourcePathToToken(pathname),
        submittedAt: new Date().toISOString(),
        consentEmail: true,
        consentSms: false,
        notes: "Newsletter signup",
        honeypot,
      });

      pushDataLayerEvent("lead_form_success", {
        source,
        campaign,
        sourcePath: pathname,
        leadType: "newsletter",
      });

      setStatus("success");
      setMessage(payload.message || "Subscribed. You will get market and systems updates.");
      setFullName("");
      setEmail("");
      setHoneypot("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Signup failed.");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-7 shadow-[0_16px_45px_rgba(15,23,42,0.06)]">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-copper">
              Newsletter
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-brand-ink">
              Monthly Hudson Valley market + systems brief
            </h2>
            <p className="mt-3 text-base leading-7 text-body-ink">
              Subscribe for practical market updates, local pattern shifts, and short operator notes
              on what is actually changing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3">
            <input
              tabIndex={-1}
              autoComplete="off"
              name="website"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              className="hidden"
              aria-hidden
            />
            <input
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Full name"
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 text-sm outline-none transition focus:border-brand-copper"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 text-sm outline-none transition focus:border-brand-copper"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-copper disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>

        {message ? (
          <p
            className={`mt-4 rounded-[1rem] border px-4 py-3 text-sm ${
              status === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,239,0.86)] text-body-ink"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
