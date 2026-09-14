# FilmMaker - Decision Log

Status: draft for Nick's review, 2026-09-13. Proposed unless marked Decided.

## TL;DR

Nineteen entries, in date order. Entries 1 to 3 are April 2026 decisions that still stand: web on Next.js, the frozen v0.1 POC, and the providers named in D2 section 11. Entries 4 to 12 are July and August 2026 decisions, mostly made in Repo B (Film Writer): the flow-first plan (D1), scene-centered design (D2), the world-first object model (D3's IA spec), hosted storage (later reversed then made optional), a UI stack that conflicts with Repo A's design system, a scene-workspace tab resolution never built, the 3D stage and scene builder, structure-and-fields with capture inbox, and the image-forward visual identity. Entries 13 and 14 are Nick's local-first rebuild (v2) and its hosted-mode amendment. Entries 15 to 18 date from 2026-09-13: one product in three zones (Proposed), one product or two and where the flow components live (Open), the product name (Open), and the generation runtime under local-first (Open, with a proposal). Entry 19 is the doc-set replacement (Decided, executed). A Proposed or Open entry becomes Decided only when Nick edits its status line himself.

## How to read this log

- **Decided** - happened, and stays true until a later entry supersedes it. Cite the date it was made, not the date it is written up.
- **Proposed** - this document's recommendation. Not acted on. Do not build against a Proposed entry as if it were settled.
- **Open** - a known conflict or unresolved question, written down so it is not lost, not settled here.
- A Proposed or Open entry only moves to Decided when Nick edits its status line in this file. No other event, including code being written against it, changes the status.

## Legend: D1, D2, D3

| Label | Document | Path |
|---|---|---|
| D1 | Alena's MVP documentation, 2026-07-14 | `docs/archive/2026-07-alena-product-vision.md`, `2026-07-alena-mvp-requirements.md`, `2026-07-alena-component-requirements.md`, `2026-07-alena-roadmap.md` (Repo A) |
| D2 | System design v0.2 | `docs/archive/system-design-v0.2.md` (Repo A) |
| D3 | Film Writer IA spec plus the v2 rebuild | `docs/superpowers/specs/2026-07-21-film-writer-ia-design.md` (2026-07-21) and `2026-08-22-film-writer-v2-rebuild-design.md` (2026-08-22), both Repo B (`Film Writer and Planner`) |

## Entries

### 1. 2026-04-24 - Web app on Next.js and Vercel, not native Apple (Decided)

Context: an earlier plan targeted native Apple apps. Decision: build a web app on Next.js, deployed on Vercel. No reasoning was recorded at the time; the fact is stated in D2 section 1.

Replaced: `docs/archive/plan-apple-native.md` and `system-design-apple-native.md`.

Written down in: D2 section 1 (Repo A, `docs/archive/system-design-v0.2.md`).

### 2. 2026-04-25 - v0.1 POC scope (Decided, shipped, now frozen)

Context: first working version of the app. Decision: paste a screenplay, parse it into scenes and shots, generate one image per shot, store everything in localStorage. Reasoning not recorded in the sources read for this document.

Replaced: nothing, this was the starting point; it now lives in Repo A's `film-planner/` as a frozen v0.1 POC, superseded by D3's world-first approach.

Written down in: `docs/archive/plan-poc-v0.1.md`, `system-design-v0.1-poc.md` (Repo A).

### 3. 2026-04-25 - Providers: Seedance 2, ElevenLabs, gpt-image-1, gpt-4o-mini (Decided, pending verification)

Context: D2 section 11 names these providers; D2's own open question 5 flags that access paths were not verified at the time. Decision: gpt-image-1 for images, Seedance 2 for video, ElevenLabs for speech, gpt-4o-mini for text, all via Vercel AI Gateway. Reasoning recorded in D2 section 11, not restated here.

Replaced: nothing, carried forward unless Nick changes it.

Written down in: D2 section 11 and open question 5 (Repo A, `docs/archive/system-design-v0.2.md`).

### 4. 2026-07-14 - Flow-first studio and two-track plan, D1 (Decided by Alena, as draft v1)

Context: Alena wrote a product and design-system plan built around six MVP areas, with Video Generator, a node-flow builder, named first. Decision: flow-first AI generation studio, split into a product track and a design-system track. Reasoning recorded in D1's own documents, not restated here.

Replaced: nothing explicitly; it stands alongside D2 and D3 as one of three product definitions never reconciled (see `vision.md`).

Written down in: D1 (see legend, Repo A). The design-system track was executed against it; see entry 8 and `design-system.md`.

### 5. 2026-07-21 - Scene-centered over tool-verb navigation, D2 called canonical (Decided by Nick)

Context: Nick wrote D2 in Repo A's initial commit (2026-04-25, `6d6100c`) and called it canonical on 2026-07-21. Decision: the app is scene-centered, with Film, Bible, Scene, Shot, DialogueLine, Character, Costume, Location and Asset as the core entities, and six tabs (Map, Story, Design, Scenes, Produce, Edit). D2 rejects tool-verb navigation such as "Generate character" or "Generate video" as top-level destinations. Reasoning recorded in D2 itself.

Replaced: the tool-verb navigation pattern D2 argues against; D2's entity model was later superseded by D3 (entry 6), though the anti-tool-verb-navigation principle carries forward (see `vision.md`).

Written down in: `docs/archive/system-design-v0.2.md` (Repo A).

### 6. 2026-07-21 - World-first object model, Film Writer IA spec (Decided by Nick)

Context: same day as entry 5, Nick wrote the Film Writer information architecture spec in Repo B. Decision: one unit, the Object, replaces D2's typed tables (Scene, Character, Location, and so on). World comes first; the screenplay grows out of it. Nav is exactly two levels, Category then Subcategory. Reasoning recorded with the spec itself.

Replaced: D2's shot-centric, typed-table model; the spec states directly that it supersedes the shot-centric model in D2.

Written down in: `docs/superpowers/specs/2026-07-21-film-writer-ia-design.md` (Repo B).

### 7. 2026-07-22 - Hosted storage: Neon, Drizzle, private Blob, Clerk (Decided; reversed 2026-08-22; made optional 2026-08-23)

Context: the day after the IA spec, Nick added a storage section to it and started building against it in Repo B. Decision: Neon Postgres, Drizzle ORM, private Vercel Blob, Clerk for auth. Reasoning recorded in the spec's storage section, not restated here.

Replaced: D2's "no auth in the MVP" assumption (D2 section 1 lists auth as out of scope). This entry reversed that; entry 13 reversed this entry in turn (local-first, no auth); entry 14 made hosted storage an opt-in env seam rather than the default.

Written down in: `docs/superpowers/specs/2026-07-21-film-writer-ia-design.md`, storage section (Repo B).

### 8. 2026-07-22 - UI stack: shadcn on Radix, Phosphor duotone, four AI Elements (Decided in Repo B; open conflict with Repo A's design system on Base UI and Lucide)

Context: Nick added a UI stack section to the Film Writer spec on 2026-07-22 and built it in Repo B: shadcn switched to Radix (commit `915f235`), Phosphor duotone with Lucide dropped (commit `2864ed1`). Decision: shadcn on Radix, not Base UI; Phosphor duotone icons for app-authored UI; four AI Elements components only.

Conflict, recorded as open: Repo A's `design-system/` (Alena's, built against D1) uses Base UI (`@base-ui/react`) and Lucide. As of Repo B's `main`, the app uses Radix in 21 files and Phosphor throughout its app-authored components; `@base-ui/react` is in Repo B's `package.json` but unused. So the conflict is precisely Repo A's design system on Base UI plus Lucide against Repo B's app on Radix plus Phosphor. Neither side has changed to match the other; resolution depends on entry 16. Written down in: the spec's UI stack section, Repo B commits `915f235` and `2864ed1`; the conflicting side is Repo A's `design-system/` dependencies.

### 9. 2026-07-24 - Scene workspace tabs with Script as third tab (Decided at the time, then superseded by v2, never built)

Context: drawing the wireframes for the scene workspace exposed a contradiction: a subcategory has exactly one detail view, yet the scene wireframe wanted both the scene workspace and a script page. Decision: the scene workspace gains a third authored tab, Script, alongside About and Storyboard, hosting the doc-editor surface; `detailView: document` stays reserved for standalone documents that are not scenes. Reasoning recorded in the spec's wireframe-decisions section, dated 2026-07-24.

Replaced: nothing at the time; superseded by v2's Scenario surface (Board, Write, Scene page, Shot page, entry 13), and never built under either name. A code comment in Repo B (`object-detail-view.tsx:359`) states the scene workspace is not built and a scene currently shows as a plain object.

Written down in: `docs/superpowers/specs/2026-07-21-film-writer-ia-design.md`, "Wireframe decisions (2026-07-24)" (Repo B).

### 10. 2026-07-25 - 3D stage and scene builder (Decided, built as subsystems, not wired to routes)

Context: following the IA spec, Repo B built a scene-builder schema (sequences, scenes, shots) and a 3D blocking stage the same day. Decision: build the scene builder (SceneBoard, ShotCard, owner-scoped queries) and a React Three Fiber stage (viewport, dolls, gizmos, camera rigs, pose presets, lens math, a deterministic blocking-clip renderer with upload). Reasoning recorded in Repo B's 3D stage design spec and implementation plan, not restated here.

Replaced: nothing directly; both subsystems exist and are tested but, per Repo B's README, are not wired to any route as of `main`.

Written down in: Repo B commit history (2026-07-25, e.g. `4af8f76`, `11f0605`, `e951741`), the 3D stage specs and plans, and current status in Repo B's `README.md`.

### 11. 2026-07-26 - Structure-and-fields and capture inbox (Decided, shipped)

Context: continuing the Film Writer foundation, Repo B specced and built editable categories, subcategories and fields, plus a capture-and-inbox flow. Decision: categories, subcategories and field definitions become editable in the app, and deleting one never destroys the objects that used it; a capture path lets a user drop an image, note or voice memo, have the model propose where it goes, and confirm. Reasoning recorded in Repo B's specs for structure editing and the capture-and-inbox path, not restated here.

Replaced: nothing; confirmed shipped in Repo B's `README.md`.

Written down in: Repo B commits `43a5d38`, `d7b7e06` (specs), `a74fbf3` (structure-and-fields UI), `73e1ede` (capture and inbox), all 2026-07-26; current status in Repo B's `README.md`.

### 12. 2026-08-01 - Image-forward visual identity (Decided)

Context: Repo B took a design pass named "Lightboard": image-forward defaults, covers on cards, a distinct visual identity. Decision: adopt an image-forward visual identity across list and detail views. Reasoning recorded in Repo B's image-forward design spec, not restated here.

Replaced: nothing directly, though the token names from this identity carried forward, stable, through the later Linear-dense restyle in v2 (entry 13).

Written down in: `docs/superpowers/specs/2026-08-01-image-forward-design.md`; commit `af76205` "Lightboard design pass" (2026-08-01).

### 13. 2026-08-22 - v2 rebuild, local-first, no auth (Decided by Nick)

Context: v1's foundation was structurally complete and had never been used: 276 tests passed, the build succeeded, all hosted services were provisioned, and the app had never been driven in a browser because Clerk sign-in blocked it and the scene workspace and doc editor were never routed. Decision: replan and rebuild the whole app around a new shell (v2), keeping the data layer, design system and 3D stage; make storage local-first, with PGlite as the embedded database, media as local files, and no auth.

Reasoning, quoted exactly as the source records it: the rebuild direction is recorded as Nick, in session, saying "re-plan and rebuild the whole app." The same-day amendment to local-first quotes Nick's own words: "have the database local or on github, I don't want anything external, vercel is fine."

Replaced: entry 7 (Neon, Drizzle, private Blob, Clerk) is reversed by this entry; entry 9's scene-workspace tab model (About, Storyboard, Script) is superseded by v2's Scenario surface (Board, Write, Scene page, Shot page).

Written down in: `docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md` (Repo B).

### 14. 2026-08-23 - Hosted mode as opt-in env seams (Decided by Nick)

Context: one day after committing to local-first, Nick decided the real app should still be deployable. Decision: add three env seams that activate hosted drivers without changing the default - `DATABASE_URL` for Neon, `BLOB_READ_WRITE_TOKEN` for Vercel Blob, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` for Clerk - each defaulting to local-first behavior when unset. Localhost stays the zero-config default; hosted mode is opt-in per env var, not a replacement for it.

Reasoning, quoted exactly as the source records it: "Nick chose to host the real app on Vercel."

Replaced: nothing outright; this entry makes hosted storage (entry 7, reversed by entry 13) available again, but only as an opt-in mode layered on local-first, not as the default.

Written down in: `docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md`, "Amendment, 2026-08-23" (Repo B).

### 15. 2026-09-13 - One product, three zones (Proposed)

Context: D1, D2 and D3 were never reconciled with each other; no single app screen fully realizes any one of the three. Decision: reconcile into one product with three zones - Write (Film Writer as it stands, v2), Produce (Alena's node flows, scoped to a shot), and Edit (read-only timeline first, editor later) - with Home as the entry point. Node flows become the Produce engine rather than a separate product; D2's rejection of tool-verb navigation stays in force, so "Generate video" never appears as a top-level destination. Reasoning: each of the three definitions is strongest in a different part of the product; splitting by strength avoids discarding two of the three efforts.

Replaced: nothing yet, a proposal awaiting Nick's confirmation.

Written down in: `vision.md`, `system-design.md`.

### 16. 2026-09-13 - One product or two, and where the flow components live (Open, recommendation A)

Context: Repo B (Film Writer) is the live app - 22 PRs merged to `main` between 2026-07-21 and 2026-09-04, local-first with hosted seams, 13 tables, 58 test files, 38 Storybook stories, its own design system on Radix and Phosphor. Repo A holds Alena's node-flow design system (built against D1), the docs, and a frozen v0.1 POC. The two repos share only the 2026-06-26 import merge and the D2 document.

Options:
- **(A, recommended)** One product: Film Writer is the app; Alena's node-flow components become its Produce zone, ported onto Film Writer's primitive layer (Radix, Phosphor, its own tokens) and living in Repo B as a package. Repo A keeps the docs and archive, or is folded in. Reason: Film Writer already has the object graph (`links`), Shot pages, image generation and provenance the seeding idea needs; D1's own premise was that components need a real app; v2's non-goal of rebuilding design-system primitives means Film Writer will not move to Base UI, so the port has to be on the node components. Cost: a Base UI to Radix port and a shared token set for Alena's components, hers to weigh.
- **(B)** Two products with a hand-off: Film Writer exports a shot's context (scene text, linked records, images, style note) and FilmMaker's flow builder imports it; each keeps its own stack and name.
- **(C)** FilmMaker stays a design-system case study with no app of its own; Film Writer adopts individual components as needed.

Until Nick decides, `roadmap.md` after Phase 0 is written for option A and says so. This entry replaces the earlier "Repository topology" framing, which assumed the split repos were the whole problem; the real question is whether there should be one product or two, and where the flow components should live. Written down in: `roadmap.md` Phase 0.

### 17. 2026-09-13 - Product name (Open)

Context: Repo B calls the product Film Writer everywhere (README, AGENTS.md, all specs) and mentions nothing of FilmMaker, Alena, nodes or flows. Repo A calls the product FilmMaker. Decision pending: which name the combined product uses. Not yet resolved; depends on the outcome of entry 16.

Replaced: nothing. Until Nick decides, this document set uses "FilmMaker" for the whole and "Film Writer" for the Write zone.

Written down in: `vision.md`, `README.md`.

### 18. 2026-09-13 - Generation runtime in local-first (Open, with proposal)

Context: Workflow DevKit, named for video generation in D2 section 11 and the roadmap, is Vercel-hosted; local-first (entry 13) has no durable executor of its own.

Proposal: the `runs` table is the queue of record in both modes. Hosted mode adds Workflow DevKit as the executor for video. Local mode uses an in-process worker that re-scans `runs` on startup. Image and text generation stay synchronous in both modes. Under this proposal, killing the dev server mid video generation resolves as: hosted mode resumes via Workflow DevKit; local mode resumes from the `runs` rows on restart, and any run in flight when the process died is marked failed with a retry. Reasoning: keeps one data model for the generation queue regardless of mode, rather than a hosted-only concept local-first cannot represent.

Replaced: nothing, this is open.

Written down in: `roadmap.md` Phase 3, `system-design.md`.

### 19. 2026-09-13 - Doc set replaced (Decided, executed)

Context: the project had three unreconciled product definitions spread across files with misleading names, plus a README that listed the wrong doc as primary and described a stale checkout of Repo B.

File moves:

| From | To |
|---|---|
| `docs/alena-product-vision.md`, `alena-mvp-requirements.md`, `alena-component-requirements.md`, `alena-roadmap.md` | `docs/archive/2026-07-alena-*.md` |
| `docs/alena-reference-products.md` | `docs/reference-products.md` |
| `docs/plan.md` | `docs/archive/plan-poc-v0.1.md` |
| `docs/system-design.md` | `docs/archive/system-design-v0.2.md` |

New files created: `docs/vision.md`, `docs/system-design.md`, `docs/design-system.md`, `docs/roadmap.md`, `docs/decisions.md` (this file). Rewritten: `README.md`, `docs/reference-products.md` (links repointed).

Reasoning: keep the historical documents intact and readable, under names that describe what they are, while giving the project one current doc set to work from, grounded in what Repo B's `main` actually contains rather than a stale checkout of it.

Written down in: this file, and the archive directory itself.
