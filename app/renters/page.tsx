import { RoutePageTemplate } from "@/components/route-page-template";
import { routePages } from "@/lib/personal-brand-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Renters",
  description:
    "Ryan Sylvestri's renter and relocation lane for timing, geography, urgency, and future-buyer routing.",
  path: "/renters",
});

export default function RentersPage() {
  return <RoutePageTemplate page={routePages.renters} />;
}
