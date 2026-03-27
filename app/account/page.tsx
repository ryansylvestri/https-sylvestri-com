import Link from "next/link";

import { SectionHeading, SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";
import { getCurrentViewer, isSupabaseConfigured } from "@/lib/supabase";

export const metadata = buildPageMetadata({
  title: "Account",
  description: "Account visibility for free and future Pro access.",
  path: "/account",
  noIndex: true,
});

export default async function AccountPage() {
  const viewer = await getCurrentViewer();
  const configured = isSupabaseConfigured();

  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading
          eyebrow="Account"
          title="Access state and member tier"
          description="The account surface shows the current login state and prepares the repo for future entitlement-aware experiences."
        />
        <div className="mt-10 rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          {viewer ? (
            <div className="space-y-3 text-body-ink">
              <p><strong className="text-brand-ink">Email:</strong> {viewer.user.email}</p>
              <p><strong className="text-brand-ink">Tier:</strong> {viewer.tier}</p>
            </div>
          ) : configured ? (
            <div className="space-y-4 text-body-ink">
              <p>You are not currently logged in.</p>
              <Link
                href="/login"
                className="inline-flex rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-copper"
              >
                Log in
              </Link>
            </div>
          ) : (
            <p className="text-body-ink">
              Supabase is not configured yet, so account visibility is currently limited to anonymous mode.
            </p>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
