import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentLockState } from "@/components/content-lock-state";
import { ContentProse } from "@/components/content-prose";
import { SiteShell } from "@/components/site-shell";
import {
  getPublishedContent,
  getPublishedDocBySlug,
  getRelatedContent,
  renderContentDocument,
} from "@/lib/content-engine";
import { requireAccessOrRedirect } from "@/lib/content-access";
import { buildContentMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return getPublishedContent("docs").map((doc) => ({ slug: doc.slugParts }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getPublishedDocBySlug("docs", slug.join("/"));
  if (!doc) return {};

  return buildContentMetadata(doc, true);
}

export default async function DocDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getPublishedDocBySlug("docs", slug.join("/"));
  if (!doc) notFound();

  const access = await requireAccessOrRedirect(doc.access, doc.routePath);
  if (access.kind === "upgrade_required") {
    return (
      <SiteShell>
        <ContentLockState
          title={doc.title}
          description="This doc is part of the discoverable Pro layer. The page is visible, but full access stays locked while paid plans remain disabled."
          nextPath={doc.routePath}
          locked="pro"
        />
      </SiteShell>
    );
  }

  const { content } = await renderContentDocument(doc);

  return (
    <SiteShell>
      <ContentProse doc={doc} body={content} related={getRelatedContent(doc)} />
    </SiteShell>
  );
}
