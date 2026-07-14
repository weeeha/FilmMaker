# AI Component Requirements — Design System Bridge

**Status:** Draft v1 · July 2026
**Related:** [mvp-requirements.md](alena-mvp-requirements.md) · [product-vision.md](alena-product-vision.md)

FilmMaker is developed in parallel with an **AI design system** built on **shadcn/ui + Tailwind**. This document lists the components the MVP requires that shadcn does not provide out of the box. Building FilmMaker is how we discover, validate, and prioritize these components; each one is designed here and contributed to the design system as a reusable, themeable component using standard shadcn CSS variables.

## Working process

Agreed workflow for producing each component:

1. **Design first** — sketch the component visually (Figma / screenshots of reference tools) so the AI has something concrete to anchor on.
2. **Generate** — feed the sketch/screenshot to Claude together with the shadcn component library: *"using these components, build me this new component."*
3. **Refine** — iterate on the result (spacing, states, variants) until buttons, paddings, and typography are consistent with the rest of the library.
4. **Contribute** — once approved, the component is added to the AI design system with documented variants and props.

Learning path before mass production: master the Claude + shadcn workflow on a single component → assemble a one-page interface from components → assemble a multi-page interface.

## Priorities

1. **Node/flow components** — first and foremost (nothing like them exists in shadcn).
2. **Generation panel family** — the second pillar; used in nodes and standalone.
3. **Media, library, and editor components** — structurally simpler; later within the MVP.

Every component must support a **simple mode and an advanced mode** (ElevenLabs-simple by default, ComfyUI-capable when expanded) and both light/dark theming via shadcn CSS variables.

---

## A. Flow builder components

| # | Component | Purpose | Key states / variants | shadcn base |
|---|---|---|---|---|
| A1 | **Flow canvas** | Pan/zoom surface where nodes live | empty, populated, selecting, connecting | none (new) |
| A2 | **Node card** | One node in the flow | variants per node type (text, image, video, TTS, music, composition, avatar, upload); states: idle, running, done, failed | Card, Badge, Button |
| A3 | **Node ports & edges** | Input/output connectors and the lines between nodes | valid/invalid connection, selected, animated while running | none (new) |
| A4 | **Node settings section** | Per-type settings inside a node | collapsed (simple) / expanded (advanced) | Form controls, Collapsible |
| A5 | **Inline result preview** | Node's output shown in the node | image, video (with audio toggle), audio, text | AspectRatio, Skeleton |
| A6 | **Run controls** | Per-node run button + global execution toolbar | idle, estimating cost, running with progress, done, failed | Button, Progress |

## B. Generation panel family

| # | Component | Purpose | Key states / variants | shadcn base |
|---|---|---|---|---|
| B1 | **Generation prompt bar** | Prompt input with actions | idle, generating, error; compact/full | Textarea, Button |
| B2 | **Reference strip** | Attachment thumbnails *above* the prompt bar | empty slots, filled, roles (reference / first frame / last frame / video ref) | none (new) |
| B3 | **Model picker** | Choose a model; drives dynamic settings | dropdown variant and expanded-cards variant; shows price & capabilities | Select, Popover, Card |
| B4 | **Dynamic settings controls** | Duration, resolution, aspect ratio that change per model | segmented-control variant, dropdown variant, tabbed variant | Tabs, Select, ToggleGroup |
| B5 | **Cost badge** | Price of the action before running; live-updates with settings | estimate, confirmed, insufficient balance | Badge, Tooltip |
| B6 | **Balance indicator** | Account credits, always visible | normal, low, empty | Badge |

## C. Media & results

| # | Component | Purpose | Key states / variants | shadcn base |
|---|---|---|---|---|
| C1 | **Media gallery grid** | Generated assets of a project | filter by type; loading skeletons; empty state | Card, Tabs, Skeleton |
| C2 | **Video preview card** | One generated clip | audio toggle in frame corner, duration, cost spent, actions (save / reuse / delete) | Card, Button |
| C3 | **Timeline / scrubber** | Frames + time navigation for editor and previews | playing, paused, scrubbing; with/without frame thumbnails | Slider (heavily extended) |
| C4 | **Audio player row** | Track with inline playback | playing, paused; in-grid and in-list variants | Button, Slider |

## D. Documents & characters

| # | Component | Purpose | Key states / variants | shadcn base |
|---|---|---|---|---|
| D1 | **AI document editor block** | Generated text block inside a document | generating (streaming), editable, re-prompting | Card, Textarea |
| D2 | **Inline generate popup** | Click empty space → prompt popover ("generate a bio here") | idle, generating | Popover, Textarea, Button |
| D3 | **Document + chat layout** | Document with attached AI chat context | chat open/closed | Sheet/Resizable, ScrollArea |
| D4 | **Character (avatar) card** | Character with photo, name, bio snippet | no-image (generate prompt), with images, selectable-as-reference | Card, Avatar, Button |

## E. Libraries & voice

| # | Component | Purpose | Key states / variants | shadcn base |
|---|---|---|---|---|
| E1 | **Voice card + voices grid** | Browse and preview voices | playing sample, selected | Card, Avatar, Button |
| E2 | **Track list / music library** | Browse, search, preview, pick music | table and grid variants | Table, Card |
| E3 | **TTS editor layout** | Text editor + right settings sidebar | generating, per-fragment regenerate | Resizable, Form controls |

## F. Workspace

| # | Component | Purpose | Key states / variants | shadcn base |
|---|---|---|---|---|
| F1 | **Project / folder card** | Project list and folder browsing | grid/list toggle, empty state | Card, ToggleGroup |
| F2 | **Context-sensitive side panel** | Settings panel that switches with selection | one variant per selected element type | Sheet, Tabs |
| F3 | **App layout shell** | Top-level layout: nav, workspace, panels | generator / editor / documents contexts | Sidebar, Resizable |

---

## Notes

- Reference tools studied so far: ElevenLabs studio (flow simplicity, voices grid, TTS editor), ComfyUI (professional node power, execution toolbar above nodes, per-node and global run), Chinese generation suites (alternative generation-panel layouts — settings as tabs vs. dropdowns, panel centered vs. docked bottom). Functionally these tools converge; differentiation is in clarity, cost transparency, and theming. The full research set — one flagship per app type — lives in [alena-reference-products.md](alena-reference-products.md).
- Each component ships with: all interactive states, light/dark themes, simple/advanced modes where applicable, and documented props — so it can be reused beyond FilmMaker in future AI tools.
