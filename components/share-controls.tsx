"use client";

import { useState } from "react";

export function ShareControls({ title }: { title: string }) {
  const [message, setMessage] = useState("");

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setMessage("Link copied.");
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
      setMessage("Share sheet opened.");
      return;
    }
    await copyLink();
  }

  return (
    <div className="flex flex-wrap items-center gap-3" aria-label="Share this page">
      <button type="button" onClick={copyLink} className="button-secondary">Copy Link</button>
      <button type="button" onClick={share} className="button-secondary">Share</button>
      <span aria-live="polite" role="status" className="text-xs text-muted-ink">{message}</span>
    </div>
  );
}
