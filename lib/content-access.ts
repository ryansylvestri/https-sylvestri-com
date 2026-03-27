import "server-only";

import { redirect } from "next/navigation";

import type { ContentAccess } from "@/lib/content-engine";
import { getCurrentViewer } from "@/lib/supabase";

export type ViewerTier = "anon" | "free" | "pro";

export type AccessResolution =
  | { kind: "allowed"; tier: ViewerTier }
  | { kind: "login_required" }
  | { kind: "upgrade_required"; tier: ViewerTier };

export async function resolveContentAccess(
  access: ContentAccess,
): Promise<AccessResolution> {
  const viewer = await getCurrentViewer();
  const tier = viewer?.tier ?? "anon";

  if (access === "public") {
    return { kind: "allowed", tier };
  }

  if (access === "free") {
    if (tier === "anon") return { kind: "login_required" };
    return { kind: "allowed", tier };
  }

  if (tier === "pro") {
    return { kind: "allowed", tier };
  }

  return { kind: "upgrade_required", tier };
}

export async function requireAccessOrRedirect(
  access: ContentAccess,
  nextPath: string,
): Promise<Exclude<AccessResolution, { kind: "login_required" }>> {
  const resolution = await resolveContentAccess(access);
  if (resolution.kind === "login_required") {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return resolution;
}
