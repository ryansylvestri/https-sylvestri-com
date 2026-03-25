import type { Metadata } from "next";

import { RoutePageTemplate } from "@/components/route-page-template";
import { routePages } from "@/lib/personal-brand-content";

export const metadata: Metadata = {
  title: "Investors",
  description: "Ryan Sylvestri's investor lane for cleaner intake, better opportunity screening, and structured follow-up.",
};

export default function InvestorsPage() {
  return <RoutePageTemplate page={routePages.investors} />;
}
