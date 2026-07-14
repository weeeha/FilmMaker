# FilmMaker — MVP Feature Requirements

**Status:** Draft v1 · July 2026
**Scope owner:** Product (Nick) · **Design:** Design system & components
**Related:** [product-vision.md](alena-product-vision.md) · [component-requirements.md](alena-component-requirements.md) · [roadmap.md](alena-roadmap.md)

The MVP covers six areas. These are **feature requirements** (what must be possible), not a component list — components are derived in [component-requirements.md](alena-component-requirements.md).

Priority order for design and build: the **Video Generator flow builder is first and foremost**; libraries are structurally simpler and come later within the MVP.

---

## 1. Video Generator

The core of the product: a node-based flow builder that generates shots and scenes.

### 1.1 Flow builder (nodes)

- Canvas where the user creates nodes, connects them into a chain, and arranges them freely.
- **Initial node types** (each with its own settings): 
  - **Text / Prompt** — write or generate text used downstream.
  - **Image generation** — text-to-image; supports reference images.
  - **Image composition** — combine two or more images into one.
  - **Video generation** — image/text-to-video; first frame / last frame optional inputs.
  - **Text-to-Speech** — voice selection + text input.
  - **Music / Audio** — pick from library or generate.
  - **Audio + Video merge** — combine a clip with its soundtrack/speech.
  - **Avatar / Character reference** — pick a project character; outputs their reference image(s).
  - **Upload / Asset** — bring an existing file into the flow.
- Each node exposes: inputs, outputs, model selector (where applicable), per-type settings, a **Run button for that node only**, execution status (idle / running / done / failed), and an inline preview of its result.
- **Global Run** executes the whole flow; global controls (run, progress, estimated cost) sit on a level above the nodes (execution toolbar), as in more professional tools.
- The final output of a flow can be previewed at any time — not only after the last node.

### 1.2 Generation panel

The panel used inside generation nodes (and standalone for quick generation):

- Prompt input (chat-box style — this is the industry-standard pattern).
- **Model selector**: switching models updates available settings, durations, and price. Different models have different capabilities.
- Settings per model: duration (e.g., 8s default, up to 15s on higher-tier models), resolution/aspect ratio.
- **Reference images**: up to several slots, addressable in the prompt ("use image 4 as an example"). Displayed as a strip *above* the prompt input — not inside it — to keep the input uncluttered.
- Optional **first frame / last frame** inputs for video; optional **video reference** (generate over an existing video). These are advanced options, hidden until needed — the user often doesn't know their first/last frame yet.
- **Cost before run**: the credit price of the generation is always visible before starting, and updates live as settings change.

### 1.3 Results

- Every generation is saved to the project automatically with its settings and prompt (history).
- Result preview: video player with an audio toggle in the corner of the frame.
- Clear answer to "where did my video go" — a project-level gallery of generated assets.

## 2. Video Editor

A **lightweight** editor for reviewing and assembling generated clips — explicitly *not* a professional NLE.

- Timeline with a scrubber showing **frames and time**.
- Sequence generated clips in order; preview the assembled result.
- Basic operations: trim, reorder, replace a clip, add/replace an audio track.
- Context-sensitive side panel: selecting an element (clip, music, speech) switches the panel to that element's settings; from there the user can edit, replace, or jump to regeneration.
- Small fixes should be possible without leaving the app ("small edits, small editor").

## 3. Projects

The workspace where everything belonging to a film lives.

### 3.1 Folders

- A project is a container: documents, references/sketches, characters, generated assets, flows, edits.
- Folder organization inside a project (e.g., Documents, References, Generated).
- Project list view: create, open, delete; simple search.

### 3.2 Documents

- Document types: script, scene descriptions, character descriptions, notes.
- **AI-assisted editing**: click an empty area → a popup prompt appears → generate content in place (e.g., "generate a biography for this character").
- Generated text appears as an editable block (ChatGPT-canvas pattern): the user can hit *Edit* and refine manually, or re-prompt.
- Documents keep their AI context — a document-plus-chat hybrid rather than a bare text file.

### 3.3 Avatars

- Character cards: name, biography, visual look (one or more generated images), wardrobe/appearance notes.
- Generate the visual look from the description; store multiple photos per character.
- **Reusable in generation**: an avatar can be picked inside image/video nodes as a reference, so characters stay consistent across shots.

## 4. Music Library

- Grid/list of tracks with inline playback preview.
- Search and basic filtering.
- Select a track → use it in a flow node or the video editor.
- Upload own tracks.

## 5. Voice Library

- Grid of voice cards (voice name, description, sample preview) — the familiar voices-grid pattern.
- Preview a sample; select a voice for TTS nodes and the voice editor.

## 6. Voice Editor

- Document-style text-to-speech editor: write or paste text, assign voice(s).
- Settings panel on the right (voice parameters per model).
- Generate speech, preview it, regenerate selected parts.
- Save resulting audio to the project for use in flows and the video editor.

---

## Cross-cutting requirements

- **Cost transparency everywhere**: balance always visible; price shown before any paid action.
- **Model-aware settings**: UI adapts to the selected model's capabilities.
- **Previews everywhere**: no step should require paying again just to see what you already made.
- **Simple by default, advanced on demand**: every surface has a clean default state; power settings are collapsed.
- **Everything persists to the project**: prompts, settings, results, and edits are never lost.

## Out of scope for MVP

- Marketplace purchases (buying music/voices) — libraries are browse/preview/use only.
- Hosting or fine-tuning our own models; local/open-source model execution.
- Professional-grade video editing (color, keyframes, effects).
- Collaboration / multi-user editing.
- Mobile.

## Open questions

1. **Aggregator vs. direct model APIs.** Direct contracts and open-source models are far cheaper (no commission, promo pricing), but what quality and reliability do we get, and how much integration work is each model?
2. **Launch model set.** Which image/video/TTS models ship in the MVP model picker?
3. **Final export.** Output format, resolution, and length limits for the assembled film; where large media files are stored (browser storage won't hold a film).
4. **Technical feasibility of in-browser editing.** Assumed harder than generation; the mini-editor scope may need adjusting after a technical spike.
