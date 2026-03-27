import { RoutePageTemplate } from "@/components/route-page-template";
import { routePages } from "@/lib/personal-brand-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sellers",
  description:
    "Ryan Sylvestri's seller lane for valuation, launch planning, prep strategy, and smarter next steps.",
  path: "/sellers",
});

export default function SellersPage() {
  return <RoutePageTemplate page={routePages.sellers} />;
}
