# Reference Products — Design Research

**Author:** Alena · **Status:** Draft v1 · July 2026
**Related:** [alena-component-requirements.md](alena-component-requirements.md) · [alena-product-vision.md](alena-product-vision.md)

One flagship product per app type, chosen through a **differentiation** lens: these are the products whose interface patterns set the bar for the components FilmMaker needs. Screenshots and teardown notes from these apps feed the sketch → Claude → shadcn component workflow.

## Flagships

| App type | Flagship | Access reality | Strong alternates |
|---|---|---|---|
| Flow / node | **Higgsfield Flows** | login/paywall | Flora, Krea Nodes, Freepik Spaces |
| 3D gen/edit | **Spline** (+ Meshy for gen) | free tier + login | Meshy, Luma Genie, Tripo, Rodin |
| Video | **Runway** | login/paywall | Kling, Topaz Video AI, Sora |
| Audio | **ElevenLabs** | login/paywall | Suno, Udio |
| Image | **Midjourney** (web) | subscription | Krea, Ideogram, getimg |
| Text editing | **Lex** | login | Notion AI, Novel (OSS) |

## What to study in each

Mapped to the component groups in [alena-component-requirements.md](alena-component-requirements.md):

| Flagship | Component groups | Patterns to capture |
|---|---|---|
| Higgsfield Flows | **A** (flow builder) | Node cards, ports/edges, per-node vs. global run, execution status, canvas navigation |
| Runway | **B, C** (generation panel, media) | Generation panel layout, model-dependent settings, results gallery, video preview, timeline/scrubber |
| ElevenLabs | **E** (libraries & voice) | TTS editor with right settings sidebar, voices grid, audio preview rows, flow simplicity as usability bar |
| Midjourney (web) | **B, C** (prompt bar, gallery) | Prompt bar with reference handling, settings popovers, large media gallery with filtering |
| Lex | **D** (documents) | AI document editor block, inline generate/re-prompt, edit-generated-text flow, doc+chat hybrid |
| Spline / Meshy | — (future) | 3D generation/editing — **outside MVP scope**, tracked for the design system's future AI components |

Also studied earlier (see call notes from Jul 13): **ComfyUI** (professional node power, execution toolbar above nodes — capability target, clutter anti-pattern) and Chinese generation suites (alternative generation-panel layouts).

## Notes

- "Access reality" matters for research: paywalled apps limit hands-on time — collect screenshots systematically when access is available.
- Alternates are fallbacks when a flagship's pattern is weak or inaccessible, and a cross-check that a pattern is a convention rather than one product's quirk.
- Nick's product research notes are kept in separate documents (his own files).
