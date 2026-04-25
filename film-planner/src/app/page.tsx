"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  deleteProject,
  loadProjects,
  uid,
  upsertProject,
} from "@/lib/storage";
import type { Project } from "@/lib/types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  function createProject() {
    if (!title.trim()) return;
    const project: Project = {
      id: uid(),
      title: title.trim(),
      createdAt: new Date().toISOString(),
      scenes: [],
    };
    upsertProject(project);
    setProjects(loadProjects());
    setTitle("");
  }

  function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    deleteProject(id);
    setProjects(loadProjects());
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Film Planner</h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Paste a screenplay → get scenes → generate AI storyboard frames per shot.
        </p>
      </header>

      <section className="mb-10 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
        <label className="block text-xs font-medium text-zinc-500">
          New project
        </label>
        <div className="mt-2 flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createProject()}
            placeholder="Untitled film"
            className="flex-1 rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
          />
          <button
            onClick={createProject}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
          >
            Create
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium text-zinc-500">Your projects</h2>
        {projects.length === 0 ? (
          <p className="text-sm text-zinc-400">No projects yet.</p>
        ) : (
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {projects.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between py-3"
              >
                <Link
                  href={`/projects/${p.id}`}
                  className="flex-1 hover:underline"
                >
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-zinc-500">
                    {p.scenes.length} scenes ·{" "}
                    {p.scenes.reduce((n, s) => n + s.shots.length, 0)} shots ·{" "}
                    {new Date(p.createdAt).toLocaleDateString()}
                  </div>
                </Link>
                <button
                  onClick={() => remove(p.id)}
                  className="ml-4 text-xs text-zinc-400 hover:text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
