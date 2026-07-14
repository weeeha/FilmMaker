# FilmMaker

**AI film creation studio — plan, generate, and assemble a film in one place.**

Write scripts and characters as AI-assisted documents, generate shots and scenes through a node-based flow builder, pull from music and voice libraries, and edit the results — with generation cost visible at every step.

## Documentation

| Doc | What's inside |
|---|---|
| [Product vision](docs/alena-product-vision.md) | The problem, the vision, core concepts, experience principles, non-goals |
| [MVP requirements](docs/alena-mvp-requirements.md) | Feature requirements for the six MVP areas: Video Generator, Video Editor, Projects, Music Library, Voice Library, Voice Editor |
| [Component requirements](docs/alena-component-requirements.md) | The AI components the MVP needs — the bridge to the parallel design-system project |
| [Roadmap](docs/alena-roadmap.md) | Phases: workflow mastery → component library → MVP → beyond |
| [Reference products](docs/alena-reference-products.md) | Flagship AI products per app type — design research feeding the component work |
| [POC plan](docs/plan.md) | Implementation plan of the existing storyboard-planner POC |
| [System design](docs/system-design.md) | Technical design of the POC |

## Current state

- **Docs**: vision, MVP requirements, component requirements, and roadmap drafted.
- **POC**: `film-planner/` — a working storyboard planner (paste a screenplay → extracted scenes/shots → AI-generated reference image per shot, with style propagation). It becomes the seed of the MVP's Projects/Documents area.

## Related project

FilmMaker is built in parallel with an **AI design system**: a shadcn/ui-based component library extended with AI-specific components (node canvases, generation panels, model pickers, media galleries…). FilmMaker is the discovery vehicle — components proven here are contributed there. See [component requirements](docs/alena-component-requirements.md).

## Stack

- Next.js 16 + AI SDK v6
- Vercel AI Gateway (gpt-image-1)
- Tailwind v4 + shadcn/ui
- localStorage persistence (POC)

## Running the POC

```bash
cd film-planner
cp .env.example .env.local   # add AI_GATEWAY_API_KEY (or OPENAI_API_KEY)
pnpm dev
```
