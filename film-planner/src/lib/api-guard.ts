import { cookies } from "next/headers";

/**
 * Server-side guard for the AI routes. These routes spend real money through
 * the Vercel AI Gateway, so they must never be reachable by an unauthenticated
 * caller. Everything here is dependency-free and runs on Web Crypto so it works
 * in both the Node and Edge runtimes.
 */

export const SESSION_COOKIE = "fp_session";

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const encoder = new TextEncoder();

type AuthConfig = { password: string; secret: string };

function readAuthConfig(): AuthConfig | null {
  const password = process.env.APP_PASSWORD;
  const secret = process.env.AUTH_SECRET;
  if (!password || !secret) return null;
  return { password, secret };
}

function base64url(buffer: ArrayBuffer): string {
  let binary = "";
  for (const byte of new Uint8Array(buffer)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(key: string, payload: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return base64url(await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(payload)));
}

/** Constant-time compare. Only safe for equal-length inputs, which is why every
 *  caller compares HMAC digests rather than raw secrets. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** Signing key derived from the password, so rotating APP_PASSWORD invalidates
 *  every existing session cookie. */
function sessionKey(config: AuthConfig): Promise<string> {
  return hmac(config.secret, `pw:${config.password}`);
}

export async function passwordMatches(
  candidate: string,
  config: AuthConfig,
): Promise<boolean> {
  const [given, expected] = await Promise.all([
    hmac(config.secret, `pw:${candidate}`),
    sessionKey(config),
  ]);
  return timingSafeEqual(given, expected);
}

export async function createSession(): Promise<
  { ok: true; token: string; expiresAt: number } | { ok: false }
> {
  const config = readAuthConfig();
  if (!config) return { ok: false };
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const signature = await hmac(await sessionKey(config), `session:${expiresAt}`);
  return { ok: true, token: `${expiresAt}.${signature}`, expiresAt };
}

async function isValidSession(token: string, config: AuthConfig): Promise<boolean> {
  const separator = token.indexOf(".");
  if (separator === -1) return false;
  const expiresAt = Number(token.slice(0, separator));
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  const expected = await hmac(await sessionKey(config), `session:${expiresAt}`);
  return timingSafeEqual(token.slice(separator + 1), expected);
}

export function apiError(status: number, error: string, hint?: string): Response {
  return Response.json(hint ? { error, hint } : { error }, { status });
}

/**
 * Returns an error Response when the caller is not signed in, or `null` when
 * the request may proceed. Fails closed: a missing APP_PASSWORD/AUTH_SECRET
 * blocks the route rather than leaving it open.
 */
export async function requireSession(): Promise<Response | null> {
  const config = readAuthConfig();
  if (!config) {
    return apiError(
      500,
      "Server auth is not configured.",
      "Set APP_PASSWORD and AUTH_SECRET in the environment (see .env.example).",
    );
  }
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) {
    return apiError(401, "Not signed in.", "Open /login and enter the app password.");
  }
  if (!(await isValidSession(token, config))) {
    return apiError(
      401,
      "Session expired or invalid.",
      "Open /login and sign in again.",
    );
  }
  return null;
}

export function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Per-instance sliding-window limiter. Serverless instances do not share
 * memory, so this is defence in depth behind the session check rather than a
 * global cap — it bounds the damage of a single hot instance, not the fleet.
 */
const buckets = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 5_000;

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const cutoff = now - windowMs;

  if (buckets.size > MAX_TRACKED_KEYS) {
    for (const [tracked, hits] of buckets) {
      if (hits.length === 0 || hits[hits.length - 1] <= cutoff) buckets.delete(tracked);
    }
  }

  const hits = (buckets.get(key) ?? []).filter((at) => at > cutoff);
  if (hits.length >= limit) {
    buckets.set(key, hits);
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((hits[0] + windowMs - now) / 1000)),
    };
  }

  hits.push(now);
  buckets.set(key, hits);
  return { ok: true };
}

export function rateLimitResponse(retryAfter: number): Response {
  return Response.json(
    {
      error: "Rate limit reached.",
      hint: `Too many requests. Try again in ${retryAfter}s.`,
    },
    { status: 429, headers: { "retry-after": String(retryAfter) } },
  );
}

/**
 * Parses the request body as a JSON object. A malformed body, a non-JSON body,
 * or a bare `null`/array all become a 400 instead of a TypeError at the
 * destructuring site.
 */
export async function readJsonBody(
  req: Request,
): Promise<{ ok: true; value: Record<string, unknown> } | { ok: false; response: Response }> {
  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return {
      ok: false,
      response: apiError(400, "Request body must be valid JSON."),
    };
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {
      ok: false,
      response: apiError(400, "Request body must be a JSON object."),
    };
  }
  return { ok: true, value: parsed as Record<string, unknown> };
}

/** Turns an unknown thrown value into an actionable 502 rather than an opaque 500. */
export function upstreamError(context: string, cause: unknown): Response {
  const detail = cause instanceof Error ? cause.message : String(cause);
  console.error(`[${context}]`, cause);
  return Response.json({ error: `${context} failed.`, hint: detail }, { status: 502 });
}
