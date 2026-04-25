# FilmMaker

A single-user AI film-making workspace — idea → story → design → shots → video → final cut.

This is a personal tool for taking a film from screenplay to storyboard (and eventually animatic) using AI generation woven into the workflow contextually, per scene and per shot — not as a separate "tools" menu.

## Status

**Phase 1 complete.** Working today:

- Create / list / delete projects (localStorage)
- Paste a screenplay → LLM extracts scenes and shots
- Per-shot AI image generation (gpt-image-1 via Vercel AI Gateway)
- Style notes propagate into image prompts

See [`../docs/plan.md`](../docs/plan.md) for the roadmap and [`../docs/system-design.md`](../docs/system-design.md) for the v0.2 vision (five-zone pipeline: Bible · Story · Design · Production · Edit).

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind v4
- AI SDK v6 (`ai`) via Vercel AI Gateway
- zod for schema validation
- Planned: Neon Postgres + Drizzle, Vercel Blob for image persistence

## Run locally

```bash
cp .env.example .env.local   # add AI_GATEWAY_API_KEY (or OPENAI_API_KEY)
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Project structure

```
film-planner/
├── src/app/
│   ├── page.tsx                          ← project list
│   ├── projects/[id]/page.tsx            ← editor
│   ├── api/parse-screenplay/route.ts     ← LLM scene extraction
│   └── api/generate-shot/route.ts        ← image generation
└── src/lib/
    ├── types.ts
    └── storage.ts                        ← localStorage helpers
```

Design docs and roadmap live in [`../docs/`](../docs/).
