import { RoutePageTemplate } from "@/components/route-page-template";
import { routePages } from "@/lib/personal-brand-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Investors",
  description:
    "Ryan Sylvestri's investor lane for cleaner intake, better opportunity screening, and structured follow-up.",
  path: "/investors",
});

export default function InvestorsPage() {
  return <RoutePageTemplate page={routePages.investors} />;
}
