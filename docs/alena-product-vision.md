# FilmMaker — Product Vision

**Status:** Draft v1 · July 2026
**Source:** Team discussions (incl. the Jul 13 design-system call) and hands-on research of existing tools.

## The problem

Creating a film with AI today means jumping between disconnected tools:

- Script and character work happens in documents and chats.
- Image, video, speech, and music generation each live in separate services.
- Aggregator platforms (ElevenLabs-style studios, Chinese generation suites) bundle models but charge a commission on top of model prices and lock you into their workflow.
- Generation is expensive and unpredictable — a usable 5-second clip can take **10–80 attempts**. A basic film generated naively costs thousands of dollars.
- The results still have to be collected, reviewed, and assembled somewhere else.

There is no single place where a filmmaker can *plan* a film (script, scenes, characters), *generate* its material, and *assemble* the result — while staying in control of cost.

## The vision

**FilmMaker is an AI film creation studio: plan, generate, and assemble a film in one place.**

A filmmaker starts a project, writes the script and characters as AI-assisted documents ("click anywhere → generate a biography, generate a visual look"), turns scenes into node-based generation flows that reuse those characters as references, previews every step before paying for the next one, and edits the generated clips into a film — without leaving the app.

## Who it's for

Independent filmmakers and creators producing AI-generated films on a real-world budget. The first user is the team itself: FilmMaker is being built to make an actual film, so every feature is validated by real production needs (dogfooding).

## Core concepts

| Concept | What it is |
|---|---|
| **Project** | The container for one film: documents, characters, assets, flows, edits. |
| **Document** | Script, scene description, character description, notes — with inline AI generation and editing. |
| **Avatar / Character** | A described and visualized character (bio + generated look) that can be reused as a reference in generation. |
| **Flow** | A node graph that produces a shot or scene: text → image → video → speech → composition. |
| **Asset** | Anything generated or uploaded: images, clips, audio, music, references. |
| **Editors** | Lightweight video editor and voice (TTS) editor for refining generated material. |
| **Libraries** | Music and voice collections, browsable and previewable in place. |

## Experience principles

Learned from working hands-on with existing tools:

1. **Cost is a first-class UI concern.** Price is visible before every run, balance is always in view, and the cheapest iteration path is the default. You can run a single node without re-running the whole flow.
2. **Preview everything, always.** Every node shows its result; the assembled output can be previewed at any time — not only after a final global run (a gap in ElevenLabs-style flows).
3. **Simple by default, powerful on demand.** ElevenLabs' flow simplicity is the usability target; ComfyUI's power is the capability target — without its clutter ("millions of nodes and sub-nodes"). Components support a simple mode and an advanced mode.
4. **Model-aware UI.** Settings, durations, resolutions, and prices change with the selected model. The interface adapts instead of showing every option at once.
5. **An uncluttered prompt bar.** References, first/last frames, and attachments live *near* the input (e.g., a strip above it), not crammed inside it.
6. **Context-sensitive panels.** Selecting an element (speech, music, clip) switches the side panel to its settings, instead of piling all settings on screen.

## What FilmMaker is not (for now)

- **Not a professional NLE.** The video editor is for sequencing and fixing generated clips, not for professional post-production.
- **Not one-click text-to-film.** Fully automatic film generation is economically and technologically premature; FilmMaker optimizes human-guided generation instead.
- **Not a model host.** V1 uses hosted model APIs. The architecture should keep the door open to direct model contracts and open-source/self-hosted models later — they can be dramatically cheaper than aggregator pricing.

## Strategic context: the design system

FilmMaker is developed in parallel with an **AI design system** project. Building the app is the discovery mechanism for the design system: every interface pattern FilmMaker needs that shadcn/ui does not provide (node canvases, generation panels, media galleries, model pickers…) is designed here and contributed there as a reusable, themeable component. See [component-requirements.md](alena-component-requirements.md).

The build process itself is documented as a public case study: creating an AI product end-to-end — design system, components, user testing.
