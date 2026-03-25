import type { Metadata } from "next";

import { RoutePageTemplate } from "@/components/route-page-template";
import { routePages } from "@/lib/personal-brand-content";

export const metadata: Metadata = {
  title: "Sellers",
  description: "Ryan Sylvestri's seller lane for valuation, launch planning, prep strategy, and smarter next steps.",
};

export default function SellersPage() {
  return <RoutePageTemplate page={routePages.sellers} />;
}
