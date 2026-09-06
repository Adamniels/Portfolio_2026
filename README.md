# Adam Nielsen — Portfolio

A portfolio focused on backend systems, architecture, and applied AI. The homepage
provides a concise project index; each project has a detailed engineering case study.

## Add a project

Project metadata and case-study copy live in `content/projects.ts`. Adding a
project there creates its homepage summary and dedicated `/projects/[slug]` page.
Keep `indexSummary` brief and list verified technologies in `technologies`.
Add product screenshots in `components/project-visuals.tsx`.

To prepare an existing project, copy the contents of
`prompts/prepare-project-for-portfolio.md` into an agent running inside that
project. It will inspect the repository, ask for missing context, and produce a
`PORTFOLIO_HANDOFF.md` ready to bring back here.

## Design

The September 2026 direction uses a light neutral background, blue accents, system
fonts, and a restrained project list. Case studies put architecture and engineering
before product screenshots, with expandable implementation details. Theme tokens
and responsive styles live in `app/globals.css`.

Original diagram artwork is preserved pending review of the new theme. The unused
`selected-builds-preview.tsx` component contains unverified placeholder projects
and is intentionally not rendered. Contact details are deferred until supplied.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run build
npx tsc --noEmit
```

The existing `lint` script opens the ESLint setup prompt because this repository
has no ESLint configuration or dependency. Configuring it is a separate decision;
the production build and TypeScript checks run without adding dependencies.
