"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { personalSiteConfig } from "@/lib/personal-brand-content";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(15,23,42,0.12)] bg-white/70 transition hover:border-brand-gold"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="text-brand-ink"
        >
          {open ? (
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <>
              <path d="M3 5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M3 10h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(15,23,42,0.4)] backdrop-blur-sm"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <nav
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal={open}
        aria-label="Mobile navigation"
        className={`fixed inset-y-0 right-0 z-40 w-[min(20rem,85vw)] transform bg-[rgba(255,252,247,0.98)] shadow-[-8px_0_40px_rgba(15,23,42,0.12)] backdrop-blur-xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-20">
          <div className="grid gap-1">
            {personalSiteConfig.navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-2xl px-4 py-3 text-lg font-semibold text-brand-ink transition hover:bg-[rgba(217,166,90,0.12)] hover:text-brand-copper"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-3 pt-8">
            <a
              href={personalSiteConfig.phoneHref}
              aria-label={`Call Ryan at ${personalSiteConfig.phone}`}
              data-track-event="cta_click_call"
              data-track-label="mobile-nav-call"
              className="block rounded-full border border-[rgba(15,23,42,0.12)] bg-white/70 px-4 py-3 text-center text-sm font-semibold text-brand-ink transition hover:border-brand-gold"
            >
              Call {personalSiteConfig.phone}
            </a>
            <Link
              href="/intake"
              onClick={close}
              data-track-event="cta_click_start_here"
              data-track-label="mobile-nav-start-here"
              className="block rounded-full bg-brand-ink px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.16)] transition hover:bg-brand-copper"
            >
              Start Here
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
