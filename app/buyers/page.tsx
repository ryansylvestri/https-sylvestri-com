import { RoutePageTemplate } from "@/components/route-page-template";
import { routePages } from "@/lib/personal-brand-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Buyers",
  description:
    "Ryan Sylvestri's buyer lane for first-time buyers, relocation clients, move-up buyers, and serious Hudson Valley searchers.",
  path: "/buyers",
});

export default function BuyersPage() {
  return <RoutePageTemplate page={routePages.buyers} />;
}
