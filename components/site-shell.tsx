import Link from "next/link";
import type { ReactNode } from "react";

import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";
import { footerNavigation } from "@/lib/editorial-navigation";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <a href="#main-content" className="skip-link">Skip to content</a>

      <header className="site-header">
        <div className="site-container flex min-h-[4.75rem] items-center justify-between gap-5">
          <Link href="/" aria-label="Ryan Sylvestri home" className="flex min-h-11 shrink-0 flex-col items-start justify-center">
            <span className="block font-display text-[1.7rem] leading-none tracking-[-0.03em] text-brand-ink sm:text-[1.8rem]">
              Ryan Sylvestri
            </span>
            <span className="mt-1.5 hidden text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-ink sm:block">
              Hudson Valley field notes
            </span>
          </Link>
          <DesktopNav />
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Link href="/intake" className="button-primary">Contact Ryan</Link>
            </div>
            <MobileNav />
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>{children}</main>

      <footer className="border-t border-[rgba(20,32,51,0.18)] bg-[#f4ede3]">
        <div className="site-container grid gap-12 py-14 md:grid-cols-[1.4fr_2fr]">
          <div>
            <Link href="/" className="font-display text-2xl text-brand-ink">Ryan Sylvestri</Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-body-ink">
              Practical Hudson Valley real estate guidance, useful technology, and ideas worth sharing.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(footerNavigation).map(([group, links]) => (
              <div key={group}>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-copper">{group}</h2>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-body-ink hover:text-brand-copper">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-[rgba(20,32,51,0.12)]">
          <div className="site-container flex flex-col gap-2 py-5 text-xs text-muted-ink sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} Ryan Sylvestri</span>
            <span>Built as an independent editorial resource.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-4">{title}</h2>
      <p className="section-copy mt-5">{description}</p>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-[rgba(20,32,51,0.16)]">
      <div className={`site-container grid gap-10 py-16 md:py-20 ${children ? "lg:grid-cols-[1.08fr_0.92fr] lg:items-center" : ""}`}>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title mt-5">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-body-ink md:text-xl md:leading-9">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryCta.href} className="button-primary">{primaryCta.label}</Link>
            {secondaryCta ? (
              <Link href={secondaryCta.href} className="button-secondary">{secondaryCta.label}</Link>
            ) : null}
          </div>
        </div>
        {children ? <div>{children}</div> : null}
      </div>
    </section>
  );
}
