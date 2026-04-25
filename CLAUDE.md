# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

This is not a flat project — the Next.js app lives one level deep:

```
FilmMaker/
├── docs/                  ← design docs + roadmap (read before non-trivial changes)
│   ├── plan.md            ← phased roadmap, current status
│   ├── system-design.md   ← v0.2 vision (five-zone pipeline)
│   └── archive/           ← superseded designs (incl. abandoned Apple-native plan)
└── film-planner/          ← the Next.js app — all pnpm/dev commands run from here
    ├── AGENTS.md          ← imported by film-planner/CLAUDE.md (see below)
    └── src/{app,lib}/
```

All `pnpm` commands must be run from `film-planner/`, not the repo root.

## Critical: Next.js 16 + React 19 + AI SDK v6

`film-planner/AGENTS.md` (imported by `film-planner/CLAUDE.md`) explicitly warns: **this is not the Next.js you know.** Versions in use:

- Next.js **16.2.4** (App Router, Turbopack)
- React **19.2.4**
- `ai` (Vercel AI SDK) **^6**
- Tailwind **v4** (PostCSS plugin, not the v3 config file)
- ESLint **9** flat config (`eslint.config.mjs`)

Don't trust training-data memory for these. Before touching Next.js APIs, hooks, route handlers, params typing, or AI SDK calls, **read the relevant guide in `node_modules/next/dist/docs/`** (or the AI SDK equivalent). Heed deprecation notices in build/lint output.

Concrete examples already in this codebase that differ from older patterns:
- Dynamic route params are a `Promise` unwrapped with `use()` — see `src/app/projects/[id]/page.tsx:13`.
- AI SDK v6 calls take a string model id like `"openai/gpt-4o-mini"` (gateway-prefixed), not a provider object — see `src/app/api/parse-screenplay/route.ts:25`.
- `generateImage` returns `{ image: { mediaType, base64 } }` — see `src/app/api/generate-shot/route.ts:23`.

## Commands

Run from `film-planner/`:

```bash
pnpm install
pnpm dev      # Next dev server (Turbopack) at http://localhost:3000
pnpm build    # production build — gate before declaring work done
pnpm start    # serve production build
pnpm lint     # ESLint (flat config)
```

There is **no test suite** configured. Verify changes via `pnpm build` + manual browser testing of the affected flow (project list → project page → screenplay parse → shot generate).

## Environment

Create `film-planner/.env.local` with one of:

- `AI_GATEWAY_API_KEY` (preferred — routes through Vercel AI Gateway)
- `OPENAI_API_KEY` (fallback)

Both API routes (`parse-screenplay`, `generate-shot`) hit OpenAI models through the AI SDK and will fail without one of these.

## Architecture (Phase 1 — what's actually shipped today)

The product vision in `docs/system-design.md` is a five-zone pipeline (Bible · Story · Design · Production · Edit). **What's implemented today is much smaller** — only the bottom of the Production zone:

```
Home (project list)  →  Project page (editor + storyboard)
                            │
                            ├─ POST /api/parse-screenplay   (text → scenes/shots via gpt-4o-mini + zod)
                            └─ POST /api/generate-shot      (shot description → image via gpt-image-1)
```

Data flow & persistence:

- **Single-user, browser-first.** All project/scene/shot state lives in `localStorage` under the key `film-planner:projects`. Helpers in `src/lib/storage.ts` (`loadProjects`, `upsertProject`, `deleteProject`, `uid`).
- **No DB, no auth, no server state.** API routes are stateless transforms (text → JSON, prompt → image). The route in `generate-shot` returns the image as an inline `data:` URL, which then gets stored in localStorage with the rest of the project — this is intentional for Phase 1 but is the reason `docs/plan.md` flags moving images to Vercel Blob in Phase 3.
- **Type spine** is in `src/lib/types.ts`: `Project → Scene[] → Shot[]`. Keep these the source of truth; API route Zod schemas should produce shapes that map cleanly onto them.
- **Style propagation.** `project.styleNotes` is read on the client and passed into every `/api/generate-shot` call so generations stay visually consistent. Anything that affects look-of-frame should flow through this same channel rather than being hard-coded in the route.

## Design principles to preserve when extending

From `docs/system-design.md` — these are non-obvious and worth honoring even on small changes:

- **Scene-centered.** The Scene is the convergence point for story, characters, location, dialogue, shots, and generated assets. New features should attach to scenes (or things scenes reference), not become standalone tools.
- **AI surfaced contextually, never as a "tools" menu.** Don't add a top-level "Generate character / Generate location / Generate video" nav. Instead surface "this scene is missing a location render → generate" inline. The current "Generate frame" button on each `ShotCard` is the model.
- **Single-user assumption.** No multi-tenant, no collaboration, no auth in MVP. Don't add user IDs, sharing, or permissions speculatively.

## Roadmap awareness

`docs/plan.md` lists Phase 2/3/4 work (drag-reorder, PDF export, .fdx upload, Neon + Drizzle, Vercel Blob, Clerk, animatics). Before starting anything that looks like one of those items, read that file — the phasing exists for a reason (e.g. don't add Postgres before there's a real persistence pain point).

## Working branch

Per repo conventions, develop on the designated feature branch (currently `claude/add-claude-documentation-sPdvu`); don't push to `main`.
