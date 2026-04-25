"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { loadProject, uid, upsertProject } from "@/lib/storage";
import type { Project, Scene, Shot } from "@/lib/types";

export default function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [project, setProject] = useState<Project | null>(null);
  const [screenplay, setScreenplay] = useState("");
  const [parsing, setParsing] = useState(false);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setProject(loadProject(id) ?? null);
  }, [id]);

  function persist(next: Project) {
    setProject(next);
    upsertProject(next);
  }

  async function parseScreenplay() {
    if (!project || !screenplay.trim()) return;
    setParsing(true);
    setError(null);
    try {
      const res = await fetch("/api/parse-screenplay", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ screenplay }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as {
        scenes: { heading: string; description: string; shots: string[] }[];
      };
      const scenes: Scene[] = data.scenes.map((s) => ({
        id: uid(),
        heading: s.heading,
        description: s.description,
        shots: s.shots.map((d) => ({ id: uid(), description: d })),
      }));
      persist({ ...project, scenes: [...project.scenes, ...scenes] });
      setScreenplay("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Parse failed");
    } finally {
      setParsing(false);
    }
  }

  async function generateShotImage(sceneId: string, shotId: string) {
    if (!project) return;
    const scene = project.scenes.find((s) => s.id === sceneId);
    const shot = scene?.shots.find((sh) => sh.id === shotId);
    if (!scene || !shot) return;
    setGeneratingId(shotId);
    setError(null);
    try {
      const res = await fetch("/api/generate-shot", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          description: shot.description,
          sceneHeading: scene.heading,
          styleNotes: project.styleNotes,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { imageUrl } = (await res.json()) as { imageUrl: string };
      persist({
        ...project,
        scenes: project.scenes.map((s) =>
          s.id !== sceneId
            ? s
            : {
                ...s,
                shots: s.shots.map((sh) =>
                  sh.id !== shotId ? sh : { ...sh, imageUrl },
                ),
              },
        ),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setGeneratingId(null);
    }
  }

  function addShot(sceneId: string) {
    if (!project) return;
    const description = prompt("Shot description (e.g. 'Wide of John entering kitchen')");
    if (!description) return;
    persist({
      ...project,
      scenes: project.scenes.map((s) =>
        s.id !== sceneId
          ? s
          : { ...s, shots: [...s.shots, { id: uid(), description }] },
      ),
    });
  }

  function addScene() {
    if (!project) return;
    const heading = prompt("Scene heading (e.g. 'INT. KITCHEN - NIGHT')");
    if (!heading) return;
    persist({
      ...project,
      scenes: [...project.scenes, { id: uid(), heading, shots: [] }],
    });
  }

  function updateStyle(styleNotes: string) {
    if (!project) return;
    persist({ ...project, styleNotes });
  }

  if (!project) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <Link href="/" className="text-sm text-zinc-500 hover:underline">
          ← Back
        </Link>
        <p className="mt-6 text-sm text-zinc-400">Project not found.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
      <Link href="/" className="text-sm text-zinc-500 hover:underline">
        ← All projects
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">
        {project.title}
      </h1>

      <section className="mt-8">
        <label className="block text-xs font-medium text-zinc-500">
          Style notes (optional — applied to every generated frame)
        </label>
        <input
          value={project.styleNotes ?? ""}
          onChange={(e) => updateStyle(e.target.value)}
          placeholder="e.g. moody noir, high contrast black and white"
          className="mt-2 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
        />
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-zinc-500">Import screenplay</h2>
        <textarea
          value={screenplay}
          onChange={(e) => setScreenplay(e.target.value)}
          placeholder="Paste screenplay text here (any format — sluglines like INT./EXT. help)"
          rows={6}
          className="mt-2 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 font-mono text-xs dark:border-zinc-700"
        />
        <button
          onClick={parseScreenplay}
          disabled={parsing || !screenplay.trim()}
          className="mt-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {parsing ? "Parsing…" : "Extract scenes & shots"}
        </button>
      </section>

      {error && (
        <p className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-zinc-500">Storyboard</h2>
          <button
            onClick={addScene}
            className="text-xs text-zinc-500 hover:underline"
          >
            + Add scene
          </button>
        </div>

        {project.scenes.length === 0 ? (
          <p className="text-sm text-zinc-400">
            No scenes yet. Paste a screenplay above or add one manually.
          </p>
        ) : (
          <div className="space-y-8">
            {project.scenes.map((scene) => (
              <div
                key={scene.id}
                className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-sm font-medium">
                    {scene.heading}
                  </h3>
                  <button
                    onClick={() => addShot(scene.id)}
                    className="text-xs text-zinc-500 hover:underline"
                  >
                    + Add shot
                  </button>
                </div>
                {scene.description && (
                  <p className="mt-2 text-xs text-zinc-500">
                    {scene.description}
                  </p>
                )}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {scene.shots.map((shot) => (
                    <ShotCard
                      key={shot.id}
                      shot={shot}
                      generating={generatingId === shot.id}
                      onGenerate={() => generateShotImage(scene.id, shot.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ShotCard({
  shot,
  generating,
  onGenerate,
}: {
  shot: Shot;
  generating: boolean;
  onGenerate: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
      <div className="aspect-video bg-zinc-100 dark:bg-zinc-900">
        {shot.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={shot.imageUrl}
            alt={shot.description}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-zinc-400">
            {generating ? "Generating…" : "No frame yet"}
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs text-zinc-700 dark:text-zinc-300">
          {shot.description}
        </p>
        <button
          onClick={onGenerate}
          disabled={generating}
          className="mt-2 text-xs text-blue-600 hover:underline disabled:opacity-50"
        >
          {shot.imageUrl ? "Regenerate" : "Generate frame"}
        </button>
      </div>
    </div>
  );
}
