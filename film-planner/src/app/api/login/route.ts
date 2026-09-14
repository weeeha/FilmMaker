import { cookies } from "next/headers";
import { z } from "zod";
import {
  SESSION_COOKIE,
  apiError,
  clientIp,
  createSession,
  passwordMatches,
  rateLimit,
  rateLimitResponse,
  readJsonBody,
} from "@/lib/api-guard";

const LoginSchema = z.object({
  password: z.string().min(1).max(200),
});

export async function POST(req: Request) {
  try {
    const password = process.env.APP_PASSWORD;
    const secret = process.env.AUTH_SECRET;
    if (!password || !secret) {
      return apiError(
        500,
        "Server auth is not configured.",
        "Set APP_PASSWORD and AUTH_SECRET in the environment (see .env.example).",
      );
    }

    // Throttle guessing before doing any crypto work.
    const limit = rateLimit(`login:${clientIp(req)}`, 10, 10 * 60_000);
    if (!limit.ok) return rateLimitResponse(limit.retryAfter);

    const body = await readJsonBody(req);
    if (!body.ok) return body.response;

    const parsed = LoginSchema.safeParse(body.value);
    if (!parsed.success) {
      return apiError(400, "A password is required.", "Send { password: string }.");
    }

    if (!(await passwordMatches(parsed.data.password, { password, secret }))) {
      return apiError(401, "Incorrect password.");
    }

    const session = await createSession();
    if (!session.ok) {
      return apiError(500, "Could not create a session.", "Check AUTH_SECRET.");
    }

    (await cookies()).set(SESSION_COOKIE, session.token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(session.expiresAt),
    });

    return Response.json({ ok: true });
  } catch (cause) {
    console.error("[login]", cause);
    return apiError(
      500,
      "Sign-in failed.",
      cause instanceof Error ? cause.message : String(cause),
    );
  }
}

export async function DELETE() {
  (await cookies()).delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
