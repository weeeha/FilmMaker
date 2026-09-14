# FilmMaker - System Design (v0.3, proposed)

Status: draft for Nick's review, 2026-09-13. Proposed unless marked Decided.

## Legend

Three prior product definitions are cited by short label, then by file name from here on.

- **D1** = `docs/archive/2026-07-alena-*.md` (Alena, 2026-07-14). Flow-first generation studio.
- **D2** = `docs/archive/system-design-v0.2.md` (Nick, 2026-04-25; called canonical 2026-07-21). Scene-centered pipeline.
- **D3** = Repo B's `docs/superpowers/specs/2026-07-21-film-writer-ia-design.md` (Nick, 2026-07-21, world-first object model) plus `docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md` (Nick, 2026-08-22, local-first v2 rebuild). Together, "Film Writer." States it supersedes D2.

## Fixed from v0.2

v0.2 (`system-design-v0.2.md`) carried four internal contradictions. This version resolves each once, in one place:

| v0.2 problem | Fix in v0.3 |
|---|---|
| Five zones in §1, six tabs in §3 | One shell definition, §3: World, Characters, Props, Scenario, Produce, with Home outside the tab bar. |
| §7 diagram listed the voice provider as TBD; §11 had already decided ElevenLabs | Providers stated once, §9, with status per provider. |
| Asset fields differed between the object map and the schema table | `images`, `media`, `flows`, `runs` defined once, §4, and referenced everywhere else. |
| Document title read "Design System" for what is a system design | Title corrected to "System Design" above. |

## TL;DR

FilmMaker has three zones plus Home: **Write** (Film Writer as it stands today, unchanged in these docs), **Produce** (D1's node-flow engine, opened from a Shot page or the Storyboard board, pre-seeded from the object graph), and **Edit** (a read-only timeline first). Home absorbs the earlier "Map" idea: progress and next actions (Proposed, 2026-09-13; `decisions.md` entry 15). The domain model keeps Film Writer's real tables and adds `flows`, `runs`, and a `media` table, plus new columns on `images` (Proposed; `decisions.md` entry 15). Film Writer's app (`film-planner/`, Repo B) has 13 tables per its README, a working shell, object collections, and Generate image; the scene board, shot pages, and the whole 3D stage are built and tested but not wired to a route; the node-flow canvas does not exist yet. Two things stay open for Nick: one product or two (`decisions.md` entry 16), and the product's name (`decisions.md` entry 17).

## 1. Status and scope

Single user, single operator, no studio and no client review flow (from D2 §1, unchanged in Film Writer's non-goals). Local-first: the database is PGlite, embedded in the app process, and media is local files under `film-planner/public/media/`; there is no auth by default (`README.md`, `AGENTS.md`). A hosted mode exists behind three opt-in env seams -  `DATABASE_URL` (Neon), `BLOB_READ_WRITE_TOKEN` (Vercel Blob), `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (Clerk) - each defaulting to local behavior when unset (`docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md`, Amendment 2026-08-23; `decisions.md` entries 13 and 14).

**In scope for v0.3 planning:**
- Three zones plus Home, as decided in §2 below.
- Film Writer's object model as the single source of structured data (categories, subcategories, objects, tags, links).
- Node-flow generation, opened from a Shot page or the Storyboard board, seeded from the object graph.
- Local-first storage by default, with the hosted seams above available per deployment.

**Out of scope**, carried from D2 §1, D1's MVP requirements, and Film Writer's v2 non-goals (`docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md`):
- Multi-user, sharing, roles, or any auth as a design center; hosted or multi-device access as the design center.
- Native iOS or Mac apps (Apple-native plan abandoned 2026-04-24, `decisions.md` entry 1).
- Two-way sync between a standalone screenplay document and scenes; no import bridge.
- Mobile layouts. Desktop-first.
- Rebuilding the data layer, Film Writer's design-system primitives, or the 3D stage.
- Marketplace purchases of music or voices; libraries are browse, preview, use only (from D1 §Cross-cutting).
- Professional-grade video editing: color, keyframes, effects (from D1 §2).
- Final film export to MP4 or theatrical formats in v1 (from D2 §1).

## 2. Product model

A note on names before anything else: Repo B (the app) calls itself **Film Writer** everywhere; Repo A calls the whole project **FilmMaker**. These docs use FilmMaker for the whole and Film Writer for the Write zone until Nick decides (`decisions.md` entry 17, open).

Reconcile rather than pick a single prior spec. Each zone below owns the part of the product a different prior definition was strongest at (Proposed, 2026-09-13; `decisions.md` entry 15).

| Zone | Owns | Source |
|---|---|---|
| **Write** | World, characters, props, and Scenario (script) as data-driven categories; object records, the mention editor, the Board/Write/Scene/Shot surfaces | Film Writer, unchanged |
| **Produce** | Generation: node flows as the engine, opened from a Shot page or the Storyboard board, pre-seeded from the object graph | D1's node family, D2's contextual-generation principle |
| **Edit** | Read-only timeline of approved clips first, lightweight editor later | D1's lightweight-NLE scope, D2's read-only-first sequencing |
| **Home** | Film cover, logline, counts per tab, recent records, next actions derived from missing data | Film Writer's Home, absorbing D2 §5.1's Map role |

**The anti-pattern stays rejected.** D2 §2 explicitly rejected a UI organized as AI tool verbs:

> Generate character / Generate location / Generate video / Generate voice

in favor of film artifacts with generation surfaced contextually. v0.3 keeps that rule: global navigation never shows "Generate video" as a destination. A Flow is a generation surface reached from a Shot page or the Storyboard board, not a menu item.

**How a flow is reached.** The user opens a Shot page inside Scenario (Film Writer's script zone). From the shot, an action opens a Flow scoped to that shot in the Produce zone; a flow can also be opened from the Storyboard board inside Produce itself. The Flow arrives pre-seeded: one Avatar node per linked character with a cover image, reference inputs from linked World and Props records' images, and the film's style note prepended to every prompt node. The user sees this seeded context on the canvas and can remove any of it. Scene-level flows (opened directly from a Scene page rather than a Shot page) are not settled; see §11 item 5. This closes the loop between Film Writer's object graph and D1's node engine; see §4 for the seeding algorithm.

Libraries (music, voices) are not zones. They are pickers inside nodes and object fields. D1's Voice Editor becomes the Speech node plus a document-mode text field; D1's Video Editor becomes the Edit zone.

**Experience principles adopted, by source:**

| Principle | Source |
|---|---|
| Cost visible before every run and per run afterwards | D1 |
| Preview at every node | D1 |
| Simple by default, advanced on demand | D1 |
| Model-aware settings | D1 |
| Reference strip above the prompt, not inside it | D1 |
| Context-sensitive side panel | D1 |
| `done` is not `approved`; only approved assets flow onward | D2 §8 |
| The model shows what context it was given, every time | D3, Generate popup and seeded flows both |

## 3. Information architecture

App shell: Film Writer's shell plus a pinned **Produce** tab, and Edit later. Top bar tabs: **World, Characters, Props, Scenario** (the first three from the `categories` table, data-driven; Scenario is a built-in pinned tab), then **Produce** pinned after Scenario, the same mechanism v2 uses to pin Scenario. Home is reached from the logo, not a tab.

Inside **Write** (World, Characters, Props, Scenario): the top bar tabs are Category (L1), the left rail is Subcategory (L2) as collapsible groups with counts, and the right rail is a first-level outline of whatever is open. Scenario replaces the subcategory tree with sequences and scenes in the left rail.

Inside **Produce**: Storyboard board, Queue, and the Flow editor. The Flow editor is never a top-level entry; it is reached from a Shot page or from the Storyboard board (scene-level flows are open, §11 item 5).

### Layout shell

Adapted from Film Writer's v2 shell (`docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md`), with a Produce tab and dock added:

```
+-----------------------------------------------------------------+
| Logo   Film switcher      World  Characters  Props  Scenario  Produce   Search  Generate  Theme |
+---------------+---------------------------------------------------+
| Left rail     |                                                   |
| (subcategory  |   Main workspace                                 |
|  tree, or     |   (Collection / Record / Board / Write / Scene   |
|  sequences +  |    / Shot / Storyboard / Queue / Flow editor)    |
|  scenes in    |                                                   |
|  Scenario;    |                                                   |
|  Storyboard + |                                                   |
|  Queue in     |                                                   |
|  Produce)     |                                                   |
| Inbox         |                                                   |
+---------------+---------------------------------------------------+
| Generation queue - running jobs - cost so far                   |
+-----------------------------------------------------------------+
```

- **Top bar**: logo (click = Home), film switcher, zone tabs, search (command palette), Generate button, theme toggle.
- **Left rail**: the tree for the active tab; Inbox (capture destination) pinned at the bottom in Write.
- **Right rail**: outline of whatever is open; views without one render no rail.
- **Bottom dock**: persistent generation queue and running cost, carried from D2 §3's "AI assistant, generation queue, warnings, next steps" dock, narrowed here to queue and cost.

## 4. Domain model

Keep Film Writer's real tables as they are, and grow the schema additively (Proposed; `decisions.md` entry 15). Do not treat the July 2026 sketch in D2 or the July D3 draft as the schema; the tables below are the ones in Repo B's `film-planner/` on `main`.

**Existing tables, 13 per Repo B's README**: `films, categories, subcategories, field_defs, objects, images, models, tags, object_tags, links, sequences, scenes, shots, blocking_clips, captures`. `images` already exists and carries `generatedPrompt`.

**Additive changes (v0.3):**

```
images   + run_id (nullable), + status ('done' default | 'approved')
media    id, film_id, object_id (nullable), run_id (nullable),
         kind ('video'|'audio'), role ('shot_clip'|'voice'|'music'|'sfx'),
         url, prompt, status, position, created_at
flows    id, film_id, shot_id (fk shots), graph jsonb, updated_at
runs     id, flow_id, node_id, model, params jsonb,
         status ('queued'|'running'|'done'|'failed'), cost_cents (nullable until known),
         started_at, finished_at, error,
         output_image_id (nullable), output_media_id (nullable)
```

**Reasoning:** `graph` is jsonb because the node and edge shape is owned by the canvas library (xyflow) and changes with the node family. `runs` is a table, not a status column, because cost, retries, and a queue screen all need to query it. Reusing `images` for generated stills (rather than a new `assets` table) matches Film Writer's habit of additive migrations onto tables that already exist and already carry `generatedPrompt`; `media` is the equivalent new table for video and audio, which `images` was never shaped for. Uploaded images are rows with `run_id = null`. Deleting an object keeps its `images` and `media` rows, carrying forward D2's archival rule (D2 §4: assets preserved, user can manually delete).

**Approval rule.** Only `approved` images and media flow to the Storyboard board and the Edit-zone timeline. An asset produced by a run or the Generate popup starts at `status: 'done'`; a user action sets it to `'approved'`.

### Continuity seeding algorithm

When a flow is created for a shot:

1. Walk `links` whose source is the shot's own object, plus `links` whose source is the shot's parent scene (making scene bodies a link source is v2 data-model item 3, pending; see §11 item 5).
2. Group the linked objects by category.
3. For each Characters record with a cover image, seed one Avatar node.
4. For each linked World or Props record with an image, seed it as a reference input.
5. Prepend `films.style_note` to every prompt node in the flow.
6. Render the seeded context on the canvas. The user can remove any seeded node before running.

This is the payoff of Film Writer's `links` table: the same query, grouped by category, backs both a record's backlinks and a flow's seeded context.

## 5. Surfaces

### Write zone (Film Writer)

Write is Film Writer as it stands. These docs summarize it; `README.md`, `AGENTS.md`, and `docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md` in Repo B are the source of truth and should be read before changing anything here.

| Surface | What it is | Status in `film-planner/` on `main` |
|---|---|---|
| Home | Film cover, logline, counts per tab, recent records, inbox badge, Generate shortcut | Built |
| Collection | Cards / Table / Map switcher per subcategory; sort, filter, bulk select | Built and wired: table, gallery, masonry, sequence, map list views |
| View Record | Breadcrumb, title, tags, properties block, body in the mention editor with `[[links]]`, sticky image stack; edits in place | Built and wired, including backlinks and image lightbox |
| Generate popup | Cmd+G or top bar; context-aware; proposes 1-3 candidate records or images for an open record; propose-confirm always | Generate image is built and wired (gpt-image-1 via the Gateway); Generate text is prop plumbing only, not implemented |
| Scenario: Board | Sequences with scene cards, drag to reorder | Built and tested, not wired to a route |
| Scenario: Write | One continuous screenplay surface stitched from scenes; scenes are the source of truth | Specified in v2; no component found on `main` |
| Scenario: Scene page | Body, notes, shot list, 3D stage | A code comment notes the scene workspace is not built yet; a scene currently shows as a plain object |
| Scenario: Shot page | Fields, framing, R3F stage viewport, blocking-clip history | Built and tested, not wired to a route |
| Capture inbox | Drop an image, note, or voice memo; the model proposes where it goes; user confirms | Built and wired |
| Structure editing | Categories, subcategories, and fields editable in the app; deleting never destroys objects | Built and wired |

Absent entirely today: any approval state on images (§4's `status` column is proposed, not yet applied), a node or flow canvas, export. The July 2026 tab model (About, Storyboard, Script, one generated tab per linked category) was superseded by v2's Scenario and was never built; do not build it.

### Produce zone

**Flow editor**, opened from a Shot page or the Storyboard board:
- **Purpose**: assemble and run a generation chain scoped to one shot, pre-seeded from the object graph.
- **Primary actions**: add a node, connect nodes into a chain, run a single node, run the whole flow, remove a seeded node, approve a resulting image or media row.
- **Data shown**: the flow's `graph` (nodes and edges), each node's execution status (idle, running, done, failed), an inline preview per node, the seeded context (Avatar nodes, reference images, style note) visibly marked as seeded and removable.
- **Generation surface**: the entire canvas. Per-node Run buttons execute one node; a global run toolbar above the canvas runs the whole flow and shows an estimated cost before starting and the actual cost after (D1 §1.1, D1 §Cross-cutting).
- **Components built** (Repo A `design-system/`): the AINode shell, NodePort, RunButton and NodeMenu (`components/ai`), and 13 node-family members with stories, specs, and doc pages: avatar, composition, dubbing, image-generation, lip-sync, llm, music, sound-effects, speech, text, video-generation, voice-changer, voice-isolator (`design-system/src/stories/nodes`). **Still needed**: the canvas wrapper on xyflow, edges, the global run toolbar with cost estimate, a shared execution-status enum across all built nodes, an Upload/Asset node, and an Image composition node beyond the existing composition node's story (Phase 2 exit criteria, `roadmap.md`).

**Storyboard board** (D2 §5.7, carried forward, film-wide rather than scene-scoped):
- **Purpose**: browse every shot across the film as a grid, reorder, batch-approve.
- **Primary actions**: click a frame to expand to detail, bulk-select for batch regeneration, drag to reorder within a scene, open a flow directly from a cell.
- **Data shown**: one cell per shot, marked approved, awaiting approval, or empty.
- **Generation surface**: "generate all empty shots in selected scenes," which queues runs into the Generation queue.
- **Components**: none of this board exists yet; it would reuse node-preview and image-thumbnail primitives from `components/ai` once the canvas work above lands.

**Generation queue** (D2 §5.8, carried forward):
- **Purpose**: see what generation work is in flight, what failed, what is waiting.
- **Primary actions**: retry a failed run, cancel a running one, clear completed rows, click a row to jump to its parent shot or object.
- **Data shown**: one row per `run`, its status, model, elapsed time, and cost.
- **Generation surface**: the whole screen is a status surface; the user does not initiate generation here, only from a Shot page or the Storyboard board.
- **Components**: not yet built.

### Edit zone

**Timeline, read-only first** (D1 §2, D2 §5.9):
- **Purpose**: see the film's approved clips in scene order.
- **Primary actions in v1**: sequential preview playback only, no editing.
- **Data shown**: ordered list of approved media rows (video), with approved images shown as static frames at a default duration.
- **Generation surface**: none in v1.
- **Components**: not yet built. A later, editable version adds trim, reorder, replace-clip, and one audio track (D1 §2's lightweight-editor scope); an export spike can reuse Repo B's WebCodecs and `mp4-muxer` clip pipeline from the 3D stage.

## 6. Universal interaction patterns

Two patterns, one from each side of the merge, compose rather than compete.

**Card -> Detail -> Generate -> Approve -> Use (D2 §6).** Every creative artifact (character, location, shot) flows through the same five steps: a compact card in a list or grid, a full detail page, an AI generation action scoped to that page, an approve step that marks the result canon, and use elsewhere (a character cast into a scene, a location used in Storyboard). `done` is not `approved`; only approved artefacts flow to dependents.

**Propose-confirm and in-place editing (Film Writer).** Two input modes, split by risk rather than by page: anything a person types (a record's body, a scene's screenplay text) edits in place and autosaves, because it is cheap to undo by typing more. Anything generated (a Generate-popup candidate, a capture-inbox suggestion) opens as an editable draft; only Save writes it. Nothing autosaves out of a generation.

**How they compose.** The Card -> Detail step is where a record is opened, matching Film Writer's View Record or Scene/Shot page. The Generate step is where the Generate popup's propose-confirm rule applies for text and images, and where a Produce-zone Flow is opened for anything requiring the node engine (video, speech, more complex image chains); a Flow's own run-and-approve step is Produce's version of propose-confirm, one level lower (per node instead of per record). The Approve step is shared: an image or media row produced by either the Generate popup or a Produce flow becomes `approved` the same way, and only then is available in the Use step's pickers.

## 7. Architecture and stack

Corrected against what each package actually uses, not what either README claims.

| Layer | Choice | Source |
|---|---|---|
| Framework | Next.js 16 App Router, TypeScript strict | `README.md`, `AGENTS.md` |
| Database | PGlite (embedded Postgres) locally, via Drizzle; `DATABASE_URL` env seam switches to Neon in hosted mode | `README.md`, v2 rebuild spec |
| Media storage | Local files under `film-planner/public/media/`; `BLOB_READ_WRITE_TOKEN` env seam switches to Vercel Blob in hosted mode | `README.md`, v2 rebuild spec |
| Auth | None by default; `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` env seam switches to Clerk in hosted mode | `README.md`, v2 rebuild spec |
| Primitive layer, app (Repo B) | Radix, via shadcn/ui; `@base-ui/react` is in `package.json` but unused | `AGENTS.md`; `docs/superpowers/specs/2026-07-22` UI-stack decision, verified against Repo B's actual usage |
| Icons, app (Repo B) | Phosphor duotone; Lucide is a dependency but unused in app-authored components | Repo B usage |
| Primitive layer, design system (Repo A) | Base UI (`@base-ui/react`) | Repo A `design-system/` |
| Icons, design system (Repo A) | Lucide | Repo A `design-system/` |
| AI calls | Vercel AI SDK v6 via the Vercel AI Gateway, plain `"provider/model"` strings, no provider SDKs added directly | `AGENTS.md` |
| Long-running gen | Vercel Workflow DevKit, hosted-only (see §8) | D2 §7, D2 §8 |
| Hosting | Localhost is the default; Vercel for hosted mode and for the design-system's token site and Storybook | `docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md` |

### Open conflict: Base UI vs. Radix, Lucide vs. Phosphor

Recorded here, not resolved (`decisions.md` entry 8, amended). Repo B's app is on Radix and Phosphor; Repo A's `design-system/` is on Base UI and Lucide. This conflict only matters if the node-flow components move into Film Writer (option A, §11 item 1); porting them is an Alena decision on cost, not resolved in these docs. Scheduled to resolve in Phase 0 or Phase 2 of `roadmap.md`.

## 8. Generation strategy

### Synchronous vs. async, per mode

| Job | Local-first mode | Hosted mode |
|---|---|---|
| Text generation (gpt-4o-mini) | sync | sync |
| Image gen (gpt-image-1) | sync | sync |
| Voice sample (ElevenLabs) | sync for short samples, async for longer dialogue | sync for short samples, async for longer dialogue |
| Video gen (Seedance 2) | async, in-process worker re-scans `runs` on startup | async, via Workflow DevKit |

Image and text jobs are short enough to run synchronously in either mode; there is no durable-execution need for them (D2 §7). Video is the only job that needs a durable executor, and local-first has none by default (Open, `decisions.md` entry 18). Proposed: `runs` is the queue of record in both modes; hosted mode adds Workflow DevKit as the executor, local mode adds an in-process worker that re-scans `runs` for unfinished rows on startup.

### Cost model

- **Estimate before run**: the credit price of a generation is shown before starting, and updates live as node settings change (D1 §1.2).
- **`cost_cents` per run**: each `runs` row records its actual cost once known (§4). This holds in local-first too; local-first still pays the Gateway for every call.
- **Film total**: cost across all runs for a film is summed for the running total shown in the bottom dock (§3) and on Home (§5).

### Context seeding

Two mechanisms feed context into a generation, one per zone:
- In Write, the Generate popup assembles context from the current film, tab, subcategory, or record and shows the assembled context before running.
- In Produce, a Flow opened from a Shot page or the Storyboard board is pre-seeded from the object graph by the algorithm in §4: avatar nodes for linked characters, reference images for linked World and Props records, style note prepended to prompts.

Both mechanisms show what was fed in, rather than hiding it: "the model shows what context it was given, every time" (adopted principle, §2).

### Approval

`done` is not `approved`. See §4's approval rule.

## 9. Providers

Decided in D2 §11; access paths unverified (`decisions.md` entry 3, carried as decided-pending-verification).

| Use | Provider | Status |
|---|---|---|
| Text / structure | gpt-4o-mini, via AI Gateway | Decided, D2 §11 |
| Image | gpt-image-1, via AI Gateway | Decided, D2 §11 |
| Video | Seedance 2 | Decided, D2 §11. Access path (direct API vs. AI Gateway vs. wrapper) unverified, D2 §12 open question 5 |
| Voice | ElevenLabs, per-character voice cloning | Decided, D2 §11. Cloning input source (existing samples vs. generate-then-clone) unverified, D2 §12 open question 6 |

## 10. Self-check walkthroughs

Rewritten for the merged model.

**1. Build a scene from scratch.** Create a film, set its style note, add World and Characters records, write a scene in Scenario's Write surface, add shots under it, open a shot's Flow, run its nodes, approve the resulting image, see it on the Shot page and on the film-wide Storyboard board. Every step maps to a surface in §5 and a row write in §4.

**2. Delete a Characters record.** What happens to its `object_tags`, `links`, and any approved cover image? Answer: `object_tags` and outgoing `links` for the deleted object are removed; incoming links from scenes that mentioned the character become dangling and should render as broken; the character's approved images are preserved per the archival rule in §4, since an `images` row pointing at a deleted object is not itself deleted.

**3. Kill the dev server mid video generation.** Does the job resume on restart? Answer: it depends on the mode (§8, `decisions.md` entry 18). In hosted mode, the run resumes via Workflow DevKit, which is durable. In local-first mode, the in-process worker resumes runs from `runs` rows on restart; a run that was in flight when the process died is marked failed, with retry.

**4. Open a flow from Shot 3 of Scene 7.** Does the seeded context show the right avatar and reference images? Answer: the app walks Shot 3's own links plus Scene 7's links (once scene bodies are a link source, §4 step 1, pending), groups by category, and seeds one Avatar node for each linked Characters record with a cover image and a reference input for each linked World or Props record with an image (§4's algorithm). If Scene 7 links a character with no cover image yet, no Avatar node is seeded for them and the gap should surface as a Home "next action," not fail silently.

## 11. Open decisions

1. **One product or two, and where the flow components live** (Open, `decisions.md` entry 16, recommendation A). Option A (recommended): one product, Film Writer is the app, Alena's node-flow components become its Produce zone, ported onto Film Writer's primitive layer and living in Repo B as a package; Repo A keeps docs and archive or folds in. Option B: two products with a hand-off, Film Writer exports a shot's context and FilmMaker's flow builder imports it. Option C: FilmMaker stays a design-system case study with no app of its own. Until Nick decides, the roadmap after Phase 0 is written for option A.
2. **Product name** (Open, `decisions.md` entry 17). Repo B says Film Writer; Repo A says FilmMaker.
3. **Primitive layer port**, part of item 1: Base UI vs. Radix, Lucide vs. Phosphor (§7, `decisions.md` entry 8). Recorded, not resolved.
4. **Generation runtime in local-first** (Open, `decisions.md` entry 18, proposal in §8): an in-process worker re-scanning `runs` on startup, alongside Workflow DevKit in hosted mode.
5. **Scene-level flows.** Whether a Flow can be opened directly from a Scene page, not only from a Shot page beneath it, and whether scene bodies become a link source (v2 data-model item 3) are both pending.
6. **Reference-image limit per generation.** D2 §12 assumed character + location + costume = 3 as a working max for gpt-image-1; unconfirmed.
7. **Seedance 2 access path.** Direct ByteDance API vs. via AI Gateway vs. a wrapper provider; unconfirmed (D2 §12 open question 5).
8. **ElevenLabs cloning input.** Use existing uploaded voice samples, or generate seed audio first and then clone; unconfirmed (D2 §12 open question 6).

## 12. Relationship to existing code

**Repo A `film-planner/`** (frozen v0.1 POC, April 2026): a paste-screenplay-parse-to-scenes prototype, superseded by Film Writer's world-first model. Its shot-centric `types.ts`, its `localStorage` layer, and its screenplay parser do not carry forward. Recommended for deletion (`roadmap.md` Phase 0); if kept instead, it needs a `.env.example` and CI, which it currently lacks.

**Repo B `film-planner/`** (Film Writer): this is the app. Built and wired: films list and create; the v2 shell (top bar, left rail, outline rail); object collections with table, gallery, masonry, sequence and map list views; View Record with backlinks and image lightbox; search command palette; capture inbox; Generate image; hosted-mode env seams. Built and tested but not wired to a route: the scene board, shot card, shot view, and the whole 3D stage. Absent: Generate text, any approval state on images, a node or flow canvas, export. 58 test files, 38 Storybook stories, its own design tokens (`src/design/tokens.ts`).

**Repo A `design-system/`** (Alena's, active through 2026-09-13): the component work is the Produce zone's engine, described in §5. Surviving as-is: 60 shadcn primitives, AI Elements, the `components/ai` shell (AINode, NodePort, RunButton, NodeMenu), `components/super-ai`'s 9 chat and settings primitives, and the 13-member node family. Repo A's generic shadcn copies duplicate Repo B's own design system (shadcn on Radix, tokens, Phosphor duotone); Repo A's unique value is `components/ai`, `components/super-ai`, and the node family, which is the piece that needs a port under option A (§11 item 1). Not yet built, per Phase 2's exit criteria in `roadmap.md`: the canvas wrapper, edges, the global run toolbar, a shared execution-status enum, an Upload/Asset node, and an Image composition node. Known defects in this package (avatar port color mismatch between spec and code, a stories file documenting the wrong component, nine `super-ai` components with no spec page, three keyboard-behavior TODOs) are tracked in `design-system.md`, not here.
