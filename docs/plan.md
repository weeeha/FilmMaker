# Film Planner — POC Implementation Plan

**Status:** Phase 0 complete. Ready to run.

## Phase 0 — Bootstrap ✅
- Next.js 16 App Router scaffold (Turbopack, Tailwind v4, src dir)
- AI SDK v6 (`ai`) + zod
- Project structure under `film-planner/`

## Phase 1 — Core flow ✅
- Home page: create project, list projects, delete
- Project page: paste screenplay → parsed scenes/shots
- Per-shot AI image generation (gpt-image-1 via AI Gateway)
- Style notes propagated into image prompts
- localStorage persistence
- Builds clean (`pnpm build`)

## Phase 2 — Polish (next)
- [ ] Loading states + retry on failed generation
- [ ] Drag-to-reorder shots within a scene
- [ ] Shot notes + per-shot inline edit (currently view-only after creation)
- [ ] Export storyboard as PDF (`@react-pdf/renderer` or server-side puppeteer)
- [ ] `.fdx` file upload (XML parser, client-side)
- [ ] Style reference image upload → pass as `images` param to `generateImage` for character/look consistency

## Phase 3 — Persistence upgrade (when needed)
- [ ] Move images to Vercel Blob (currently inline base64)
- [ ] Move project data to Neon Postgres + Drizzle
- [ ] Add Clerk auth for multi-device

## Phase 4 — Stretch
- [ ] Shot list CSV export
- [ ] Beat sheet / treatment generation from logline
- [ ] Text-to-video animatics (scope 2 — Sora/Veo/Runway via AI Gateway)

## Critical files
```
film-planner/
├── src/app/
│   ├── page.tsx                          ← project list
│   ├── projects/[id]/page.tsx            ← editor
│   ├── api/parse-screenplay/route.ts     ← LLM scene extraction
│   └── api/generate-shot/route.ts        ← image generation
├── src/lib/
│   ├── types.ts
│   └── storage.ts                        ← localStorage helpers
└── .env.example
```

## To run
```bash
cd "Film Planning App/film-planner"
cp .env.example .env.local
# add AI_GATEWAY_API_KEY (or OPENAI_API_KEY)
pnpm dev
```

## To deploy
```bash
cd "Film Planning App/film-planner"
vercel             # link / preview
vercel --prod      # production
# add AI_GATEWAY_API_KEY in Vercel dashboard env vars
```
