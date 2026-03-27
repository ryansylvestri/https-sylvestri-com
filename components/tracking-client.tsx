"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { inferLeadLane, pushDataLayerEvent } from "@/lib/tracking";

export function TrackingClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    pushDataLayerEvent("page_view", {
      path: pathname,
      query: query || "",
      leadLane: inferLeadLane(pathname),
    });
  }, [pathname, searchParams]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-track-event]");
      if (!el) return;

      const trackEvent = el.dataset.trackEvent;
      if (!trackEvent) return;

      if (trackEvent === "cta_click_call" || trackEvent === "cta_click_start_here") {
        pushDataLayerEvent(trackEvent, {
          path: pathname,
          label: el.dataset.trackLabel || "",
          href: el.getAttribute("href") || "",
        });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
