"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  editorialNavigation,
  isNavigationGroup,
  type NavigationItem,
} from "@/lib/editorial-navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("Real Estate");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        className="focus-ring flex min-h-11 min-w-11 items-center justify-center border border-[rgba(20,32,51,0.22)] bg-transparent text-brand-ink"
      >
        <span aria-hidden="true" className="text-xl leading-none">{open ? "×" : "☰"}</span>
      </button>

      {open ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={close}
          className="fixed inset-0 z-40 cursor-default bg-[rgba(20,32,51,0.34)]"
        />
      ) : null}

      <nav
        ref={panelRef}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-50 w-[min(23rem,92vw)] overflow-y-auto bg-[#fffdf9] px-6 pb-10 pt-6 shadow-[-12px_0_40px_rgba(20,32,51,0.16)] transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-7 flex items-center justify-between border-b border-[rgba(20,32,51,0.14)] pb-5">
          <span className="font-display text-xl text-brand-ink">Explore</span>
          <button
            type="button"
            onClick={close}
            className="focus-ring flex min-h-11 min-w-11 items-center justify-center text-2xl text-brand-ink"
            aria-label="Close navigation"
          >
            ×
          </button>
        </div>

        <div>
          {editorialNavigation.map((item: NavigationItem) => {
            if (!isNavigationGroup(item)) {
              return (
                <Link key={item.href} href={item.href} onClick={close} className="mobile-nav-link">
                  {item.label}
                </Link>
              );
            }

            const isExpanded = expanded === item.label;
            const id = `mobile-group-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
            return (
              <div key={item.label} className="border-b border-[rgba(20,32,51,0.1)]">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={id}
                  onClick={() => setExpanded(isExpanded ? null : item.label)}
                  className="mobile-nav-link flex w-full items-center justify-between text-left"
                >
                  {item.label}
                  <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                </button>
                {isExpanded ? (
                  <div id={id} className="pb-3 pl-3">
                    {item.items.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={close}
                        className="flex min-h-11 items-center border-l border-brand-copper px-4 text-sm font-semibold text-body-ink"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <Link href="/intake" onClick={close} className="button-primary mt-8 flex min-h-11 items-center justify-center">
          Contact Ryan
        </Link>
      </nav>
    </div>
  );
}
