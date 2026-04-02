import type { LeadPayload, LeadSubmissionResponse } from "@/lib/lead-contract";

export async function submitLead(payload: LeadPayload): Promise<LeadSubmissionResponse> {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: LeadSubmissionResponse = {};

  try {
    data = (await response.json()) as LeadSubmissionResponse;
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "Lead capture failed.");
  }

  return data;
}
