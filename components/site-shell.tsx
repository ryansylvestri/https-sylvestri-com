import Link from "next/link";
import { ReactNode } from "react";

import { GlobalLeadCaptureSection } from "@/components/global-lead-capture";
import { MobileNav } from "@/components/mobile-nav";
import { brandEcosystem, personalSiteConfig } from "@/lib/personal-brand-content";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(217,119,6,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.12),_transparent_30%),linear-gradient(180deg,_#f8f2e8_0%,_#f4efe8_30%,_#fcfbf8_72%,_#f1ece3_100%)] text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      <header role="banner" className="sticky top-0 z-30 border-b border-white/45 bg-[rgba(255,252,247,0.76)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="space-y-1">
            <Link href="/" className="font-display text-2xl tracking-[0.08em] text-brand-ink" aria-label="Ryan Sylvestri — Home">
              {personalSiteConfig.name}
            </Link>
            <p className="text-[11px] uppercase tracking-[0.38em] text-muted-ink">
              {personalSiteConfig.tagline}
            </p>
          </div>

          <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm font-semibold text-muted-ink lg:flex">
            {personalSiteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition duration-200 hover:text-brand-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={personalSiteConfig.phoneHref}
              aria-label={`Call Ryan at ${personalSiteConfig.phone}`}
              className="hidden rounded-full border border-[rgba(17,24,39,0.12)] bg-white/70 px-4 py-2 text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper sm:inline-flex"
            >
              Call {personalSiteConfig.phone}
            </a>
            <Link
              href="/intake"
              className="rounded-full bg-brand-ink px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)] transition hover:bg-brand-copper"
            >
              Start Here
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>{children}</main>

      <GlobalLeadCaptureSection />

      <footer role="contentinfo" className="border-t border-[rgba(15,23,42,0.08)] bg-[rgba(255,250,244,0.9)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-muted-ink">
              Personal Brand Hub
            </p>
            <h2 className="font-display text-3xl text-brand-ink">
              {personalSiteConfig.name}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-body-ink">
              sylvestri.com is the front door where Ryan&apos;s story, local market credibility,
              and systems-minded offers route visitors into the right lane instead of one generic
              catch-all contact page.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-muted-ink">
              Site Map
            </p>
            {personalSiteConfig.navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-body-ink transition hover:text-brand-copper"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-muted-ink">
              Brand Lanes
            </p>
            <div className="space-y-3">
              {brandEcosystem.map((brand) => (
                <div
                  key={brand.domain}
                  className="rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-white/70 p-4"
                >
                  <p className="font-display text-xl text-brand-ink">{brand.title}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-copper">
                    {brand.status}
                  </p>
                  <p className="mt-2 text-sm text-body-ink">{brand.domain}</p>
                </div>
              ))}
            </div>
            <div className="space-y-1 text-sm text-body-ink">
              <div>{personalSiteConfig.address}</div>
              <div>
                <a href={personalSiteConfig.phoneHref} className="transition hover:text-brand-copper">
                  {personalSiteConfig.phone}
                </a>
              </div>
              <div>
                <a href={personalSiteConfig.emailHref} className="transition hover:text-brand-copper">
                  {personalSiteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm font-semibold uppercase tracking-[0.32em] text-brand-copper">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-tight text-brand-ink md:text-5xl">
        {title}
      </h2>
      <p className="text-lg leading-8 text-body-ink">{description}</p>
    </div>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
}: PageHeroProps) {
  const primaryIsInternal = primaryCta.href.startsWith("/");

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-brand-copper">
              {eyebrow}
            </p>
            <h1 className="font-display text-5xl leading-none text-balance text-brand-ink md:text-7xl">
              {title}
            </h1>
            <p className="max-w-3xl text-xl leading-9 text-body-ink">{description}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            {primaryIsInternal ? (
              <Link
                href={primaryCta.href}
                className="rounded-full bg-brand-ink px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.16)] transition hover:bg-brand-copper"
              >
                {primaryCta.label}
              </Link>
            ) : (
              <a
                href={primaryCta.href}
                className="rounded-full bg-brand-ink px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.16)] transition hover:bg-brand-copper"
              >
                {primaryCta.label}
              </a>
            )}

            <Link
              href={secondaryCta.href}
              className="rounded-full border border-[rgba(15,23,42,0.12)] bg-white/70 px-6 py-3 text-center text-sm font-semibold text-brand-ink transition hover:border-brand-gold hover:text-brand-copper"
            >
              {secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-[rgba(255,252,247,0.78)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          {children}
        </div>
      </div>
    </section>
  );
}
