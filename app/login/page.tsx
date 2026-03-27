import Link from "next/link";

import { SectionHeading, SiteShell } from "@/components/site-shell";
import { buildPageMetadata } from "@/lib/seo";
import { isSupabaseConfigured } from "@/lib/supabase";

export const metadata = buildPageMetadata({
  title: "Login",
  description: "Magic-link login for free and future Pro access.",
  path: "/login",
  noIndex: true,
});

type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;
  const nextPath = next || "/account";
  const configured = isSupabaseConfigured();

  return (
    <SiteShell>
      <section className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading
          eyebrow="Login"
          title="Magic-link access for free and future Pro content"
          description="Use your email to sign in. Free members can unlock `free` content now, and the account layer is ready for future Pro entitlements."
        />
        <div className="mt-10 rounded-[2rem] border border-[rgba(15,23,42,0.08)] bg-white/88 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          {configured ? (
            <form action="/auth/magic-link" method="post" className="space-y-4">
              <input type="hidden" name="next" value={nextPath} />
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-brand-ink">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-full border border-[rgba(15,23,42,0.12)] px-5 py-3 text-sm text-brand-ink outline-none transition focus:border-brand-gold"
                  placeholder="you@sylvestri.com"
                />
              </label>
              <button
                type="submit"
                className="rounded-full bg-brand-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-copper"
              >
                Send magic link
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-body-ink">
              <p>
                Supabase auth is not configured in this environment yet, so the magic-link flow is parked.
              </p>
              <p>
                Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to enable sign-in.
              </p>
            </div>
          )}
          <div className="mt-6 text-sm text-muted-ink">
            <Link href="/account" className="text-brand-copper transition hover:text-brand-gold">
              Go to account
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
