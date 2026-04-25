"use client";

import type { Project } from "./types";

const KEY = "film-planner:projects";

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Project[]) : [];
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(projects));
}

export function loadProject(id: string): Project | undefined {
  return loadProjects().find((p) => p.id === id);
}

export function upsertProject(project: Project) {
  const all = loadProjects();
  const idx = all.findIndex((p) => p.id === project.id);
  if (idx >= 0) all[idx] = project;
  else all.unshift(project);
  saveProjects(all);
}

export function deleteProject(id: string) {
  saveProjects(loadProjects().filter((p) => p.id !== id));
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
