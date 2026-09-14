# FilmMaker - Design System Requirements and Status

Status: draft for Nick's review, 2026-09-13. Proposed unless marked Decided.

## Legend

- D1 = `docs/archive/2026-07-alena-*.md` (Alena, 2026-07-14), the flow-first studio plan the design system was built against.
- D2 = `docs/archive/system-design-v0.2.md` (Nick, 2026-04-25; called canonical 2026-07-21), the scene-centered plan.
- D3 = Repo B's IA spec `docs/superpowers/specs/2026-07-21-film-writer-ia-design.md` (Nick, 2026-07-21) plus its v2 rebuild `docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md` (Nick, 2026-08-22), together the world-first plan D3 says supersedes D2.

See `decisions.md` for the full decision log, `vision.md` for the merged product direction, `system-design.md` for the domain model, and `roadmap.md` for phases.

## TL;DR

The design system is Alena's shadcn/ui library in `design-system/`, built against D1's component list (`docs/archive/2026-07-alena-component-requirements.md`). Film Writer (Repo B's app) has its own, separate design system: Radix primitives, Phosphor duotone icons, its own tokens (`src/design/tokens.ts`), and 38 Storybook stories, already built and in use. Repo A's design-system duplicates Repo B's generic shadcn layer; its unique value is `components/ai`, `components/super-ai`, and the 13-node family, none of which exist in Repo B. Which library the shipped app ends up using is the open integration decision (decision 16, options A, B, C below). Of D1's 26 requirement rows (A1-F3), the node cards (A2), ports (A3, partial), settings controls (B4), and a cost chip (B5, partial) are built; the flow canvas, edges, global run toolbar, reference strip, balance indicator, and everything in sections C through F are not. The 13-node card family (D1 and earlier notes called it a 12-node family; the repo has 13) has full stories, specs, and doc pages, and carries three confirmed defects: an avatar-port color mismatch between spec and code, a stale summary comment in `node-port.tsx`, and a stories file that documents the wrong component. Alena's unmerged commit `72c817e` (2026-09-13) adds a run menu, a cost tooltip, and per-node menus, plus a nodes playground in `film-planner/`, none of it merged yet. The Base UI/Lucide vs Radix/Phosphor conflict (decision 8) is now precise: Repo A's design-system depends on Base UI and Lucide, Repo B's app runs on Radix and Phosphor. Phase 2 (design-system track, in flight) is scoped to finish the flow canvas, edges, run toolbar, generation-panel family, a shared execution-status enum, and two new nodes; it exits when a shot's flow can be assembled and mock-run in Storybook with cost shown before and after. Produce wiring into the app is Phase 3.

## Purpose in the merged plan

The merged plan (`vision.md`, decision 15) splits the product into three zones: Write, Produce, Edit, plus a Home that absorbs the Map role. This design system is the candidate engine for **Produce**: the flow canvas, node cards, ports, generation-panel family (prompt bar, reference strip, model picker, settings, cost badge, balance), and the run toolbar. A Flow is opened from a Shot page or the Storyboard board, never from a global "Generate video" nav entry (D2's anti-pattern stays rejected).

**Write** is Film Writer as it stands (Repo B), not a consumer of this library. Film Writer already has its own object detail (View Record), document editing (mention editor with `[[links]]`), and scene workspace (Scenario: Board, Write, Scene page, Shot page) built on its own design system. Nothing in `components/ai` or `components/super-ai` is scoped to Write; see "Film Writer has its own design system" below.

**Edit** is out of this library's current scope; D1's C3 timeline/scrubber component is the closest match and is not built.

### Experience principles the components must uphold

`vision.md` carries these forward from D1, in spirit, as requirements on every Produce-zone component this library ships:

- Cost visible before every run and per run afterwards.
- Preview at every node.
- Simple by default, advanced on demand.
- Model-aware settings (the settings shown change with the selected model).
- Reference strip above the prompt, not inside it.
- Context-sensitive side panel.

Two more come from D2 and D3 and constrain how Produce-zone components connect to the rest of the app, even though they are not properties of the components themselves: `done` is not `approved`, only approved assets flow onward (D2); and the model shows what context it was given, every time (D3). N2, N3, and N4 in the traceability table below exist because of these two.

## Working process (from D1, kept as-is)

`docs/archive/2026-07-alena-component-requirements.md` records the agreed workflow, credited here in full because Phase 2 continues it unchanged:

1. Design first: sketch the component visually before building.
2. Generate: feed the sketch and the shadcn library to Claude, "using these components, build me this new component."
3. Refine: iterate on spacing, states, and variants until consistent with the rest of the library.
4. Contribute: once approved, add the component to the design system with documented variants and props.

D1 set a learning path (single component, then a one-page interface, then a multi-page interface) and a priority order that still holds: node and flow components first, the generation panel family second, media/library/editor components third. Every component is required to support a simple mode and an advanced mode, and both light and dark theming via shadcn CSS variables.

## Traceability

Rows A1-F3 are D1's original requirement list. Rows N1-N9 are new, added here because the merged plan needs them and D1 did not anticipate them. "Built" cites a file path or "none". "Coverage" means a Storybook story and, where it exists, a spec `.mdx`.

| ID | Requirement | Merged-plan name | Built | Coverage | Status | Gap |
|---|---|---|---|---|---|---|
| A1 | Flow canvas | Flow canvas (Produce) | none | none | Missing | Phase 2 scope item, not started. |
| A2 | Node card | Node card | `components/ai/ai-node.tsx` | `stories/nodes/*/*-node.stories.tsx` + `*-node-doc.mdx` (all 13 node dirs) | Built | `ai-node.stories.tsx` documents the wrong component (see Defects). |
| A3 | Node ports & edges | Node ports & edges | `components/ai/node-port.tsx` (ports only) | `node-port.stories.tsx`, `node-port-spec.mdx` | Partial | Edges do not exist; spec and code disagree on avatar port color. |
| A4 | Node settings section | Node menu / settings | `components/ai/node-menu.tsx` | `node-menu.stories.tsx` | Partial | Menu exists; no separate collapsed/expanded settings section documented. |
| A5 | Inline result preview | Preview (in-node) | markup inside each node's story, no shared component | per-node doc `## Anatomy` sections | Partial | No standalone preview component; each node hand-builds its preview area. |
| A6 | Run controls | Run button / run toolbar | `components/ai/run-button.tsx` (per-node); `components/ai/run-menu.tsx` (unmerged, `72c817e`) | `run-button.stories.tsx`; `run-menu.stories.tsx` (unmerged) | Partial | Per-node run button exists; global execution toolbar is a Phase 2 to-do. |
| B1 | Generation prompt bar | Prompt bar | markup inside each node's prompt row, no shared component | none standalone | Partial | Not extracted as a reusable component. |
| B2 | Reference strip | Reference strip | none | none | Missing | Phase 2 scope item. |
| B3 | Model picker | Model picker | partial logic inside `node-menu.tsx` | `node-menu.stories.tsx` | Partial | Not a standalone picker with price and capability display. |
| B4 | Dynamic settings controls | Settings bar | `components/super-ai/gen-settings-bar.tsx` | `super-ai-gen-settings-bar.stories.tsx` | Built | One TODO for keyboard behavior (see Defects); no spec page. |
| B5 | Cost badge | Cost chip / cost tooltip | `components/super-ai/cost-chip.tsx`; `components/ai/cost-tooltip.tsx` (unmerged, `72c817e`) | `super-ai-cost-chip.stories.tsx`; `cost-tooltip.stories.tsx` + `cost-tooltip-spec.mdx` (unmerged) | Partial | Tooltip variant not merged; no confirmed/insufficient-balance state seen. |
| B6 | Balance indicator | Balance indicator | none | none | Missing | Not started. |
| C1 | Media gallery grid | Media gallery | none | none | Missing | Not started. |
| C2 | Video preview card | Video preview card | none | none | Missing | Not started. |
| C3 | Timeline / scrubber | Timeline / scrubber | none | none | Missing | Not started; needed for Edit zone too. |
| C4 | Audio player row | Audio player row | none | none | Missing | Not started. |
| D1 | AI document editor block | Document editor block | none | none | Missing (belongs to Write) | Write zone uses shadcn primitives directly; not this library's scope. |
| D2 | Inline generate popup | Inline generate popup | none | none | Missing | Overlaps with N9 (context pane for Generate text) below. |
| D3 | Document + chat layout | Document + chat layout | none | none | Missing (belongs to Write) | Not this library's scope under the merged plan. |
| D4 | Character (avatar) card | Character card | `components/ai/ai-node.tsx` (Avatar node) covers the node form only | `stories/nodes/avatar/*` | Partial | A standalone character-library card (outside a flow) does not exist. |
| E1 | Voice card + voices grid | Voice card / grid | none | none | Missing | Libraries are pickers per the merged plan (`vision.md`), not yet built as such. |
| E2 | Track list / music library | Track list | none | none | Missing | Same as E1. |
| E3 | TTS editor layout | TTS editor layout | `stories/nodes/speech/*` covers the node form only | `stories/nodes/speech/*` | Partial | Standalone editor layout (outside a flow) not built. |
| F1 | Project / folder card | Project card | none | none | Missing | Not started. |
| F2 | Context-sensitive side panel | Side panel | none | none | Missing | Needed for both Produce and Write; not started. |
| F3 | App layout shell | App shell | none (prototypes are generic admin templates, not FilmMaker screens) | `prototypes.stories.tsx` | Stale | `src/prototypes/` (Acme login, analytics dashboard) does not represent any FilmMaker screen. |
| N1 | Execution status enum | Shared execution status | none shared; each node doc defines its own state set | per-node `-node-doc.mdx` `## States` sections | Missing | Phase 2 scope item: "one shared execution status enum across all 13 nodes." |
| N2 | Seeded-context chip in a node | Seeded context indicator | none | none | Missing | Phase 3 concept (continuity injection, `system-design.md`); no design-system vocabulary yet. |
| N3 | Cost per run display | Cost chip / tooltip | see B5 | see B5 | Partial | Same components as B5; "per run" (post-hoc, tied to a `runs` row) vs. "estimate" not distinguished yet. |
| N4 | Approve action | Approve control | none | none | Missing | D2's `done` vs `approved` distinction (`vision.md`) has no built control. |
| N5 | Storyboard grid cell | Storyboard cell | none | none | Missing | Produce-zone Storyboard board; not started. |
| N6 | Scene workspace tabs | Scene tabs | Film Writer's own: Scenario Board, Write, Scene page, Shot page (Repo B `film-planner/`) | not confirmed here | Built (Film Writer), not wired | Film Writer already has this. Scene and Shot pages and the 3D stage are built and tested but not wired to a route yet; the July tab model (About, Storyboard, Script) is superseded by v2 and never built. Not this library's scope. |
| N7 | Object card | Object card | Film Writer's own: View Record (Repo B `film-planner/`) | not confirmed here | Built (Film Writer) | Film Writer already has this: wiki-article layout, infobox/properties, click-to-edit body, mentions and backlinks. Not this library's scope. |
| N8 | Four list views (table, gallery, masonry, sequence) | List views | Film Writer's own: Collection `ListView` = table \| gallery \| masonry \| sequence, plus a map view (Repo B `film-planner/`) | not confirmed here | Built (Film Writer) | Film Writer already has this, built and wired. Not this library's scope. |
| N9 | Context pane for Generate text | Context pane | none | none | Missing | D3's "model shows what context it was given" principle; no built component in either library. |

## Node family

The node family has 13 story directories under `design-system/src/stories/nodes/`. Every node has a `-node.stories.tsx`, a `-node-doc.mdx`, and a `-node-spec.mdx`. The `Source:` line is quoted verbatim from each node's doc page.

| Node | Ports in | Ports out | States documented | Source line |
|---|---|---|---|---|
| Avatar | text | avatar | 7 (Default, Selected-Empty, Selected-Typing, Selected-Filled, Generating, Generated, Generated-Error) | Adapted from ElevenLabs Avatars to match the current implementation. |
| Composition | video, sound | video | 4 (Default, Selected, Generating, With Clips) | Source: ElevenCreative Flows. |
| Dubbing | video | video | 4 (No Source, Ready, Generating, Selected) | Adapted from ElevenLabs Dubbing to match the current implementation. |
| Image Generation | image, text | image | 7 (Default, Selected-Empty, Selected-Typing, Selected-Filled, Generating, Generated, Generated-Error) | Adapted from ElevenLabs Image & Video to match the current implementation. |
| Lip Sync | avatar, sound, text | video | 7 (same set as Image Generation) | Adapted from ElevenLabs Image & Video to match the current implementation. |
| LLM | text | text | 7 (same set as Image Generation) | Note: ElevenLabs does not currently provide a standalone public description of the LLM node in ElevenCreative Flows. This description is based on its documented LLM functionality in ElevenAgents. |
| Music | audio, text, text | audio | 8 (adds Lyrics Off) | Source: ElevenLabs Music. |
| Sound Effects | text | audio | 7 (same set as Image Generation) | Adapted from ElevenLabs Sound Effects to match the current implementation. |
| Text to Speech | text | sound | 7 (same set as Image Generation) | Source: ElevenLabs Text to Speech. |
| Text | none | text | 5 (Default, Selected-Empty, Selected-Typing, Selected-Filled, Disabled) | No source line found in this node's doc page. |
| Video Generation | speech, audio, image, text | video | 8 (adds Disabled) | Source: ElevenLabs Image & Video. |
| Voice Changer | audio | audio | 7 (same set as Image Generation) | Source: ElevenLabs Voice Changer. |
| Voice Isolator | audio | audio | 3 (Default, Selected, Generating) | Adapted from ElevenLabs Voice Isolator to match the current implementation. |

## Unmerged: `origin/design-system` tip `72c817e`

`git show --stat origin/design-system -1` (checked 2026-09-13) shows Alena's commit "Add Run menu, cost tooltip, per-node menus, and film-planner nodes playground", 56 files changed, not present on this branch. It adds:

- `components/ai/run-menu.tsx` and `components/ai/cost-tooltip.tsx`, with stories and a `cost-tooltip-spec.mdx`.
- Node menu parts (`node-menu-parts.stories.tsx`, `node-menus-by-node.stories.tsx`, `stories/nodes/menus.tsx`).
- Rewrites of `run-button.tsx` and a new `run-button-spec.mdx` (607 lines).
- Updates to `node-port-spec.mdx` (the avatar-port defect below may be touched by this diff; not confirmed here since the commit is unmerged).
- Deletes all 13 `-node-doc.mdx` files and moves their content into the node stories (the commit message says "move node docs into stories"). The node family table below quotes the doc pages as they exist on `main` today.
- In `film-planner/`: shadcn UI primitives (`badge`, `button`, `card`, `dropdown-menu`, `input`, `separator`, `textarea`, `toggle`, `tooltip`) and a new `/playground/nodes` page.
- `.claude/launch.json` for a Storybook preview launch config.

Phase 0 (`roadmap.md`) lists merging or closing this branch as a first task. Until merged, none of `72c817e`'s components count as built in the table above; they are marked "unmerged" where cited.

## Known defects (confirmed against source)

| Defect | Confirmed by |
|---|---|
| `node-port-spec.mdx` says the avatar port is the standard blue treatment ("same as video / image / speech / 3D / frames"); `node-port.tsx`'s `portConfig` sets `avatar: { color: "tan" }`. | Read both files directly, 2026-09-13. |
| `node-port.tsx`'s summary comment states "the `text` port is neutral, the `sound` port is purple, and all other types are blue," but the same file's `portConfig` also sets `audio: "purple"` and `avatar: "tan"`. | Read `node-port.tsx` lines 22-60 directly. |
| `stories/ai-node.stories.tsx` imports `Node` from `@/components/ai-elements/canvas` and `@/components/ai-elements/node` (the stock AI Elements node), not `@/components/ai/ai-node.tsx`. The real AINode stories live under `stories/nodes/`. | Read the file's imports directly. |
| Three TODOs mark unimplemented keyboard behavior: `choice-chips.tsx:55` (roving tabIndex for the ARIA radiogroup pattern), `field-row.tsx:60` (click-to-focus from the unit suffix), `gen-settings-bar.tsx:16` (arrow-key roving tabIndex, APG toolbar pattern). | Read all three files at the cited lines. |
| The nine `super-ai` components each have exactly one Default story and no spec page. | `super-ai-*.stories.tsx` each contain one `export const`; `ls design-system/src/stories/*super-ai*spec*` returns no files. |
| No flow canvas, edges, global run toolbar, shared execution status enum, Upload/Asset node, or Image composition node exist yet. | `ls design-system/src/components/ai design-system/src/components/super-ai` and `ls design-system/src/stories/nodes` show none of these. |
| `prototypes/` are generic admin templates (Acme login, analytics dashboard), not FilmMaker screens, and do not stand in for the app shell used anywhere in the merged plan. | `src/prototypes/dashboard-page.tsx`, `login-page.tsx`, `settings-page.tsx` read directly; `prototypes.stories.tsx` is the only story covering them; Film Writer's real shell (top bar, left rail, outline rail) is built in Repo B `film-planner/`, unrelated to these files. |

Repo A's frozen `film-planner/` (the April 2026 POC) is out of this document's scope in detail (it is a frozen app, not the design system) but is relevant to the integration decision below: it has no `.env.example`, no tests, no try/catch around AI SDK calls, and open POST endpoints (see the README's Known gaps). It is separate from Repo B's `film-planner/`, which is Film Writer's live app.

## Film Writer has its own design system

Repo B's app (`film-planner/`) ships a complete, separate design system, not this one. Tokens live at `film-planner/src/design/tokens.ts`; the stack is shadcn components on Radix primitives with Phosphor duotone icons; coverage is 38 Storybook stories. Token names stay stable across visual restyles: the same names carried through the dark "Lightboard" identity (2026-08-01) and the later Linear-dense tokens (2026-08-22). This system already includes an object card (View Record), four list views, and the Scenario scene workspace, all built and most wired to routes.

Repo A's `design-system/` generic shadcn primitive copies (buttons, inputs, cards, and similar) duplicate what Film Writer already has. The unique value this library holds that Film Writer does not is `components/ai`, `components/super-ai`, and the 13-node family, none of which have an equivalent in Repo B.

## Open conflict: Base UI/Radix and Lucide/Phosphor

The conflict is now precise. Repo A's `design-system/package.json` lists both `@base-ui/react` (`^1.6.0`) and `radix-ui`/`@radix-ui/react-use-controllable-state` as dependencies, and its README describes the stack as "Radix primitives, Lucide icons." Repo B's app runs on Radix and Phosphor: `radix-ui` is used across 21 files in `film-planner/src`, `@base-ui/react` sits in Repo B's `package.json` unused (0 files import it), and its app-authored components use Phosphor only, with Lucide present as an unused dependency. This is an open conflict between what Repo A's design system depends on and what Repo B's shipped app actually runs on (decision 8). This document does not resolve it; `roadmap.md` assigns resolution to Phase 0 or Phase 2, tied to which integration option (A, B, or C, below) Nick picks.

## Phase 2 scope and exit

From `roadmap.md` (Phase 2, Flow builder, design-system track, in flight):

Finish D1's A and B component rows: flow canvas wrapper on xyflow, edges, global run toolbar with cost estimate, generation panel family (prompt bar, reference strip, model picker, dynamic settings, cost badge, balance), one shared execution status enum across all 13 nodes, an Upload/Asset node, and an Image composition node. Fix the defects listed above. Add state matrices and spec pages for the `super-ai` components.

Exit criterion: a shot's flow can be assembled and mock-run entirely in Storybook, with cost shown before and after the run.

## How the app consumes the design system

This depends on decision 16, "one product or two, and where the flow components live" (open, recommendation A):

- **Option A (recommended): one product, node components ported into Film Writer.** Film Writer (Repo B) is the app. Alena's node-flow components become its Produce zone, ported onto Film Writer's own primitive layer (Radix, Phosphor, its tokens) and shipped as a package living in Repo B; Repo A keeps the docs and archive, or is folded in. Reason: Film Writer already has the object graph (`links`), Shot pages, image generation, and provenance the seeding idea needs, and v2's own non-goal rules out moving Film Writer to Base UI. Cost: this option is a port, not a drop-in. Every `components/ai` and `components/super-ai` component that touches Base UI or Lucide (see the conflict above) has to be rebuilt on Radix primitives and Phosphor icons, and the two token sets reconciled into one. That port is Alena's to scope and weigh; it is not costed here.
- **Option B: two products with a hand-off.** Film Writer exports a shot's context (scene text, linked records, images, style note); this design system's flow builder, in its own app, imports it. Each product keeps its own stack and name; no port needed, but the two apps stay separate and the hand-off format is new work.
- **Option C: no shared app.** FilmMaker stays a design-system case study with no app of its own. Film Writer adopts individual components from it as needed, on its own terms and its own primitive layer.

Until Nick decides, `film-planner/` (Repo B) does not consume this design system at all: the unmerged `72c817e` commit's `/playground/nodes` page in Repo A's `film-planner/` uses its own local copies of shadcn primitives (`film-planner/src/components/ui/`), not an import from `design-system/`, and that page is unrelated to Repo B's `film-planner/`.

## What this document does not cover

This document is scoped to `design-system/` (Alena's package) and does not restate `system-design.md`'s domain model, `roadmap.md`'s phase sequencing beyond Phase 2, or `decisions.md`'s full log. The `flows`/`runs`/`media` tables and `images.status` column that Produce-zone components will eventually read and write are defined in `system-design.md`; nothing in this library reads them yet, because no Flow editor is wired into Film Writer. Film Writer's own build (Repo B `film-planner/`) is Nick's app track and is out of scope here except where it bears on the Base UI/Radix and Lucide/Phosphor conflict above.

## Sources read for this document

`docs/archive/2026-07-alena-component-requirements.md` (in full), `design-system/README.md`, `design-system/package.json`, `design-system/src/components/ai/node-port.tsx`, `run-button.tsx`, and `node-menu.tsx`, `design-system/src/stories/node-port-spec.mdx`, `design-system/src/stories/ai-node.stories.tsx`, every `-node-doc.mdx` under `design-system/src/stories/nodes/`, the three `super-ai` component files named in the defects table, and `git show --stat origin/design-system -1` for commit `72c817e`. Confirmed directly for Film Writer's design system: `ls` on Repo B `film-planner/src/design` (shows `tokens.ts`, `tokens.stories.tsx`, `tokens.test.ts`), a count of 38 `.stories.*` files under Repo B `film-planner/`, and a search for `@base-ui/react` imports under Repo B `film-planner/src` (0 matches).
