#!/usr/bin/env node

function usage() {
  process.stdout.write(`Usage:
  node ./scripts/verify-live-lead.mjs --base-url https://sylvestri.com [options]

Options:
  --base-url URL           Base site URL. Defaults to NEXT_PUBLIC_SITE_URL or https://sylvestri.com
  --full-name TEXT         Lead full name. Default: Codex Synthetic Lead Check
  --email EMAIL            Lead email. Default: codex-synthetic-<timestamp>@example.com
  --phone TEXT             Lead phone. Default: 8458672646
  --lead-type TYPE         Lead type. Default: seller
  --campaign TEXT          Campaign token. Default: live-lead-verification
  --source TEXT            Source token. Default: live-lead-verification
  --source-path PATH       Source path. Default: /ops/live-lead-verification
  --notes TEXT             Notes. Default: Synthetic live verification submission
  --property-address TEXT  Optional property address for valuation/distress flows
  --help                   Show this help
`);
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    if (key === "help") {
      options.help = true;
      continue;
    }
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    options[key] = value;
    index += 1;
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    return;
  }

  const baseUrl = (options["base-url"] || process.env.NEXT_PUBLIC_SITE_URL || "https://sylvestri.com").replace(
    /\/+$/,
    "",
  );
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const leadType = options["lead-type"] || "seller";

  const payload = {
    fullName: options["full-name"] || "Codex Synthetic Lead Check",
    email: options.email || `codex-synthetic-${timestamp}@example.com`,
    phone: options.phone || "8458672646",
    leadType,
    timeline: "synthetic verification",
    market: "Beacon",
    propertyAddress: options["property-address"] || "",
    notes: options.notes || "Synthetic live verification submission from the repo smoke harness.",
    consentEmail: true,
    consentSms: false,
    source: options.source || "live-lead-verification",
    campaign: options.campaign || "live-lead-verification",
    sourcePath: options["source-path"] || "/ops/live-lead-verification",
    submittedAt: new Date().toISOString(),
  };

  if ((leadType === "home-valuation" || leadType === "seller-distress") && !payload.propertyAddress) {
    throw new Error("leadType requires --property-address for a meaningful verification payload");
  }

  process.stdout.write(`[lead-verify-live] POST ${baseUrl}/api/lead\n`);
  const response = await fetch(`${baseUrl}/api/lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": "203.0.113.42",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => ({}));
  process.stdout.write(`${JSON.stringify({ status: response.status, ...json }, null, 2)}\n`);

  if (!response.ok) {
    throw new Error(`Live lead verification failed with status ${response.status}`);
  }

  process.stdout.write(`
[lead-verify-live] Follow-up checklist
1. Confirm the n8n execution using requestId: ${json.requestId || "(missing)"}.
2. Confirm the lead or event exists in Follow Up Boss.
3. Confirm the operator notification arrived in bot@sylvestri.com.
4. If the response says router forwarding succeeded but downstream systems are missing, the blocker is now in n8n/FUB/mailbox rather than the app.
`);
}

main().catch((error) => {
  console.error("[lead-verify-live] failed", error.message);
  process.exitCode = 1;
});
