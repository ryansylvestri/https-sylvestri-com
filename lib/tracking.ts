import { normalizeLeadSourceToken } from "@/lib/lead-contract";

export type DataLayerValue = string | number | boolean | null | undefined;

export type DataLayerPayload = Record<string, DataLayerValue>;

export type DataLayerEventName =
  | "page_view"
  | "lead_form_view"
  | "lead_form_submit"
  | "lead_form_success"
  | "lead_magnet_download"
  | "cta_click_call"
  | "cta_click_start_here";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, DataLayerValue>>;
  }
}

export function pushDataLayerEvent(event: DataLayerEventName, payload: DataLayerPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...payload,
  });
}

export function inferLeadLane(pathname: string) {
  if (pathname.startsWith("/buyers") || pathname.includes("buyer")) return "buyer";
  if (
    pathname.startsWith("/sellers") ||
    pathname.startsWith("/resources") ||
    pathname.includes("seller") ||
    pathname.includes("foreclosure") ||
    pathname.includes("probate")
  ) {
    return "seller";
  }
  if (pathname.startsWith("/investors") || pathname.includes("investor")) return "investor";
  if (pathname.startsWith("/renters") || pathname.includes("relocation")) return "renter";
  if (pathname.startsWith("/ai")) return "ai-coaching";
  return "agent-match";
}

export function sourcePathToToken(pathname: string) {
  return normalizeLeadSourceToken(pathname);
}
