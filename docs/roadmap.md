# FilmMaker - Roadmap

Status: draft for Nick's review, 2026-09-13. Proposed unless marked Decided.

## TL;DR

Five phases, no dates. Phase 0 is Nick's decision on one product or two (decision 16), plus repo cleanup. Phases 1 and 2 then run in parallel: Nick finishes Film Writer's Scenario screens (Phase 1), Alena finishes the flow-builder design system (Phase 2, in flight). Phase 3 joins them to wire generation into the app. Phase 4 assembles a film end to end. Everything from Phase 1 on is written assuming Nick picks option A in Phase 0; picking B or C means rewriting Phase 1 onward.

Legend: D1 = `docs/archive/2026-07-alena-*.md` (Alena, flow-first studio). D2 = `docs/archive/system-design-v0.2.md` (Nick, scene-centered, called canonical 2026-07-21). D3 = Repo B's `docs/superpowers/specs/2026-07-21-film-writer-ia-design.md` (object model and nav) plus `docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md` (the v2 rebuild that is Film Writer as it runs today). Full history in [vision.md](vision.md) and [decisions.md](decisions.md).

## Phase 0's first task: one product or two

Decision 16 in [decisions.md](decisions.md) is Open. Options for Nick:

| Option | Shape | Cost |
|---|---|---|
| A (recommended) | One product. Film Writer is the app. Alena's node-flow components become its Produce zone, ported onto Film Writer's primitive layer (Radix, Phosphor, its own tokens) and living in Repo B as a package. Repo A keeps docs and archive, or folds into Repo B. | Alena's Base UI to Radix port, and a shared token set; hers to weigh. |
| B | Two products with a hand-off. Film Writer exports a shot's context (scene text, linked records, images, style note); FilmMaker's flow builder imports it. Each keeps its own stack and name. | An export/import contract to build and keep in sync. |
| C | FilmMaker stays a design-system case study with no app of its own. Film Writer adopts individual node components as needed. | No Produce zone inside Film Writer; generation stays ad hoc. |

**Every phase below Phase 0 is written for option A.** If Nick picks B or C, Phase 1 onward needs rewriting.

## Tracks and owners

| Track | Owner | Covers |
|---|---|---|
| App | Nick | Phase 1; joint work in 0, 3, 4 |
| Design system | Alena | Phase 2; joint work in 0, 3, 4 |

Phase 1 (app track) runs alongside Phase 2 (design-system track) once Phase 0 is done. Phase 3 needs both tracks finished, because it opens the design system's flow canvas from the app's Shot page.

## Phases

### Phase 0: Consolidate (both)

- Goal: one decided product shape, one doc set, no stale branches.
- Owner track: both.
- Scope:
  - Decide one product or two (decision 16), the product name (decision 17), and where the flow components live.
  - In Repo A: merge or close `origin/design-system` (tip 72c817e, Alena's, 2026-09-13), `origin/remove-film-planner`, and `origin/claude/add-claude-documentation-sPdvu` (stale root CLAUDE.md).
  - Delete Repo A's frozen `film-planner/` (recommended; Repo B is the app, and `origin/remove-film-planner` already intended this). If it is kept instead, add `.env.example` and CI to it.
  - Replace the existing docs with this set: `vision.md`, `system-design.md`, `design-system.md`, `roadmap.md` (this file), `decisions.md`, `reference-products.md`, and the `archive/` folder.
  - Fix both READMEs so each names the other repo. Repo A's currently lists D1 as the primary docs and mislabels D2 as "technical design of the POC"; Repo B's README does not mention Repo A at all.
- Exit criterion: decisions recorded in `decisions.md`, one doc set, no stale branches in Repo A.
- Depends on: nothing; this phase starts the plan.

### Phase 1: Finish Scenario (app, Nick)

- Goal: a scene can be written, its shots listed, and a shot opened, all from the running app.
- Owner track: app (Nick).
- Scope: Film Writer's own Scenario surface is built but not fully wired (`Film Writer and Planner/README.md`, Product components row; verified against `film-planner/src/components/app`, which has `scene-board.tsx` and `shot-view.tsx` with their own tests and stories, and against `film-planner/src/app`, where neither `SceneBoard` nor `ShotView` appears in any route file).
  - Wire the Board, Write, Scene page, and Shot page routes; the components already exist, they are not mounted.
  - Mount the 3D blocking stage (`src/stage`, `src/components/stage`) on the Scene and Shot pages.
  - Ship Generate text. `AGENTS.md`'s conventions describe the Vercel AI Gateway pattern for model calls, but Generate text itself is prop plumbing only today; only Generate image is wired.
  - Make scene bodies link sources, so a scene's `[[mentions]]` feed the same `links` table shots already use.
  - Triage Repo B's unmerged branches (`claude/project-ui-1caa95`, `claude/v2-m1-shell`, `backup/pre-email-rewrite`); decide keep, merge, or close.
- Exit criterion: a scene written in Write, its shots listed, a Shot page opened, all from the running app.
- Depends on: Phase 0 (needs the one-product decision, since it decides which repo this work lands in).

### Phase 2: Flow builder (design system, Alena; in flight)

- Goal: a shot's flow can be assembled and run in Storybook, cost visible throughout.
- Owner track: design system (Alena). In flight.
- Scope: unchanged from the earlier plan, plus the port implied by Phase 0's decision.
  - Flow canvas wrapper on xyflow, with edges.
  - Global run toolbar with a cost estimate.
  - Generation panel family: prompt bar, reference strip, model picker, dynamic settings, cost badge, balance.
  - One shared execution status enum across all node types.
  - Upload/Asset node and Image composition node.
  - Fix known contradictions: avatar port colour (spec says blue, `components/ai/node-port.tsx` renders tan), the `node-port.tsx` summary comment, and `stories/ai-node.stories.tsx` (it documents the stock ai-elements Node, not `components/ai/ai-node.tsx`).
  - State matrices and spec pages for the `super-ai` components (they currently have one Default story each and no spec page).
  - If Phase 0 picks option A: port the node family from Base UI to Radix and from Lucide to Phosphor, onto Film Writer's own design system (`design-system.md`, Repo A vs Repo B conflict).
- Exit criterion: a shot's flow can be assembled and mock-run entirely in Storybook, with cost shown before and after the run.
- Depends on: nothing from the app track; runs in parallel with Phase 1.

### Phase 3: Produce (both)

- Goal: one scene generated end to end from the app, with cost visible.
- Owner track: both.
- Scope:
  - Additive migrations only, matching Film Writer's existing habit: `images` gains nullable `run_id` and a `status` column (`'done'` default, `'approved'`); a new `media` table for generated video and audio; new `flows` and `runs` tables.
  - Add the pinned **Produce** tab to Film Writer's shell, after Scenario, the same mechanism v2 uses to pin Scenario itself. Produce holds the Storyboard board and the Generation queue.
  - Open a flow from a Shot page; never a top-level "Generate video" destination.
  - Seed a new flow from `links`: one Avatar node per Characters record with a cover image, reference inputs from linked World and Props records' images, `films.style_note` prepended to every prompt node.
  - Real model calls via Vercel AI Gateway: gpt-image-1 for images, Seedance 2 for video, ElevenLabs for speech, gpt-4o-mini for text (decision 3; access paths unverified, so treat as decided-pending-verification).
  - An executor per mode (decision 18, proposed): hosted mode adds Workflow DevKit for video jobs; local mode uses an in-process worker that re-scans `runs` on startup, so a run in flight when the process died is marked failed with retry.
  - Approve step: only `approved` images and media flow onward to the Storyboard board and the Edit timeline.
  - Per-run and per-film cost totals, surfaced on Home.
- Exit criterion: one scene generated end to end from the app, every run's cost visible.
- Depends on: Phase 1 (needs a Shot page to open a flow from) and Phase 2 (needs the finished flow canvas and node family).

### Phase 4: Assemble (both)

- Goal: one short film made in the app, written up as a case study.
- Owner track: both.
- Scope:
  - Read-only timeline of approved clips first, then trim, reorder, replace, and one audio track.
  - Music and voice pickers.
  - Export spike; can reuse Repo B's WebCodecs and `mp4-muxer` clip pipeline already built for the 3D stage.
- Exit criterion: one short film made in the app (dogfood), written up as the case study D1 promised.
- Depends on: Phase 3 (needs approved clips to assemble).

### Later (unscheduled)

- Direct model APIs and open-source models, for cost.
- Multi-user and sharing.
- Marketplace.
- `.fdx` import.
- PDF and CSV export.
- Continuity scans.
- 3D, AR, and native apps stay out (decision 1).

## What changed from the earlier plans

| Old plan | Old phase | Where it went |
|---|---|---|
| D1's roadmap (`docs/archive/2026-07-alena-roadmap.md`) | Phase 0, Workflow mastery | Folded into Phase 2's "in flight" status; not tracked as a separate phase here. |
| D1's roadmap | Phase 1, AI component library MVP | Phase 2, Flow builder. |
| D1's roadmap | Phase 2, FilmMaker MVP (Projects, Video Generator, Voice Library, Voice Editor, Video Editor) | Split across Phase 1 (Finish Scenario), Phase 3 (Produce), and Phase 4 (Assemble); Libraries and Voice Editor are no longer zones (`vision.md`). |
| D1's roadmap | Phase 3, Beyond MVP | Later, unscheduled. |
| `docs/archive/plan-poc-v0.1.md`, Phase 0-1 (Bootstrap, core flow) | Shipped | Frozen POC; Repo A recommends deleting it in Phase 0 rather than continuing it. |
| `docs/archive/plan-poc-v0.1.md`, Phase 2, Polish | Superseded | POC-specific tasks (drag-to-reorder, PDF export, `.fdx` upload) reappear as Later items where Film Writer still wants them. |
| The earlier draft's Phase 1, Foundation (Clerk auth, films page, deploy) | Happened, then partly reversed | Repo B built the films list, film creation, and hosted-mode env seams for Neon, Blob, and Clerk. Then decision 13 (v2, local-first, no auth) made all three optional, and decision 14 turned them into opt-in env seams rather than a required setup step. |
| The earlier draft's Phase 1, Foundation and Phase 2, Write | Replaced by Phase 1, Finish Scenario | Film Writer's object model, categories, subcategories, fields, tags, and links are already built and shipped (decision 11); the remaining work is wiring the Scenario screens, not building the model. |
| D2 section 9, Phase 0, v0.1 POC | Same as above | The frozen POC. |
| D2 section 9, Phase 1, v0.2 MVP | Split across Phase 1 (Finish Scenario) and Phase 3 (Produce) | D2's typed Character/Location/Asset tables were replaced by D3's object model (decision 6), then by Film Writer's actual `images`/`media`/`flows`/`runs` tables (`system-design.md`). |
| D2 section 9, Phase 2, v0.3 | Phase 3 (voice generation) and Phase 4 (sound mix, timeline, PDF export, `.fdx` upload) | |
| D2 section 9, Phase 3, v0.4 | Later, unscheduled (continuity scans, beat-sheet generator, multi-device sync, MP4 export) | |

## Parallelism note

Phase 1 (app track) runs alongside Phase 2 (design-system track); neither blocks the other. Phase 3 needs both tracks finished, because it opens a flow (Phase 2's canvas) from a Shot page (Phase 1's Scenario) and persists the result in Film Writer's database.

## How to update this doc

Each phase gets a checkbox once work on it starts, and its own line for what shipped. Add a start date to a phase only when it actually starts; do not pre-date phases that have not begun. Example:

```
### Phase 1: Finish Scenario (app)
- [x] Started YYYY-MM-DD.
- [ ] First scope item.
- [x] Second scope item. Shipped YYYY-MM-DD.
```

Do not renumber phases once work has started on any of them; add a new phase after Later instead of inserting one.
