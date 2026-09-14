# FilmMaker

Status: draft for Nick's review, 2026-09-13. Proposed unless marked Decided.

## TL;DR

One product, three zones, is Proposed (decision 15) and awaiting Nick's confirmation: **Write** (world, cast, script as data-driven objects), **Produce** (node-flow generation scoped to a shot), and **Edit** (a read-only timeline of approved clips first, a light editor later), under a Home that shows progress and next actions. Two things are still Open: whether this is one product or two and where the flow components live (decision 16, recommendation A: one product, Film Writer is the app), and the product name itself (decision 17: this repo says FilmMaker, the live app says Film Writer). This repo holds Alena's node-flow design system, the docs, and a frozen proof of concept. The live app is Repo B, `weeeha/Film-Planner-`. See `docs/roadmap.md` for the plan and `docs/decisions.md` for what is decided versus proposed.

## Product

Write a film as a world of linked objects (locations, cast, scenes, shots) with `[[wiki links]]` and backlinks. Open a generation flow from a shot, pre-seeded from that object graph (an avatar node per linked character, reference images from linked objects, the film's style note in every prompt), so nothing is typed twice. Approve what a flow produces, then assemble approved clips into a cut. Cost is shown before and after every generation run.

## Documentation

| Doc | What's inside |
|---|---|
| [Vision](docs/vision.md) | Problem, product statement, experience principles, non-goals |
| [System design](docs/system-design.md) | Domain model, zones, screens |
| [Design system](docs/design-system.md) | Component inventory, known defects, open UI-stack conflict |
| [Roadmap](docs/roadmap.md) | Phases, owners, exit criteria |
| [Decisions](docs/decisions.md) | Decision log: date, status, who, what it replaced |
| [Reference products](docs/reference-products.md) | Flagship products studied per component group |
| `docs/archive/` | Superseded specs (the three prior product definitions and the POC plan), kept unchanged for history |

## Current state

- **`design-system/`** (this repo) is Alena's active project: 60 shadcn/ui primitives, AI Elements, a `components/ai` node shell (AINode, NodePort, RunButton, NodeMenu), nine `super-ai` chat and settings primitives, and 13 node types under `src/stories/nodes/` (avatar, composition, dubbing, image-generation, lip-sync, llm, music, sound-effects, speech, text, video-generation, voice-changer, voice-isolator), each with stories, spec and doc pages. Commit `72c817e` (2026-09-13, adds RunMenu, CostTooltip, node menus, a run-button spec, and a `/playground/nodes` page) is unmerged into this branch.
- **`film-planner/`** here is the frozen v0.1 POC from April 2026 (paste a screenplay, extract scenes and shots, generate one reference image per shot, localStorage persistence). `docs/roadmap.md` Phase 0 recommends deleting it: the live app is Repo B, not this folder.
- **Film Writer, in `weeeha/Film-Planner-`** (local folder `Film Writer and Planner`) is the live app, not a foundation in progress. 22 PRs merged to `main` between 2026-07-21 and 2026-09-04 (last: PR #25, "3D model viewer"). It runs local-first on embedded PGlite with opt-in hosted seams for Neon, Vercel Blob and Clerk; 13 tables per its own README; 58 test files and 38 Storybook stories; its own design tokens on Radix primitives and Phosphor duotone icons, separate from this repo's design-system. Built and wired: films list and creation, the app shell, collections in five list views (table, gallery, masonry, sequence, map), View Record with mentions and backlinks, images with lightbox, a 3D model viewer, search, capture inbox, and Generate image. Built and tested but not wired to a route: the scene board, shot view, and the 3D stage. Absent: Generate text, an approval state on images, flows or node canvas, and export.

## Repositories and folders

| Repo | Local folder | Holds |
|---|---|---|
| `weeeha/FilmMaker` (this repo) | `Film Maker APp` | `docs/`, the active `design-system/` (Alena's node-flow components), and the frozen `film-planner/` v0.1 POC. CI deploys Storybook to GitHub Pages only. |
| `weeeha/Film-Planner-` | `Film Writer and Planner` | Film Writer, the live app: its `film-planner/`, Drizzle schema and migrations, PGlite test harness, and specs under `docs/superpowers/`. `main` at `58987e2`, last commit 2026-09-04. |

## Stack

| Package | Framework | Language | UI | Notes |
|---|---|---|---|---|
| `film-planner/` (this repo, frozen POC) | Next.js 16.2.4 | TypeScript ^5 | Tailwind ^4 | `ai` ^6.0.168, `zod` ^4.3.6, React 19.2.4 |
| `design-system/` (this repo) | Vite ^8.1.1, Storybook ^10.5.0 | TypeScript ~6.0.2 | Tailwind CSS ^4.3.2, `@base-ui/react` ^1.6.0, `radix-ui` ^1.6.2, `lucide-react` ^1.24.0 | `ai` ^7.0.22, `@xyflow/react` ^12.11.2, React ^19.2.7 |
| `film-planner/` (Repo B, live app) | Next.js 16.2.4 | TypeScript ^5 | Tailwind ^4, `radix-ui` ^1.6.4, `@phosphor-icons/react` 2.1.10 (`@base-ui/react` ^1.6.0 present, unused) | `ai` ^6.0.168, `drizzle-orm` 0.45.2, `@electric-sql/pglite` ^0.5.4, `@neondatabase/serverless` ^1.1.0, `@vercel/blob` ^2.8.0, `@clerk/nextjs` ^7.8.0, `@react-three/fiber` ^9.6.1 |

This repo's `design-system/` is on Base UI plus Lucide; the live app is on Radix plus Phosphor (Base UI is an unused dependency there). That conflict is open, recorded in `docs/decisions.md` rather than resolved here.

## Running the packages

**design-system** (this repo)

```bash
cd design-system
npm install
npm run dev          # Vite demo app
npm run storybook    # http://localhost:6006
```

**Film Writer** (`weeeha/Film-Planner-`, local folder `Film Writer and Planner`)

```bash
cd film-planner
pnpm install
pnpm dev
```

Nothing external is required: no database server, no auth provider, no keys. PGlite runs embedded in the process; migrations apply on first page load.

## Known gaps

- `film-planner/` in this repo has no `.env.example` (`.gitignore` matches `.env*` with no negation) and no tests.
- No CI for the app packages in this repo; the existing CI only builds and deploys Storybook.
- Stale branches to merge or close in this repo: `origin/design-system` (tip `72c817e`, unmerged), `origin/remove-film-planner`, `origin/claude/add-claude-documentation-sPdvu`.
- On 2026-09-13 an automated review moved the checkout of `weeeha/Film-Planner-` from `claude/project-rulebook` to `main`. No tracked files were changed. Nick may want to switch it back.

## Contributors

Nick (product, app) and Alena (design system, components).
