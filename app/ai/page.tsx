import { RoutePageTemplate } from "@/components/route-page-template";
import { routePages } from "@/lib/personal-brand-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "AI",
  description:
    "Ryan Sylvestri's systems and AI lane for automation, workflows, coaching, and the operator side of the brand.",
  path: "/ai",
});

export default function AIPage() {
  return <RoutePageTemplate page={routePages.ai} />;
}
