"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  editorialNavigation,
  isNavigationGroup,
  type NavigationItem,
} from "@/lib/editorial-navigation";

export function DesktopNav() {
  const [openLabel, setOpenLabel] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());

  const close = useCallback((returnFocus = false) => {
    const previous = openLabel;
    setOpenLabel(null);
    if (returnFocus && previous) {
      triggerRefs.current.get(previous)?.focus();
    }
  }, [openLabel]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenLabel(null);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && openLabel) {
        event.preventDefault();
        close(true);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, openLabel]);

  return (
    <nav ref={navRef} aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
      {editorialNavigation.map((item: NavigationItem) => {
        if (!isNavigationGroup(item)) {
          return (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          );
        }

        const isOpen = openLabel === item.label;
        const panelId = `desktop-nav-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}`;

        return (
          <div key={item.label} className="relative">
            <button
              ref={(node) => {
                if (node) triggerRefs.current.set(item.label, node);
              }}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenLabel(isOpen ? null : item.label)}
              className="nav-link inline-flex items-center gap-1.5"
            >
              {item.label}
              <svg
                viewBox="0 0 12 8"
                width="10"
                height="7"
                aria-hidden="true"
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <path d="m1 1 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            {isOpen ? (
              <div
                id={panelId}
                className="absolute left-0 top-[calc(100%+0.7rem)] w-72 border border-[rgba(20,32,51,0.14)] bg-[#fffdf9] p-2 shadow-[0_22px_50px_rgba(20,32,51,0.13)]"
              >
                {item.items.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpenLabel(null)}
                    className="block border-b border-[rgba(20,32,51,0.08)] px-4 py-3 last:border-0 hover:bg-[#f8f1e7] focus-visible:bg-[#f8f1e7]"
                  >
                    <span className="block text-sm font-semibold text-brand-ink">{link.label}</span>
                    {link.description ? (
                      <span className="mt-1 block text-xs leading-5 text-muted-ink">
                        {link.description}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
