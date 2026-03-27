"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { pushDataLayerEvent } from "@/lib/tracking";

export function ThankYouTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const source = searchParams.get("source") || "";
    const campaign = searchParams.get("campaign") || "";
    const leadType = searchParams.get("leadType") || "";
    const magnet = searchParams.get("magnet") || "";

    pushDataLayerEvent("lead_form_success", {
      source,
      campaign,
      leadType,
      thankYouPage: true,
    });

    if (magnet) {
      pushDataLayerEvent("lead_magnet_download", {
        source,
        campaign,
        leadType,
        leadMagnet: magnet,
        thankYouPage: true,
      });
    }
  }, [searchParams]);

  return null;
}
