"use client";

import { usePathname } from "next/navigation";

import { LeadCaptureForm } from "@/components/lead-capture-form";

function normalizePathToken(pathname: string) {
  if (pathname === "/") {
    return "home";
  }

  return pathname.replace(/\//g, "-").replace(/^-+|-+$/g, "") || "page";
}

function normalizePathLabel(pathname: string) {
  if (pathname === "/") {
    return "home page";
  }

  return `${pathname.replace(/\//g, " ").trim()} page`;
}

export function GlobalLeadCaptureSection() {
  const pathname = usePathname();
  const pathToken = normalizePathToken(pathname);
  const pathLabel = normalizePathLabel(pathname);

  return (
    <section className="border-t border-[rgba(15,23,42,0.08)] bg-[rgba(255,248,240,0.94)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-copper">
            Always-On Intake
          </p>
          <h2 className="font-display text-4xl leading-tight text-brand-ink md:text-5xl">
            Need more information on anything on this page?
          </h2>
          <p className="text-lg leading-8 text-body-ink">
            Every page on sylvestri.com carries the same shared intake. If someone wants more
            information about buyers, sellers, investors, renters, relocation, AI, or Ryan
            directly, the inquiry can route into the same follow-up workflow without losing context.
          </p>
          <div className="rounded-[1.6rem] border border-[rgba(15,23,42,0.08)] bg-white/85 px-5 py-4 text-sm leading-7 text-body-ink shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
            Source context is preserved automatically from the {pathLabel}, so Ryan can tell where
            the inquiry started and respond with the right next step.
          </div>
        </div>

        <LeadCaptureForm
          title="Shared intake"
          description="Use this form for questions, follow-up requests, or interest in any path on the site. It keeps the first touch short while preserving enough context to route the follow-up correctly."
          submitLabel="Send inquiry"
          source={`sylvestri-${pathToken}-global`}
          campaign="sylvestri-global-site-shell"
          compact
        />
      </div>
    </section>
  );
}
