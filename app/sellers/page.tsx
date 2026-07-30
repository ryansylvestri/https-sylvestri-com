import { RoutePageTemplate } from "@/components/route-page-template";
import { editorialCorePages } from "@/lib/editorial-core-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Selling in the Hudson Valley",
  description:
    "A practical Hudson Valley selling process for preparation, pricing context, launch planning, and the next move.",
  path: "/sellers",
});

export default function SellersPage() {
  return <RoutePageTemplate page={editorialCorePages.sellers} />;
}
