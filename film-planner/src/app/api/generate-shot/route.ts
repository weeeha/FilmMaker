import { generateImage } from "ai";
import { z } from "zod";
import {
  apiError,
  clientIp,
  rateLimit,
  rateLimitResponse,
  readJsonBody,
  requireSession,
  upstreamError,
} from "@/lib/api-guard";

const RequestSchema = z.object({
  description: z.string().trim().min(1).max(500),
  sceneHeading: z.string().trim().max(200).optional(),
  styleNotes: z.string().trim().max(500).optional(),
});

export async function POST(req: Request) {
  try {
    const unauthorized = await requireSession();
    if (unauthorized) return unauthorized;

    // Image generation is the expensive call, so cap it tightly.
    const limit = rateLimit(`generate-shot:${clientIp(req)}`, 10, 5 * 60_000);
    if (!limit.ok) return rateLimitResponse(limit.retryAfter);

    const body = await readJsonBody(req);
    if (!body.ok) return body.response;

    const parsed = RequestSchema.safeParse(body.value);
    if (!parsed.success) {
      return apiError(
        400,
        "Invalid shot request.",
        parsed.error.issues
          .map((issue) => `${issue.path.join(".") || "body"}: ${issue.message}`)
          .join("; "),
      );
    }
    const { description, sceneHeading, styleNotes } = parsed.data;

    const promptParts = [
      "Cinematic storyboard frame.",
      sceneHeading ? `Scene: ${sceneHeading}.` : "",
      `Shot: ${description}.`,
      styleNotes ? `Style: ${styleNotes}.` : "Style: black and white pencil sketch, clean lines.",
      "Composed for a 16:9 frame, no text or watermarks.",
    ]
      .filter(Boolean)
      .join(" ");

    const { image } = await generateImage({
      model: "openai/gpt-image-1",
      prompt: promptParts,
      size: "1536x1024",
    });

    const dataUrl = `data:${image.mediaType};base64,${image.base64}`;
    return Response.json({ imageUrl: dataUrl });
  } catch (cause) {
    return upstreamError("Image generation", cause);
  }
}
