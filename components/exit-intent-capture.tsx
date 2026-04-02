"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { submitLead } from "@/lib/lead-client";
import { pushDataLayerEvent, inferLeadLane, sourcePathToToken } from "@/lib/tracking";

const STORAGE_KEY = "sylvestri_exit_intent_seen";

function getMagnetByLane(lane: string) {
  switch (lane) {
    case "buyer":
      return "first-time-buyer-blueprint";
    case "seller":
      return "seller-pricing-guide";
    case "investor":
      return "hudson-valley-investor-playbook";
    case "renter":
      return "relocation-guide";
    default:
      return "first-time-buyer-blueprint";
  }
}

export function ExitIntentCapture() {
  const pathname = usePathname();
  const leadLane = inferLeadLane(pathname);
  const leadMagnet = useMemo(() => getMagnetByLane(leadLane), [leadLane]);

  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const mobile = window.matchMedia("(pointer: coarse)").matches;
    let timer: number | null = null;

    const show = () => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    const desktopExitIntent = (event: MouseEvent) => {
      if (mobile) return;
      if (event.clientY <= 0) show();
    };

    const mobileSoftExit = () => {
      if (!mobile) return;
      const scrolled = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1);
      if (scrolled > 0.45) show();
    };

    document.addEventListener("mouseleave", desktopExitIntent);
    window.addEventListener("scroll", mobileSoftExit, { passive: true });
    timer = window.setTimeout(show, 60000);

    return () => {
      document.removeEventListener("mouseleave", desktopExitIntent);
      window.removeEventListener("scroll", mobileSoftExit);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    if (honeypot.trim()) {
      setStatus("success");
      setMessage("Sent. Check your inbox for the guide.");
      return;
    }

    try {
      pushDataLayerEvent("lead_form_submit", {
        source: "exit-intent",
        campaign: "exit-intent-offer",
        sourcePath: pathname,
        leadType: leadLane,
        leadMagnet,
      });

      await submitLead({
        fullName,
        email,
        leadType: leadLane,
        source: "exit-intent",
        campaign: "exit-intent-offer",
        sourcePath: pathname,
        sourceToken: sourcePathToToken(pathname),
        submittedAt: new Date().toISOString(),
        leadMagnet,
        notes: "Exit intent capture",
        consentEmail: true,
        consentSms: false,
        honeypot,
      });

      pushDataLayerEvent("lead_form_success", {
        source: "exit-intent",
        campaign: "exit-intent-offer",
        sourcePath: pathname,
        leadType: leadLane,
      });
      pushDataLayerEvent("lead_magnet_download", {
        source: "exit-intent",
        campaign: "exit-intent-offer",
        sourcePath: pathname,
        leadType: leadLane,
        leadMagnet,
      });

      setStatus("success");
      setMessage("Sent. Check your inbox for the guide.");
      setFullName("");
      setEmail("");
      setHoneypot("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not submit.");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(15,23,42,0.45)] p-4 md:items-center">
      <div className="w-full max-w-xl rounded-[1.8rem] border border-[rgba(15,23,42,0.08)] bg-white p-7 shadow-[0_28px_80px_rgba(15,23,42,0.22)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-copper">
              Before you go
            </p>
            <h2 className="mt-2 font-display text-3xl leading-tight text-brand-ink">
              Want the free guide before you leave?
            </h2>
            <p className="mt-2 text-sm leading-7 text-body-ink">
              Drop your details and Ryan will send the most relevant guide for this page.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-[rgba(15,23,42,0.12)] px-3 py-1 text-sm font-semibold text-brand-ink"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-3">
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
            placeholder="Email"
            className="rounded-2xl border border-[rgba(15,23,42,0.12)] bg-brand-cream px-4 py-3 text-sm outline-none transition focus:border-brand-copper"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-copper disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send my guide"}
          </button>
        </form>

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
    </div>
  );
}
