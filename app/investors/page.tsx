import { RoutePageTemplate } from "@/components/route-page-template";
import { editorialCorePages } from "@/lib/editorial-core-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Hudson Valley Property Investing",
  description:
    "A transparent process for examining Hudson Valley property goals, assumptions, condition, and risk.",
  path: "/investors",
});

export default function InvestorsPage() {
  return <RoutePageTemplate page={editorialCorePages.investors} />;
}
