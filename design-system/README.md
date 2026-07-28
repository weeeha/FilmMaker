# Design System

A complete [shadcn/ui](https://ui.shadcn.com) component library documented with [Storybook](https://storybook.js.org).

- **All 60 shadcn/ui components** installed under `src/components/ui/` — including the newest additions (Field, Item, Kbd, Spinner, Empty, Button Group, Input Group, Native Select, Combobox, and the chat primitives: Message, Bubble, Attachment, Message Scroller).
- **Storybook 10** with stories for every component in `src/stories/`, autodocs, a11y checks, and browser-based story tests (Vitest + Playwright).
- **Stack:** Vite 8 · React 19 · TypeScript 6 · Tailwind CSS 4 (Nova preset, Radix primitives, Lucide icons, Geist font).

## Getting started

```bash
npm install
npm run storybook        # open Storybook at http://localhost:6006
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run build-storybook` | Build the static Storybook site into `storybook-static/` |
| `npx vitest run --project=storybook` | Render-test every story in headless Chromium |
| `npm run dev` | Start the Vite demo app |
| `npm run build` | Type-check and build the demo app |

## Project structure

| Folder | Purpose |
| --- | --- |
| `src/components/ui/` | shadcn/ui primitives (managed by the shadcn CLI) |
| `src/components/ai-elements/` | AI Elements components (Conversation, Prompt Input, Reasoning, Tool, …) from the AI SDK registry |
| `src/components/` | Your custom components composed from the primitives (e.g. `StatCard`, `PageHeader`) |
| `src/prototypes/` | Full-page prototype screens (Dashboard, Login, Settings) |
| `src/stories/` | Storybook stories — `Components/`, `AI/`, `Custom/`, `Chat/`, and `Prototypes/` sections |

## Adding components

Registry components come from the shadcn CLI:

```bash
npx shadcn@latest add <component>
```

AI components come from the AI Elements registry (installed under
`src/components/ai-elements/`):

```bash
npx shadcn@latest add https://registry.ai-sdk.dev/<component>.json
```

Custom components live in `src/components/` and compose the primitives — see
`src/components/stat-card.tsx` for the pattern. Prototypes are plain React
pages in `src/prototypes/` rendered by `src/stories/prototypes.stories.tsx`
with `layout: 'fullscreen'`. In every case, add a matching story in
`src/stories/`.

> Note: after adding files with brand-new Tailwind utility classes, restart
> `npm run storybook` if the classes don't apply — the dev server caches the
> generated CSS.

## Publishing the Storybook

`storybook-static/` is a fully static site. Deploy it anywhere, e.g.:

- **Chromatic:** `npx chromatic --project-token=<token>` (also gives visual regression testing)
- **Vercel / Netlify:** point the build to `npm run build-storybook`, output dir `storybook-static`
- **GitHub Pages:** upload `storybook-static/` via your CI of choice
