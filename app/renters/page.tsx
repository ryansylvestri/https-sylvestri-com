import type { Metadata } from "next";

import { RoutePageTemplate } from "@/components/route-page-template";
import { routePages } from "@/lib/personal-brand-content";

export const metadata: Metadata = {
  title: "Renters",
  description: "Ryan Sylvestri's renter and relocation lane for timing, geography, urgency, and future-buyer routing.",
};

export default function RentersPage() {
  return <RoutePageTemplate page={routePages.renters} />;
}
