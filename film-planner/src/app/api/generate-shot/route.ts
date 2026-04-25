import { generateImage } from "ai";

export async function POST(req: Request) {
  const { description, sceneHeading, styleNotes } = (await req.json()) as {
    description?: string;
    sceneHeading?: string;
    styleNotes?: string;
  };
  if (!description) {
    return Response.json({ error: "Missing description" }, { status: 400 });
  }

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
}
