#!/usr/bin/env node

import { createHmac } from "node:crypto";
import { once } from "node:events";
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const APP_PORT = Number(process.env.LEAD_SMOKE_APP_PORT || "4010");
const ROUTER_PORT = Number(process.env.LEAD_SMOKE_ROUTER_PORT || "4011");
const FUB_PORT = Number(process.env.LEAD_SMOKE_FUB_PORT || "4012");
const APP_BASE_URL = `http://127.0.0.1:${APP_PORT}`;
const ROUTER_BASE_URL = `http://127.0.0.1:${ROUTER_PORT}`;
const FUB_BASE_URL = `http://127.0.0.1:${FUB_PORT}/v1`;
const ROUTER_TOKEN = "local-router-token";
const ROUTER_SIGNING_SECRET = "local-router-signing-secret";
const FUB_TOKEN = "local-fub-token";

const args = new Set(process.argv.slice(2));
const shouldBuild = !args.has("--skip-build");

const routerRequests = [];
const fubRequests = [];
let nextLogs = "";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function createBaseLead(overrides = {}) {
  return {
    fullName: "Lead Smoke",
    email: "lead-smoke@example.com",
    phone: "8458672646",
    leadType: "seller",
    timeline: "30-60 days",
    market: "Beacon",
    propertyAddress: "",
    notes: "Lead smoke baseline",
    leadMagnet: "",
    consentEmail: true,
    consentSms: false,
    source: "lead-smoke",
    campaign: "lead-smoke-router-success",
    sourcePath: "/lead-smoke",
    sourceToken: "lead-smoke",
    submittedAt: "2026-03-28T12:00:00.000Z",
    ...overrides,
  };
}

async function readJsonBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const rawBody = Buffer.concat(chunks).toString("utf8");
  const json = rawBody ? JSON.parse(rawBody) : {};
  return { rawBody, json };
}

function createRouterServer() {
  return createServer(async (request, response) => {
    if (request.method !== "POST") {
      response.writeHead(405, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ ok: false, message: "Method not allowed" }));
      return;
    }

    const { rawBody, json } = await readJsonBody(request);
    routerRequests.push({
      url: request.url,
      headers: request.headers,
      rawBody,
      body: json,
    });

    if (json.source === "router-fail-test") {
      response.writeHead(502, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ ok: false, message: "Forced router failure" }));
      return;
    }

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ ok: true, requestId: json.requestId }));
  });
}

function createFubServer() {
  return createServer(async (request, response) => {
    const { rawBody, json } = await readJsonBody(request);
    fubRequests.push({
      url: request.url,
      headers: request.headers,
      rawBody,
      body: json,
    });

    response.writeHead(201, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ id: "mock-fub-event" }));
  });
}

async function startServer(server, port, label) {
  server.listen(port, "127.0.0.1");
  await once(server, "listening");
  process.stdout.write(`[lead-smoke] ${label} listening on ${port}\n`);
}

async function stopServer(server) {
  if (!server.listening) return;
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
}

async function runCommand(command, commandArgs, env = process.env) {
  const child = spawn(command, commandArgs, {
    env,
    stdio: "inherit",
  });

  const [code] = await once(child, "exit");
  if (code !== 0) {
    throw new Error(`${command} ${commandArgs.join(" ")} exited with code ${code}`);
  }
}

async function waitForApp(baseUrl) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 30_000) {
    try {
      const response = await fetch(`${baseUrl}/robots.txt`);
      if (response.ok) return;
    } catch {}

    await delay(500);
  }

  throw new Error("Timed out waiting for local app server.");
}

async function postLead(payload, forwardedFor = "127.0.0.1") {
  const response = await fetch(`${APP_BASE_URL}/api/lead`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": forwardedFor,
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json().catch(() => ({}));
  return { response, json };
}

async function main() {
  const routerServer = createRouterServer();
  const fubServer = createFubServer();
  let nextServer;

  try {
    await startServer(routerServer, ROUTER_PORT, "mock router");
    await startServer(fubServer, FUB_PORT, "mock FUB");

    if (shouldBuild) {
      process.stdout.write("[lead-smoke] building app\n");
      await runCommand("npm", ["run", "build"]);
    }

    process.stdout.write("[lead-smoke] starting next server\n");
    nextServer = spawn(
      "./node_modules/.bin/next",
      ["start", "--port", String(APP_PORT), "--hostname", "127.0.0.1"],
      {
        env: {
          ...process.env,
          NEXT_PUBLIC_SITE_URL: APP_BASE_URL,
          LEAD_ROUTER_URL: `${ROUTER_BASE_URL}/lead-router`,
          LEAD_ROUTER_TOKEN: ROUTER_TOKEN,
          LEAD_ROUTER_SIGNING_SECRET: ROUTER_SIGNING_SECRET,
          FUB_API_BASE_URL: FUB_BASE_URL,
          FUB_API_TOKEN: FUB_TOKEN,
          SMTP_JSON_TRANSPORT: "true",
          LEAD_NOTIFICATION_EMAILS: "bot@sylvestri.com",
          LEAD_NOTIFICATION_FROM: "Sylvestri Bot <bot@sylvestri.com>",
        },
        stdio: ["ignore", "pipe", "pipe"],
      },
    );

    nextServer.stdout.on("data", (chunk) => {
      const text = chunk.toString();
      nextLogs += text;
      process.stdout.write(text);
    });
    nextServer.stderr.on("data", (chunk) => {
      const text = chunk.toString();
      nextLogs += text;
      process.stderr.write(text);
    });

    await waitForApp(APP_BASE_URL);

    const routedLead = createBaseLead();
    const routedResult = await postLead(routedLead);
    assert(routedResult.response.status === 200, "router success scenario should return 200");
    assert(
      String(routedResult.json.message || "").includes("forwarded to the n8n intake router"),
      "router success scenario should confirm router forwarding",
    );
    assert(routerRequests.length === 1, "router success scenario should hit the router once");
    assert(fubRequests.length === 0, "router success scenario should not hit FUB directly");
    assert(
      routerRequests[0].headers.authorization === `Bearer ${ROUTER_TOKEN}`,
      "router success scenario should send bearer auth to the router",
    );
    assert(routerRequests[0].headers["x-lead-request-id"], "router success should send request id header");
    const expectedSignature = createHmac("sha256", ROUTER_SIGNING_SECRET)
      .update(routerRequests[0].rawBody)
      .digest("hex");
    assert(
      routerRequests[0].headers["x-lead-signature"] === expectedSignature,
      "router success should send a valid HMAC signature",
    );

    const fallbackLead = createBaseLead({
      email: "lead-smoke-fallback@example.com",
      source: "router-fail-test",
      campaign: "lead-smoke-router-fail",
      notes: "Force router failure to exercise direct FUB fallback",
    });
    const fallbackResult = await postLead(fallbackLead);
    assert(fallbackResult.response.status === 200, "fallback scenario should return 200");
    assert(
      String(fallbackResult.json.message || "").includes("direct fallback"),
      "fallback scenario should confirm direct Follow Up Boss delivery",
    );
    assert(routerRequests.length === 2, "fallback scenario should still hit the router");
    assert(fubRequests.length === 1, "fallback scenario should hit direct Follow Up Boss once");
    assert(
      String(fubRequests[0].headers.authorization || "").startsWith("Basic "),
      "fallback scenario should send Follow Up Boss basic auth",
    );

    const missingFieldsResult = await postLead({ fullName: "Missing Email" });
    assert(missingFieldsResult.response.status === 400, "missing fields scenario should return 400");

    const addressRequiredResult = await postLead(
      createBaseLead({
        email: "lead-smoke-home-valuation@example.com",
        leadType: "home-valuation",
        source: "lead-smoke-home-valuation",
        campaign: "lead-smoke-home-valuation",
        propertyAddress: "",
      }),
    );
    assert(
      addressRequiredResult.response.status === 400,
      "address-required scenario should reject missing propertyAddress",
    );

    const honeypotResult = await postLead(
      createBaseLead({
        email: "lead-smoke-honeypot@example.com",
        honeypot: "spam",
      }),
    );
    assert(honeypotResult.response.status === 202, "honeypot scenario should return 202");
    assert(routerRequests.length === 2, "honeypot scenario should not hit the router");
    assert(fubRequests.length === 1, "honeypot scenario should not hit FUB");

    const rateLimitedBase = createBaseLead({
      email: "lead-smoke-rate-limit@example.com",
      campaign: "lead-smoke-rate-limit",
      source: "lead-smoke-rate-limit",
      leadType: "buyer",
    });
    let rateLimitResponse = null;
    for (let index = 0; index < 7; index += 1) {
      rateLimitResponse = await postLead(rateLimitedBase, "203.0.113.20");
    }
    assert(rateLimitResponse?.response.status === 429, "rate-limit scenario should return 429 on the seventh request");

    await delay(750);
    assert(
      nextLogs.includes("[lead-intake] notification preview") && nextLogs.includes("bot@sylvestri.com"),
      "SMTP JSON transport should log a bot@sylvestri.com notification preview",
    );

    process.stdout.write("[lead-smoke] all checks passed\n");
  } finally {
    if (nextServer) {
      nextServer.kill("SIGTERM");
      await once(nextServer, "exit").catch(() => undefined);
    }
    await stopServer(routerServer);
    await stopServer(fubServer);
  }
}

main().catch((error) => {
  console.error("[lead-smoke] failed", error);
  process.exitCode = 1;
});
