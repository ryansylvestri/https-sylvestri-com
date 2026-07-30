import { RoutePageTemplate } from "@/components/route-page-template";
import { editorialCorePages } from "@/lib/editorial-core-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Buying in the Hudson Valley",
  description:
    "A practical Hudson Valley buying process with educational resources and a clear place to ask questions.",
  path: "/buyers",
});

export default function BuyersPage() {
  return <RoutePageTemplate page={editorialCorePages.buyers} />;
}
