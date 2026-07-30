import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentLockState } from "@/components/content-lock-state";
import { ContentProse } from "@/components/content-prose";
import { SiteShell } from "@/components/site-shell";
import {
  getPublishedDocBySlug,
  getRelatedContent,
  renderContentDocument,
} from "@/lib/content-engine";
import { requireAccessOrRedirect } from "@/lib/content-access";
import { buildContentMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getPublishedDocBySlug("articles", slug);
  if (!doc) return {};

  return buildContentMetadata(doc);
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getPublishedDocBySlug("articles", slug);
  if (!doc) notFound();

  const access = await requireAccessOrRedirect(doc.access, doc.routePath);
  if (access.kind === "upgrade_required") {
    return (
      <SiteShell>
        <ContentLockState
          title={doc.title}
          description="This article is currently a Pro preview. It stays discoverable, but full access remains locked while `FEATURE_PAID=false`."
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
