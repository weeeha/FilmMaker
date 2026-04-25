# Film Planner — POC System Design (ARCHIVED)

> **Superseded by `docs/system-design.md` (v0.2).** This document captures the v0.1 POC as it shipped: Project→Scene→Shot, browser-only, localStorage. Preserved here for historical reference. The v0.1 code in `film-planner/` still runs and is the foundation v0.2 evolves from — the POC was not thrown away, just reframed.

**Status:** v0.1 (POC) — archived 2026-04-24
**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind, AI SDK v6, Vercel AI Gateway, deployed on Vercel
**Scope:** Browser-only POC. Single user. AI storyboard generation from screenplay text. No 3D, no AR, no native.

## Architecture

```
Browser (Next.js client components)
  ├── localStorage           ← projects/scenes/shots state
  ├── /                      ← project list + create
  └── /projects/[id]         ← screenplay paste → parsed scenes → AI frames

Next.js Route Handlers (Vercel Functions, Fluid Compute)
  ├── POST /api/parse-screenplay  → AI SDK generateObject (gpt-4o-mini)
  └── POST /api/generate-shot     → AI SDK generateImage   (gpt-image-1)

Vercel AI Gateway
  └── routes both calls; one API key (AI_GATEWAY_API_KEY)
```

## Data model (client-side only)

```ts
Project { id, title, createdAt, styleNotes?, scenes[] }
Scene   { id, heading, description?, shots[] }
Shot    { id, description, imageUrl?, notes? }
```

Persisted to `localStorage` under key `film-planner:projects`. No DB in v0.1.

## Why this shape (POC trade-offs)

- **No DB, no auth.** Fastest path to a working demo. Multi-device sync = future scope.
- **Images returned inline as base64 data URLs.** Skips Vercel Blob setup. Trade-off: bigger localStorage payload — fine for ~tens of frames; revisit with Blob when projects grow.
- **AI Gateway over direct providers.** One key, swappable models. Falls back to `OPENAI_API_KEY` if gateway not configured (AI SDK behavior).
- **No 3D, no AR.** Out of scope for POC; revisit when the storyboard flow is validated.

## Future (deferred — see v0.2 spec)

- Vercel Blob for image storage
- Neon Postgres + Drizzle for projects (when sync needed)
- PDF export of full storyboard
- `.fdx` upload + parser (currently paste-only)
- Style/character consistency across frames (reference images)
- Text-to-video for animatics (scope 2)
