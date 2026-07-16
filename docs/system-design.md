# Film Planner — Design System (v0.2)

**Status:** v0.2 — vision + MVP scope
**Stack:** Next.js 16 (App Router) + TypeScript + Tailwind v4 + shadcn/ui, AI SDK v6 via Vercel AI Gateway, Neon Postgres + Drizzle ORM, Vercel Blob, deployed on Vercel
**Audience:** single user (the user, building films for their own production)
**Supersedes:** `docs/archive/system-design-v0.1-poc.md`

---

## 1. Status & scope

This is a **single-user, browser-first** AI film-making workspace. The user is the only operator; there is no studio, no collaborators, no client review flow. The product compresses one person's pipeline from idea to finished cut.

**In scope (v0.2 vision):**
- Five-zone film-making pipeline: Bible · Story · Design · Production · Edit.
- Scene-centered architecture — Scene is the primary working object.
- AI generation surfaced **contextually** (per scene, per character, per location), never as a standalone tools menu.
- Persistent project storage (Postgres + Blob), so the richer data model survives reloads and devices.
- 9 MVP screens delivered in Phase 1.

**Out of scope:**
- Multi-tenant / multi-user / studio collaboration / real-time co-editing.
- Native iOS/Mac apps. (Apple-native plan was abandoned — see `docs/archive/`.)
- 3D viewport, AR, LiDAR, on-set camera capture.
- Auth in the MVP (single user, single device assumption). Clerk via Vercel Marketplace if multi-device becomes a need.
- Final film export to MP4 / theatrical formats. (Timeline assembly is read-only in MVP.)

---

## 2. Product mental model

The user's journey:

```
Idea  →  Story  →  Design  →  Shots  →  Video  →  Final film
```

The five zones map onto that journey:

| Zone | Question it answers |
| --- | --- |
| **Bible** | What is this film? (concept, tone, visual rules) |
| **Story** | What happens? (structure, scenes, script, dialogue) |
| **Design** | Who and where? (characters, actors, locations, costumes, props, vehicles) |
| **Production** | How is it shot? (shot list, storyboard, image/video/voice generation) |
| **Edit** | How does it cut together? (timeline, clips, music, sound mix, export) |

**Core principle: scene-centered.** The Scene is where everything converges — story purpose, characters, location, dialogue, shots, generated assets. The product's most important page is the Scene Detail page. Other zones exist to feed scenes with what they need.

**Anti-pattern, explicitly rejected.** The UI is *not* organized as "AI tool" verbs:

> ❌ Generate character / Generate location / Generate video / Generate voice

It is organized as film artifacts, with generation surfaced contextually:

> ✅ Scene 07 → Missing character image, missing location render, missing storyboard frame → Generate what's needed here

The user should feel like they are making a film, not operating a fleet of separate AI models.

---

## 3. Information architecture

### Top-level navigation

```
[Map] [Story] [Design] [Scenes] [Produce] [Edit]
```

These six tabs are the spine of the app. Internally they group into four workflow stages:

| Stage | Contains |
| --- | --- |
| Foundation | Map, Bible (under Story), Story (structure, script) |
| Design | Characters, World/Locations, Costumes, Props, Assets |
| Production | Scenes, Storyboard, Generation queue |
| Final | Edit, Export |

### Layout shell

```
┌─────────────────────────────────────────────────────────────┐
│ Sky Fleet                                      38% complete │
├─────────────────────────────────────────────────────────────┤
│ Map | Story | Design | Scenes | Produce | Edit              │
├───────────────┬─────────────────────────────────────────────┤
│ Sub-nav       │                                             │
│ for current   │   Main workspace                            │
│ zone          │                                             │
│               │                                             │
├───────────────┴─────────────────────────────────────────────┤
│ AI assistant · generation queue · warnings · next steps     │
└─────────────────────────────────────────────────────────────┘
```

- **Top bar:** film title + global progress.
- **Tabs:** the six top-level zones. Active tab determines the sub-nav.
- **Left sub-nav:** zone-specific pages (e.g. Design → Characters / Locations / Costumes / Props).
- **Center:** the main workspace for the current page.
- **Bottom dock:** persistent AI assistant + generation queue + missing-asset warnings + recommended next actions. Always visible.

### Stage navigation as a guided process

Within each zone, sub-pages follow the guided-process pattern from the user's brief:

```
Bible:      Concept → Theme → Tone → Visual style
Story:      Structure → Scene list → Script → Dialogue
Design:     Characters → Locations → Costumes → Props → Vehicles
Produce:    Shot list → Storyboard → Generate
Edit:       Timeline → Audio → Export
```

This makes the tool feel like a guided pipeline, not a chaotic asset manager.

---

## 4. Domain model

The whole product is built around **four core objects** (plus Shot as an owned sub-object of Scene). Do not start with 25 object types — start with these.

### Object map

```
Film
  ├── Bible           (concept, tone, visualStyle, rules — embedded JSON)
  ├── Scene*          (the primary working object)
  ├── Character*
  ├── Location*
  └── Asset*          (any AI-generated image / video / audio)

Scene
  ├── characters[]    → Character (many-to-many via scene_characters)
  ├── location        → Location (one)
  ├── shots[]         → Shot (owned, ordered)
  ├── dialogue[]      → DialogueLine (owned, ordered)
  └── assets[]        → Asset (many-to-many via scene_assets)

Character
  ├── arc             (text)
  ├── appearance      (text + reference Assets)
  ├── actor           (model name + reference image Assets)
  ├── voice           (voice model id + sample Assets)
  └── costumes[]      → Costume (owned)

Location
  ├── worldRegion     (text)
  ├── references[]    → Asset (image refs)
  ├── backgroundRenders[] → Asset (generated)
  └── scenesUsedIn[]  ← derived from Scene.location

Asset
  ├── type            ('image' | 'video' | 'audio')
  ├── role            ('character_portrait' | 'location_render' | 'shot_frame' | 'shot_clip' | 'voice' | 'reference')
  ├── prompt          (text — what was asked)
  ├── refs[]          → Asset (reference images passed in)
  ├── url             (Vercel Blob URL once done)
  └── status          ('queued' | 'running' | 'done' | 'failed' | 'approved')
```

### Drizzle schema sketch

Tables:

| Table | Purpose | Key fields |
| --- | --- | --- |
| `films` | Top-level project | `id`, `title`, `createdAt`, `bible` (jsonb) |
| `scenes` | Story unit | `id`, `filmId` (fk), `index`, `heading`, `summary`, `purpose`, `emotionalBeat`, `locationId` (fk, nullable) |
| `shots` | Owned by scene | `id`, `sceneId` (fk), `index`, `description`, `notes` |
| `dialogue_lines` | Owned by scene | `id`, `sceneId` (fk), `index`, `characterId` (fk, nullable), `text` |
| `characters` | Cast | `id`, `filmId` (fk), `name`, `arc`, `appearance`, `actorModel`, `voiceModel` |
| `costumes` | Owned by character | `id`, `characterId` (fk), `name`, `description` |
| `locations` | World | `id`, `filmId` (fk), `name`, `worldRegion`, `description` |
| `assets` | All AI-generated media | `id`, `filmId` (fk), `type`, `role`, `prompt`, `url`, `status`, `parentType`, `parentId` |
| `scene_characters` | M:N join | `sceneId`, `characterId` |
| `scene_assets` | M:N join (assets attached to scene) | `sceneId`, `assetId`, `role` |

**ID strategy:** `cuid2` (collision-resistant, short, URL-safe).
**Cascade:** `films` delete cascades to all child rows. `characters` delete sets `dialogue_lines.characterId = null` (lines preserved, character unlinked).
**Asset parentage:** `parentType` + `parentId` lets an asset belong to a Character, Location, Shot, or Scene without four separate FK columns. Validated at the application layer.

### Continuity from v0.1

The v0.1 model (`Project { scenes[] { shots[] } }`) is a **strict subset** of v0.2. Migration path:

| v0.1 | v0.2 |
| --- | --- |
| `Project` | `Film` (rename + add `bible` jsonb) |
| `Project.styleNotes` | `Film.bible.visualStyle` |
| `Scene.heading` | `Scene.heading` (unchanged) |
| `Scene.description` | `Scene.summary` |
| `Shot.description` | `Shot.description` (unchanged) |
| `Shot.imageUrl` (data URL) | `Asset { role: 'shot_frame', url: <Blob URL> }` linked to shot |

A migration script reads `localStorage['film-planner:projects']` and POSTs to a new `/api/import-v01` route that writes Postgres rows + uploads inline base64 images to Blob.

---

## 5. Screen set (MVP — 9 screens)

Each screen has: **purpose** (what the user accomplishes), **primary actions**, **data shown**, **generation surface** (what AI features are visible here).

### 5.1 Film Map / Dashboard (home)

**Purpose:** answer the central question — "Where am I in the process of making this film, and what do I need to create next?"

**Layout:** a graph/flow view of the film's artifacts with progress badges.

```
┌─────────────────────────────────────────────────────────────┐
│ Film Map                                                    │
├─────────────────────────────────────────────────────────────┤
│  [Concept Bible] ──→ [Story Structure] ──→ [Scenes]         │
│        │                    │                 │            │
│        ↓                    ↓                 ↓            │
│  [Visual Bible]       [Characters]       [Shot List]        │
│        │                    │                 │            │
│        ↓                    ↓                 ↓            │
│  [Locations] ───────→ [Storyboard] ─────→ [Video Clips]     │
│        │                                      │            │
│        ↓                                      ↓            │
│  [Assets] ─────────────────────────────→ [Timeline]         │
└─────────────────────────────────────────────────────────────┘
```

**Cards show progress:** `Characters: 12 total · 8 designed · 5 with actor models · 3 missing voices`.

**Side panel — "Next actions":** auto-derived from missing data. e.g. *"Create shots for Scene 07"*, *"Generate actor reference for Mara"*.

**Side panel — "Problems":** `Scene 04 has no location` · `Kael appears in 12 scenes but has no voice` · `Scene 09 uses 'temple guard' but no costume exists`.

**Generation surface:** none directly — this is a navigator. Clicking a "missing" item deep-links to the relevant detail page.

### 5.2 Film Bible

**Purpose:** capture the film's foundational rules so they propagate into every prompt.

**Sub-pages (vertical tabs):** Concept · Theme · Tone · Visual style · Rules.

**Data shown:** rich text per sub-page. Visual style includes reference image upload (stored as Assets with `role: 'reference'`).

**Generation surface:** "Suggest from logline" button on Concept (LLM expansion). Style references appear in the bottom dock as "active style refs" so the user knows they're being injected into all future prompts.

### 5.3 Scene List

**Purpose:** see all scenes as an ordered table, gauge completion at a glance.

```
┌─────────────────────────────────────────────────────────────┐
│ Scenes (42)                                  + New scene    │
├──┬──────────────────────────────┬─────┬───────┬─────────────┤
│ #│ Heading                      │ Loc │ Shots │ Status      │
├──┼──────────────────────────────┼─────┼───────┼─────────────┤
│01│ EXT. SKY DOCK — DAWN         │ ✓   │ 4/4   │ approved    │
│02│ INT. KAEL'S QUARTERS — NIGHT │ ✓   │ 3/3   │ approved    │
│03│ EXT. DUST VALLEY             │ —   │ 0/0   │ no location │
│ ...                                                          │
└─────────────────────────────────────────────────────────────┘
```

**Primary actions:** new scene · reorder · click row → Scene Detail.

**Generation surface:** none — list view only.

### 5.4 Scene Detail (the central page)

**Purpose:** the unified work page where one scene's writing, visual planning, assets, and generation status all live.

```
┌─────────────────────────────────────────────────────────────┐
│ Scene 07: Ambush in the Dust Valley                         │
│ Purpose: First time hero chooses to fight back              │
├───────────────┬─────────────────────────────┬───────────────┤
│ Story         │ Storyboard                  │ Assets        │
│               │                             │               │
│ Summary       │ [Shot 01][Shot 02][Shot 03] │ Characters    │
│ Dialogue      │ [Shot 04][Shot 05][Shot 06] │ - Kael        │
│ Emotional     │                             │ - Mara        │
│ beat          │                             │ Location      │
│               │                             │ - Dust Valley │
│               │                             │ Props         │
│               │                             │ - Radio       │
├───────────────┴─────────────────────────────┴───────────────┤
│ AI: Generate missing shots │ Check continuity │ Create video│
└─────────────────────────────────────────────────────────────┘
```

**Three columns:** story (left, narrative + dialogue), storyboard (center, shot grid), assets (right, characters/location/props in this scene).

**Bottom dock:** scene-scoped AI actions — generate the missing shots in this scene, run continuity check across this scene, create video for approved frames.

This is the page the user spends most of their time on.

### 5.5 Character Detail

**Purpose:** define everything about one character.

**Tabs:** Arc · Appearance · Actor · Voice · Costumes.

**Generation surface (per tab):**
- Appearance → "Generate portrait" (gpt-image-1, prompt = appearance text + Bible visual style + costume).
- Actor → "Generate reference set" (4 portraits, locked to a face — used as `images` param for all later gen).
- Voice → "Generate sample" (audio asset).
- Costumes → "Generate costume reference image" per costume row.

Workflow: the **Card → Detail → Generate → Approve → Use in scene** pattern (see §6) applies here in full.

### 5.6 Location Detail

**Purpose:** define everything about one location.

**Sections:** description + world region · reference images · generated background renders · scenes using this location.

**Generation surface:** "Generate background plate" — multiple variations, user approves one or more. Approved renders become available to Storyboard shots in any Scene that uses this location.

### 5.7 Storyboard Board

**Purpose:** film-wide shot grid. Browse, reorder, batch-approve.

```
┌─────────────────────────────────────────────────────────────┐
│ Storyboard — Sky Fleet                                      │
├─────────────────────────────────────────────────────────────┤
│ Scene 01 [▣][▣][▣][▣]                                       │
│ Scene 02 [▣][▣][▣]                                          │
│ Scene 03 [□][□][□][□][□][□]   ← Scene with no generations   │
│ Scene 04 [▣][▢][▢]            ← partial                     │
│ ...                                                         │
└─────────────────────────────────────────────────────────────┘
```

`▣` = approved frame · `▢` = generated, awaiting approval · `□` = empty slot.

**Primary actions:** click a frame → expand to detail; bulk select → bulk regenerate; drag to reorder within a scene.

**Generation surface:** "Generate all empty shots in selected scenes" (queues up to N parallel image gens via the queue).

### 5.8 Generation Queue

**Purpose:** see what AI work is in flight, what failed, what's waiting.

```
┌─────────────────────────────────────────────────────────────┐
│ Generation queue                                            │
├─────────────────────────────────────────────────────────────┤
│ ⏳ Scene 04 / Shot 02 — image (gpt-image-1)     queued      │
│ 🔄 Scene 04 / Shot 01 — image (gpt-image-1)     running 6s  │
│ ✅ Scene 03 / Shot 04 — image                   done   12s  │
│ ❌ Mara — voice sample                          failed (retry)│
│ 🔄 Scene 02 / Shot 03 — video (Sora, 5s)        running 1m44s│
└─────────────────────────────────────────────────────────────┘
```

**Primary actions:** retry failed · cancel running · clear completed · click row → jump to the parent (scene/character/location).

**Generation surface:** the entire screen is a generation surface — but the user does not *initiate* gen here. Initiation happens at the scene/character/location where the asset belongs.

### 5.9 Timeline (read-only in MVP)

**Purpose:** see the film's approved clips in scene order.

**MVP behavior:** ordered list of approved video assets (and image assets shown as static frames with default duration). No editing, no transitions, no audio mix. Playback is sequential preview only.

**Post-MVP:** see Phase 2 in §9.

**Generation surface:** none in MVP.

---

## 6. Universal interaction pattern

Every creative artifact in this app — character, location, shot, costume, asset — flows through the same five-step pattern:

```
Card → Detail → Generate → Approve → Use in scene
```

**Why this matters.** It's the spec's UX spine. If a contributor proposes a screen that doesn't fit this pattern, that's a flag to redesign.

| Step | What happens |
| --- | --- |
| **Card** | Compact view in a list/grid (Storyboard, Scene List, Character grid). Shows status, thumbnail, name. |
| **Detail** | Full editable page for one artifact. Shows everything about it. |
| **Generate** | AI action(s) appropriate to the artifact, scoped to that detail page. |
| **Approve** | User marks a generated asset as canon. Status → `approved`. Approved is the only thing that flows to dependents. |
| **Use in scene** | Approved artifacts become available in scene-level pickers (character → scene cast, location → scene location, shot frame → storyboard slot). |

Examples of the pattern in action:

```
Character card  →  Character detail  →  Generate portraits/voice/costume  →  Approve  →  Cast in scenes
Location card   →  Location detail   →  Generate background images       →  Approve  →  Use in storyboard shots
Shot card       →  Shot detail       →  Generate frame → Generate video  →  Approve  →  Send to timeline
```

---

## 7. Architecture & stack

### Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 16 App Router** | Existing from v0.1. **AGENTS.md note:** Next 16 has breaking changes from training data — read `node_modules/next/dist/docs/` before touching APIs. |
| Language | TypeScript (strict) | |
| Styling | Tailwind v4 + shadcn/ui | shadcn for primitives (Button, Card, Dialog, Tabs); custom for film-specific surfaces (Storyboard grid, Film Map, Scene Detail three-column). |
| AI calls | **Vercel AI SDK v6** via **Vercel AI Gateway** | One key (`AI_GATEWAY_API_KEY`). gpt-4o-mini for parsing/structure; gpt-image-1 for images; **Seedance 2** for video; **ElevenLabs** for voice. Gateway used where supported; direct provider call as fallback. |
| Long-running gen | **Vercel Workflow DevKit** | Durable steps, pause/resume, retries — needed for video gen which can take minutes. |
| Database | **Neon Postgres + Drizzle ORM** | Postgres for relational scene/character/asset graph; Drizzle for type-safe queries + migrations. |
| File storage | **Vercel Blob** | All generated and uploaded media. Replaces v0.1's inline base64 data URLs. |
| Auth | **none in MVP** | Single user. If multi-device becomes a need: Clerk via Vercel Marketplace. |
| Hosting | **Vercel** | Existing. Fluid Compute for short routes; Workflow runtime for video jobs. |

### High-level diagram

```
Browser (Next.js client)
  ├── Film Map / Scene Detail / Character Detail / Storyboard / Queue / ...
  ├── shadcn/ui primitives + Tailwind
  └── Server Actions for mutations  ←──────┐
                                            │
Next.js Route Handlers + Server Actions     │
  ├── /api/parse-screenplay     (gpt-4o-mini)
  ├── /api/generate-image       (gpt-image-1)
  ├── /api/generate-video       (Workflow DevKit → Sora/Veo/Runway)
  ├── /api/generate-voice       (TBD provider)
  └── DB writes (Drizzle)
                          │                   │
                          ↓                   ↓
                Vercel AI Gateway        Neon Postgres + Vercel Blob
                          │
                          ↓
              OpenAI / Sora / Veo / Runway / voice provider
```

### Why these choices

- **AI Gateway over direct providers.** One key, swappable models, unified billing. Already working in v0.1.
- **Postgres + Drizzle over localStorage.** The v0.2 model has many-to-many joins (scene↔character, scene↔asset) that localStorage handles badly. Drizzle keeps types end-to-end.
- **Vercel Blob over inline base64.** v0.1 stored generated images as data URLs in localStorage — fine for tens of frames, broken at hundreds. Blob is cheap, gives stable URLs, and lets the same asset be referenced by Scene + Character + Storyboard without duplication.
- **Workflow DevKit only for video.** Image gen is ~10s synchronous — no need for durable execution. Video gen is minutes — must survive page reloads and dev-server restarts.
- **No auth in MVP.** Single user. Adding Clerk before it's needed costs setup time and adds a login step the user hits 100x/day for no reason.

---

## 8. Generation strategy

### Synchronous vs. async

| Job | Mode | Why |
| --- | --- | --- |
| Screenplay parse (LLM) | sync | Sub-10s. |
| Image gen (gpt-image-1) | sync | ~10s typical. |
| Voice sample | sync | Few seconds. |
| Video gen (**Seedance 2**) | **async via Workflow DevKit** | Minutes; must survive reloads. Job rows in `assets` table with `status` field; UI polls or subscribes. |
| Voice gen (**ElevenLabs**) | sync for short samples, async for longer dialogue | Voice cloning per character: each Character has a locked voice id; reference samples stored as Assets. |

### Continuity & consistency

The hardest problem in AI filmmaking is keeping the same character looking the same across 200 frames. Strategy:

1. **Bible visual style** is prepended to every gen prompt automatically. The user writes it once.
2. **Character reference set.** Each Character has an approved reference image (or set). Whenever generating a frame that includes that character, the reference is passed as the `images` param to gpt-image-1, locking face/hair/build.
3. **Location reference renders.** Each Location has approved background renders. Storyboard frames for shots in that location pass the location reference.
4. **Costume → character link.** When a Scene specifies a costume, gen prompts for that scene's frames include the costume reference image too.

The user never types these references in — they're derived from the Scene's `characters[]`, `location`, and active `costume` and injected automatically. This is the payoff of the relational data model.

### Asset states

```
queued  →  running  →  done  →  approved
                 │       │
                 │       └──→ (user can regenerate if not satisfied)
                 └──→  failed  →  (retry from queue screen)
```

`done` ≠ `approved`. Only `approved` assets flow to dependents (Storyboard, Timeline). This separation is what enables the "Approve" step in the Card→Detail→Generate→Approve→Use pattern.

---

## 9. Roadmap from current state

### Phase 0 — v0.1 POC ✅ (current, running)
Project→Scene→Shot, localStorage, screenplay paste, gpt-image-1 frame gen. Lives in `film-planner/`. **Will not be thrown away** — v0.2 evolves the same codebase.

### Phase 1 — v0.2 MVP (this spec)
- Migrate persistence: Postgres + Drizzle schema + Blob storage.
- Migration script: import existing `localStorage` projects.
- Expand model: add Character, Location, Asset tables + joins.
- Build the **9 MVP screens** (§5).
- Bible visual style + character reference auto-injection.
- Generation queue + Workflow DevKit for video.
- Scene Detail as the primary page.

### Phase 2 — v0.3 (deferred)
- Voice generation (provider TBD — see §11).
- Sound mix in Edit zone.
- Full editable Timeline with playback.
- PDF storyboard export.
- `.fdx` upload + parser (currently paste-only).

### Phase 3 — v0.4 (deferred)
- Continuity LLM scans ("Kael appears in 12 scenes but has no voice").
- Beat-sheet / treatment generator from logline.
- Multi-device sync (adds Clerk).
- MP4 export.

---

## 10. How to know the spec is right

Three walkthroughs the spec must pass:

1. **"Build a scene from scratch."** Trace: create Film → fill Bible → outline Story → create Characters with portraits → create Location with renders → create Scene (cast + location) → write shots → generate frames → approve → see in Storyboard. Every step maps to a screen in §5 and a row write in §4. ✓ confirmed.
2. **"Delete a Character" cascade.** What happens to Scene.characters joins, dialogue lines, generated portrait Assets, voice Assets? Spec answer: joins removed via FK cascade; dialogue lines preserved with `characterId = null`; Assets preserved (kept for archival; user can manually delete). ✓ confirmed in §4.
3. **"Kill the dev server mid video gen."** Job resumes on restart? Spec answer: yes, video jobs run on Workflow DevKit which is durable; image jobs are sync and idempotent (re-run if interrupted). ✓ confirmed in §8.

---

## 11. Decided providers

- **Video:** Seedance 2.
- **Voice:** ElevenLabs (per-character voice cloning; voice id stored on `characters.voiceModel`).
- **LLM (text/structure):** gpt-4o-mini via AI Gateway (kept from v0.1).
- **Image:** gpt-image-1 via AI Gateway (kept from v0.1).

## 12. Open questions (decisions still owed)

These should be resolved before Phase 1 implementation:

1. **Reference-image limit per gen.** gpt-image-1 has a max number of `images` inputs. Spec assumes character + location + costume = 3 max — confirm during implementation.
2. **Migration safety.** Should the v0.1 → v0.2 import be one-shot (read localStorage, POST, done) or two-step (export to JSON file, then import)? Two-step is safer; one-shot is faster.
3. **Bible visual-style propagation cap.** If the Bible says 10 paragraphs of style, do we send all of it to every gen call, or summarize? Likely summarize via a cached LLM digest, but TBD.
4. **Scene reordering vs. shot reordering UX.** Drag-to-reorder both, or is scene reorder a separate "outline" mode?
5. **Seedance 2 access path.** Direct ByteDance API vs. via AI Gateway (if supported) vs. via a wrapper provider — confirm before wiring.
6. **ElevenLabs voice cloning input.** Use existing voice samples uploaded by the user, or generate seed audio first then clone? Affects character setup flow.

---

## 13. Critical files (for implementers)

**Existing (v0.1 — to evolve, not replace):**
- `film-planner/src/lib/types.ts` — extend with v0.2 types alongside v0.1 (gradual migration).
- `film-planner/src/lib/storage.ts` — keep until migration done; add `storage-v2.ts` Drizzle layer.
- `film-planner/src/app/api/parse-screenplay/route.ts` — reusable; will be called from new Story zone.
- `film-planner/src/app/api/generate-shot/route.ts` — rename to `/api/generate-image`, generalize for character/location/shot.
- `film-planner/package.json` — add `drizzle-orm`, `@vercel/postgres` or `@neondatabase/serverless`, `@vercel/blob`, `@workflow/sdk` (or whatever WDK exposes), `@paralleldrive/cuid2`, `shadcn` deps.

**New (Phase 1 work):**
- `film-planner/drizzle/schema.ts` — schema from §4.
- `film-planner/drizzle/migrations/0000_init.sql` — first migration.
- `film-planner/src/app/(film)/[filmId]/map/page.tsx` — Film Map screen.
- `film-planner/src/app/(film)/[filmId]/scenes/[sceneId]/page.tsx` — Scene Detail (the central page).
- `film-planner/src/app/(film)/[filmId]/characters/[characterId]/page.tsx` — Character Detail.
- `film-planner/src/app/(film)/[filmId]/locations/[locationId]/page.tsx` — Location Detail.
- `film-planner/src/app/(film)/[filmId]/storyboard/page.tsx` — Storyboard Board.
- `film-planner/src/app/(film)/[filmId]/queue/page.tsx` — Generation Queue.
- `film-planner/src/app/(film)/[filmId]/timeline/page.tsx` — Timeline (read-only).
- `film-planner/src/app/api/import-v01/route.ts` — v0.1 → v0.2 migration endpoint.

(File paths are illustrative — confirm against Next.js 16 conventions per `AGENTS.md` before scaffolding.)
