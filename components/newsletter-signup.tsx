"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";

import { submitLead } from "@/lib/lead-client";
import { pushDataLayerEvent, sourcePathToToken } from "@/lib/tracking";

export function NewsletterSignup({ source, campaign }: { source: string; campaign: string }) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [consentEmail, setConsentEmail] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    if (honeypot.trim()) {
      setStatus("success");
      setMessage("You’re subscribed.");
      return;
    }

    if (!consentEmail) {
      setStatus("error");
      setMessage("Please confirm that you want to receive email updates.");
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
        fullName: "Newsletter subscriber",
        email,
        leadType: "newsletter",
        source,
        campaign,
        sourcePath: pathname,
        sourceToken: sourcePathToToken(pathname),
        submittedAt: new Date().toISOString(),
        consentEmail,
        consentSms: false,
        notes: "Editorial newsletter signup",
        honeypot,
      });
      setStatus("success");
      setMessage(payload.message || "You’re subscribed.");
      setEmail("");
      setConsentEmail(false);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Signup failed. Please try again.");
    }
  }

  return (
    <section className="editorial-section bg-[#f4ede3]">
      <div className="site-container grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2 className="section-title mt-4">Useful updates, not inbox clutter.</h2>
          <p className="section-copy mt-5">
            Get new Hudson Valley guides, market updates, AI notes, tools, and stories from Ryan.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="border-t-2 border-brand-copper pt-6">
          <label htmlFor="newsletter-email" className="text-sm font-bold text-brand-ink">Email address</label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="newsletter-email"
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="min-h-12 min-w-0 flex-1 border border-[rgba(20,32,51,0.28)] bg-[#fffdf9] px-4 text-base"
            />
            <button type="submit" disabled={status === "loading"} className="button-primary shrink-0 disabled:opacity-60">
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
          <label className="mt-4 flex items-start gap-3 text-xs leading-5 text-body-ink">
            <input
              type="checkbox"
              checked={consentEmail}
              onChange={(event) => setConsentEmail(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[#b65a2a]"
            />
            <span>
              I agree to receive email updates. I can unsubscribe at any time. See the{" "}
              <Link href="/privacypolicy" className="underline underline-offset-2">Privacy Policy</Link>.
            </span>
          </label>
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            className="hidden"
            aria-hidden="true"
          />
          <div aria-live="polite" role="status">
            {message ? (
              <p className={`mt-4 text-sm ${status === "error" ? "text-red-700" : "text-brand-forest"}`}>
                {message}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
