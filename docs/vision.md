# FilmMaker - Vision

Status: draft for Nick's review, 2026-09-13. Proposed unless marked Decided.

## TL;DR

FilmMaker is one product with three zones and one home screen: Write, Produce, and Edit. Write is Film Writer as it already exists in Repo B: world-first records, a Generate popup, and Scenario as the screenplay lens (Board, Write, Scene page, Shot page), local-first with hosted mode as an opt-in. Produce takes Alena's node-flow generation engine and scopes it to a shot, opened from a Shot page, matching the rejection of tool-verb navigation ("Generate video" as its own destination). Edit starts as a read-only timeline of approved clips. It is built by two people, Nick and Alena, to make a real film, dogfooding every feature. The product name is open: this document says FilmMaker for the whole and Film Writer for the Write zone until Nick decides (decisions.md 17). Non-goals: no professional editor, no one-click text-to-film, no self-hosted models in v1, no native apps, no 3D or AR beyond the existing blocking stage, no multi-user in v1. The one-product reconciliation is Proposed as of 2026-09-13 (decisions.md 15).

## Legend

Three product definitions exist across the two repos. This document merges them. After this section, each is cited by file name, not by label.

| Label | File | Author, date |
|---|---|---|
| D1 | `archive/2026-07-alena-product-vision.md` (and its sibling `alena-*.md` files) | Alena, 2026-07-14 |
| D2 | `archive/system-design-v0.2.md` | Nick, 2026-04-25 (initial commit); called canonical 2026-07-21 |
| D3 | Repo B `docs/superpowers/specs/2026-07-21-film-writer-ia-design.md`, plus the `2026-08-22-film-writer-v2-rebuild-design.md` rebuild that layers on it | Nick, 2026-07-21; v2 rebuild 2026-08-22 |

## The problem

From D1: making a film with AI today means jumping between disconnected tools. Script and character work happens in documents and chats. Image, video, speech, and music generation each live in separate services. Aggregator platforms bundle models but charge a commission on top of model prices and lock the user into their workflow. Generation is expensive and unpredictable: a usable 5-second clip can take 10 to 80 attempts, and a basic film generated naively costs thousands of dollars. The results still have to be collected, reviewed, and assembled somewhere else.

There is no single place to plan a film, generate its material, and assemble the result while staying in control of cost.

## The product

One product, three zones. This is the reconciliation this document proposes (decisions.md 15): D1 and D2 were never reconciled with each other, D3 states it supersedes D2's shot-centric model, and D3 itself was later carried forward by the v2 rebuild that Repo B actually built.

App shell (Proposed): Film Writer's own tabs, World, Characters, Props, Scenario, plus a pinned Produce tab reached the same way Scenario is pinned, with Edit joining later. This replaces any earlier shell sketch; see decisions.md 16 for the open question of whether Film Writer and FilmMaker stay one product or two.

The approach is to reconcile rather than pick one definition over the other two. Each earlier definition owns the part it is strongest at: Film Writer for the writing model, D1 for the generation engine, D2 for the rule that keeps generation from taking over the navigation.

## Who it is for

Two people. Nick owns product. Alena owns the design system and components. The first user is the team itself: FilmMaker is being built to make an actual film, so every feature is checked against real production needs (D1 calls this dogfooding). D3's open questions name a submarine film as one of two films discussed; no further detail on it is recorded anywhere read for this document, so none is given here.

Film Writer's v2 rebuild adds a stance this document adopts: one person at one machine, local-first, with hosted mode optional rather than required. Repo B's README states there is no auth, single user, and localhost is the app's home; every query is still scoped by an owner id, so the isolation fence survives even without a server to enforce it.

The build itself is meant to be documented as a public case study, from D1: an AI product built end to end, design system, components, and user testing, in the open.

## The three zones

| Zone | What it does | Comes from |
|---|---|---|
| **Write** | Film Writer as it stands: world-first records (characters, props, locations), a Generate popup for text and images, and Scenario as the screenplay lens with a Board, a Write surface, a Scene page, and a Shot page. Local-first, with hosted mode as an opt-in behind env seams. This is where Nick's work in the Film Writer and Planner repo continues. | Repo B's `README.md` and its v2 spec, `docs/superpowers/specs/2026-08-22-film-writer-v2-rebuild-design.md`. |
| **Produce** | Generation, using Alena's node flows as the engine, scoped to a shot. A flow opens from a Shot page and is pre-seeded from the object graph (whether a flow can also open from a scene is open; see system-design.md section 11). The storyboard board and the generation queue live here. | D1's node-flow engine, scoped by D2's anti-pattern (below) and seeded by Film Writer's link graph. |
| **Edit** | A read-only timeline of approved clips first, a lightweight editor later. | D1's lightweight-editor scope, D2's read-only-first sequencing. |

Home is Film Writer's own Home screen (cover, logline, counts per tab, recent records, inbox badge, Generate shortcut), absorbing the progress-and-next-actions role D2 sketched for a separate Map screen.

Global navigation never shows "Generate video" as its own destination. D2 states this anti-pattern explicitly and rejects it:

> Generate character / Generate location / Generate video / Generate voice

D2's alternative, adopted here: organize by film artifact, with generation surfaced contextually, for example "Scene 07 has a missing character image, missing location render, missing storyboard frame" with a generate action attached to each. Inside Write, the top bar tabs and left-rail tree are Film Writer's own, as built. Inside Produce: Storyboard, Queue, and the Flow editor, the last reached only from a Shot page, never listed at the top level.

Libraries (music, voices) become pickers inside nodes and object fields, not their own zones. D1's Voice Editor becomes a speech node plus a document-mode text field. D1's Video Editor becomes the Edit zone.

## Experience principles

Merged from all three definitions. Each keeps its source.

| Principle | Source |
|---|---|
| Cost is visible before every run and shown again per run afterward; the cheapest iteration path is the default; a single node can run without re-running the whole flow. | D1 |
| Every node previews its result; the assembled output can be checked at any time, not only after a full run. | D1 |
| Simple by default, with an advanced mode on demand; capability without clutter. | D1 |
| Settings, durations, resolutions, and prices change with the selected model instead of showing every option at once. | D1 |
| References, first and last frames, and attachments sit near the prompt input, in a strip above it, not inside it. | D1 |
| Selecting an element switches the side panel to that element's settings. | D1 |
| `done` is not `approved`. Only approved assets flow to dependents such as the storyboard and timeline. | D2 |
| The model shows what context it was given, every generation, so a bad result is fixable by changing the input rather than rerolling. | D3 |

Later and unscheduled, not committed to this document: direct model APIs and open-source models for cost, multi-user and sharing, a marketplace, `.fdx` script import, PDF and CSV export, and continuity scans. See the Later section of [roadmap.md](roadmap.md).

## Non-goals

Merged from D1's "what FilmMaker is not," D2's out-of-scope list, and v2's own non-goals.

| Non-goal | Source |
|---|---|
| Not a professional NLE. The editor sequences and fixes generated clips, not full post-production. | D1 |
| Not one-click text-to-film. Fully automatic generation is treated as premature; the product optimizes human-guided generation. | D1 |
| Not a model host in v1. Hosted model APIs only; the architecture should keep room for direct model contracts and self-hosted models later. | D1 |
| No native iOS or Mac apps. | D2 |
| No multi-user, multi-tenant, real-time co-editing, or roles in v1; no two-way sync with an external screenplay document. | D2, v2 rebuild |

## Core concepts

D1 named the working vocabulary before either D2 or Film Writer existed. Most of it carries forward; where a term maps onto Film Writer's model, that mapping is noted.

| Concept | What it is | Carries forward as |
|---|---|---|
| Project | The container for one film: records, characters, assets, flows, edits. | Film Writer's `films` table plus the object graph underneath it. |
| Document | Script, scene description, character description, notes, with inline AI generation and editing. | Film Writer's article-style record body, edited in place with `[[mentions]]`. |
| Avatar / Character | A described and visualized character that can be reused as a reference in generation. | A Characters record with a cover image, seeded into Produce as an avatar node from its approved portrait. |
| Flow | A node graph that produces a shot or scene: text to image to video to speech to composition. | The Produce zone's flow editor, opened from a Shot page. |
| Asset | Anything generated or uploaded: images, clips, audio, music, references. | Film Writer's `images` table, extended with a status column, plus a new `media` table for video and audio (see `system-design.md` section 4). |
| Editors | Lightweight video editor and voice editor for refining generated material. | The Edit zone; the voice editor folds into a speech node plus a document text field. |
| Libraries | Music and voice collections, browsable and previewable in place. | Pickers inside nodes and object fields, not their own zones. |

## The generation pattern

D2 names a five-step pattern that every creative artifact goes through: Card, Detail, Generate, Approve, Use in scene. A character card opens to a character detail page, generates a portrait or voice sample, gets approved, and becomes available to cast in scenes. A location card follows the same path to a background render used in the storyboard. A shot follows it to a frame, then a video clip, sent to the timeline once approved.

This pattern is why `done` and `approved` are separate states (see Experience principles, above). It is also why Produce opens a flow from a Shot page rather than presenting flows as a standalone destination: the flow is the Generate step of a record that already has a Card and a Detail, not a tool a user visits on its own.

## How the object graph feeds generation

Film Writer's `links` table is why the two halves fit. When a flow opens for a shot, the app walks the links of the shot's parent scene, groups them by category, and seeds the flow: one avatar node per linked Characters record with an approved cover image, approved location assets as reference inputs, and the film's style note prepended to every prompt node. The user sees the seeded context in the node and can remove it. [system-design.md](system-design.md) section 4 gives the algorithm; it restates D2 section 8's continuity-injection idea on top of Film Writer's data model.

## Two tracks and the design system

Two tracks run in parallel: an app track (Nick, continuing Film Writer) and a design-system track (Alena, building the node-flow components Produce needs). D1 states the relationship directly: building the app is the discovery mechanism for the design system. Every interface pattern FilmMaker needs that Film Writer's own shadcn-on-Radix layer does not provide, such as node canvases, generation panels, and model pickers, is designed against the real product and contributed to the design system as a themeable component. See [design-system.md](design-system.md) for the current state of that system and its known defects, and [roadmap.md](roadmap.md) for where the two tracks join.

## How this vision came about

Three separate product definitions were written in 2026 without being reconciled: Alena's flow-first studio (D1, 2026-07-14), Nick's scene-centered system design (D2, written 2026-04-25, called canonical 2026-07-21), and Nick's world-first Film Writer spec (D3, 2026-07-21, which states it supersedes D2's shot-centric model). The design system was built against D1. Film Writer's own v2 rebuild (2026-08-22) is Nick's latest dated definition, layered on the July IA spec, and it is what actually got built. Film Writer has real screens today: a films list, the film shell, object list and detail views, search, capture inbox, and Generate image on a record page. No screen exists yet for the Produce or Edit zones. This document is the first attempt to state one product built from parts of all three rather than choosing among them. The reasoning behind each merge decision, and which choices are still open, is logged in [decisions.md](decisions.md). For the full detail behind each zone, see [system-design.md](system-design.md); for the sequence of work, see [roadmap.md](roadmap.md); for tools and products FilmMaker was compared against, see [reference-products.md](reference-products.md).
