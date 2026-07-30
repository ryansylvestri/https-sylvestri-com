import { RoutePageTemplate } from "@/components/route-page-template";
import { editorialCorePages } from "@/lib/editorial-core-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Renting and Relocating in the Hudson Valley",
  description:
    "A practical process for organizing a rental or relocation search across the Hudson Valley.",
  path: "/renters",
});

export default function RentersPage() {
  return <RoutePageTemplate page={editorialCorePages.renters} />;
}
