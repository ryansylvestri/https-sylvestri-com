"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ChatLauncher() {
  const pathname = usePathname();
  const params = new URLSearchParams({
    source: "chat-launcher",
    from: pathname,
    leadType: "agent-match",
  });

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <Link
        href={`/intake?${params.toString()}`}
        data-track-event="cta_click_start_here"
        data-track-label="chat-launcher"
        className="inline-flex items-center gap-2 rounded-full border border-[rgba(15,23,42,0.12)] bg-brand-ink px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(15,23,42,0.2)] transition hover:bg-brand-copper"
      >
        Chat / Fast help
      </Link>
    </div>
  );
}
