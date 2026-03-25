import type { Metadata } from "next";

import { RoutePageTemplate } from "@/components/route-page-template";
import { routePages } from "@/lib/personal-brand-content";

export const metadata: Metadata = {
  title: "Buyers",
  description: "Ryan Sylvestri's buyer lane for first-time buyers, relocation clients, move-up buyers, and serious Hudson Valley searchers.",
};

export default function BuyersPage() {
  return <RoutePageTemplate page={routePages.buyers} />;
}
