import { ToolsPageClient } from "@/app/tools/tools-page-client";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Real Estate Calculators",
  description:
    "Mortgage, affordability, and net-proceeds calculators for Hudson Valley buyers and sellers.",
  path: "/tools",
});

export default function ToolsPage() {
  return <ToolsPageClient />;
}
