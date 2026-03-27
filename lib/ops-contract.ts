import { createHmac, timingSafeEqual } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

type ValidationResult = {
  ok: true;
};

export type ValidationFailure = {
  ok: false;
  status: number;
  message: string;
};

export type OpsRequestAuthResult = ValidationResult | ValidationFailure;

function safeCompareToken(expected: string, provided: string) {
  const expectedBuffer = Buffer.from(expected, "utf8");
  const providedBuffer = Buffer.from(provided, "utf8");
  if (expectedBuffer.length !== providedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, providedBuffer);
}

function requireHeaderValue(name: string, request: Request) {
  return request.headers.get(name)?.trim() || null;
}

export function validateN8nRequestAuth(request: Request, body: string): OpsRequestAuthResult {
  const webhookToken = process.env.HOSTINGER_N8N_WEBHOOK_TOKEN?.trim();
  if (webhookToken) {
    const providedToken =
      requireHeaderValue("x-hostinger-n8n-webhook-token", request)
      || requireHeaderValue("x-n8n-webhook-token", request)
      || requireHeaderValue("authorization", request)?.replace(/^bearer\s+/i, "");

    if (!providedToken || !safeCompareToken(webhookToken, providedToken)) {
      return {
        ok: false,
        status: 401,
        message: "Unauthorized: invalid or missing HOSTINGER_N8N_WEBHOOK_TOKEN header.",
      };
    }
  }

  const sourceId = process.env.N8N_SOURCE_ID?.trim();
  if (sourceId) {
    const providedSource =
      requireHeaderValue("x-n8n-source-id", request)
      || requireHeaderValue("x-source-id", request);

    if (!providedSource || !safeCompareToken(sourceId, providedSource)) {
      return {
        ok: false,
        status: 401,
        message: "Unauthorized: invalid source id.",
      };
    }
  }

  const signatureSecret = process.env.N8N_SIGNATURE_SECRET?.trim();
  if (signatureSecret) {
    const signature =
      requireHeaderValue("x-n8n-signature", request)
      || requireHeaderValue("x-signature", request);

    if (!signature) {
      return {
        ok: false,
        status: 401,
        message: "Unauthorized: missing n8n signature header.",
      };
    }

    const normalizedSignature = signature.replace(/^sha256=/i, "");
    const expected = createHmac("sha256", signatureSecret).update(body).digest("hex");

    if (!safeCompareToken(expected, normalizedSignature)) {
      return {
        ok: false,
        status: 401,
        message: "Unauthorized: invalid n8n signature.",
      };
    }
  }

  return { ok: true };
}

export function getRepoStatePath(filename: string): string {
  return path.join(process.cwd(), "ops", "state", filename);
}

export function readRepoState<T>(filename: string): T {
  const statePath = getRepoStatePath(filename);
  if (!fs.existsSync(statePath)) return {} as T;
  const raw = fs.readFileSync(statePath, "utf8");
  if (!raw.trim()) return {} as T;
  return JSON.parse(raw) as T;
}

export function writeRepoState<T>(filename: string, payload: T): void {
  const statePath = getRepoStatePath(filename);
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, JSON.stringify(payload, null, 2), "utf8");
}
