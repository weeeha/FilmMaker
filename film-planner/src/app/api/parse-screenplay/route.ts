import { generateObject } from "ai";
import { z } from "zod";

const SceneSchema = z.object({
  heading: z.string().describe("Slugline like INT. KITCHEN - NIGHT"),
  description: z.string().describe("Action/description lines for this scene"),
  shots: z
    .array(z.string())
    .describe("3-6 shot ideas covering the scene"),
});

const ResponseSchema = z.object({
  scenes: z.array(SceneSchema),
});

export async function POST(req: Request) {
  const { screenplay } = (await req.json()) as { screenplay?: string };
  if (!screenplay || typeof screenplay !== "string") {
    return Response.json({ error: "Missing screenplay text" }, { status: 400 });
  }

  const trimmed = screenplay.trim().slice(0, 30_000);

  const { object } = await generateObject({
    model: "openai/gpt-4o-mini",
    schema: ResponseSchema,
    system:
      "You are a script supervisor. Extract scenes from the screenplay. " +
      "For each scene, propose 3-6 concrete visual shot ideas a director " +
      "could storyboard (wide, medium, close-up, insert, etc.). Keep shot " +
      "ideas short and visual.",
    prompt: trimmed,
  });

  return Response.json(object);
}
