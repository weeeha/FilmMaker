# FilmMaker — Roadmap

**Status:** Draft v1 · July 2026
**Related:** [product-vision.md](alena-product-vision.md) · [mvp-requirements.md](alena-mvp-requirements.md) · [component-requirements.md](alena-component-requirements.md)

Two tracks run in parallel and feed each other:

- **Product track** — FilmMaker itself (this repo).
- **Design-system track** — the AI component library (separate project), whose backlog is discovered by building FilmMaker.

## Phase 0 — Workflow mastery *(now)*

Goal: reliably produce components with the Claude + shadcn workflow before mass-producing them.

- [ ] Set up the shadcn-based library as the working base (de-branded from prior client work).
- [ ] Generate a first new component from a visual reference (screenshot → Claude → shadcn component).
- [ ] Assemble a one-page interface from library components; then a small multi-page interface.
- [ ] Document the working process (it becomes part of the public case study).

**Exit criteria:** a new component can be produced, themed, and reused with consistent spacing/typography without hand-holding.

## Phase 1 — AI component library (MVP set)

Goal: build the priority components from [component-requirements.md](alena-component-requirements.md).

- [ ] Flow builder set (canvas, node card, ports/edges, run controls) — *first and foremost*.
- [ ] Generation panel family (prompt bar, reference strip, model picker, dynamic settings, cost badge).
- [ ] Media set (gallery, video preview card, timeline/scrubber).
- [ ] Documents & characters set (AI editor block, inline generate popup, character card).
- [ ] Libraries & voice set (voice card, track list, TTS editor layout).

**Exit criteria:** the MVP screens can be assembled entirely from library components.

## Phase 2 — FilmMaker MVP

Goal: the six MVP areas from [mvp-requirements.md](alena-mvp-requirements.md), built on the component library.

Suggested build order:

1. **Projects** (folders, documents, avatars) — extends the existing `film-planner` POC (projects, screenplay parsing, per-shot image generation).
2. **Video Generator** — flow builder + generation panel + results.
3. **Voice Library + Voice Editor** and **Music Library**.
4. **Video Editor** — after a technical spike on in-browser editing feasibility.

**Exit criteria:** one real short film produced end-to-end in FilmMaker (dogfooding), documented as a case study.

## Phase 3 — Beyond MVP

- Direct model API integrations / open-source models to cut generation costs.
- Marketplace features in libraries (buy music/voices).
- Richer video editor.
- Cloud persistence & auth (Vercel Blob / Postgres / Clerk — see [plan.md](plan.md) Phase 3) and multi-device.
- Publish the case study: building an AI product with an AI-built design system.

## Existing POC

The `film-planner` app in this repo (screenplay → scenes/shots → AI reference images) is Phase 1–2 of the original storyboard-planner plan ([plan.md](plan.md)) and becomes the seed of the **Projects/Documents** area in Phase 2 above.
