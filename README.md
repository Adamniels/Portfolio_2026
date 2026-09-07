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

All 21 SVG diagrams use the same light palette, with blue for primary flow and
core logic, red for rejected or failed paths, and amber for mocked integrations.
Vend & Go’s system overview was restructured for larger labels. Original assets
remain in `main` at `c21c606`; SVGs and PNGs are tracked by Git. Commit or stash the
experimental changes before switching branches to compare designs.

Diagram colours are embedded in each SVG so downloaded files retain their theme:
canvas `#fcfcfd`, text `#202630`, secondary text `#626b78`, borders `#c6cedb`,
primary `#285bc5`, highlighted surface `#edf2fc`, failure `#b6423a`, mock `#93621a`.
Screenshots retain their original product colours.

## Smaller projects

Utilities, experiments, and embedded builds live in `content/smaller-projects.ts`.
That single array feeds both the homepage teaser (`selected-builds-preview.tsx`)
and the `/smaller-projects` index page, so adding an entry updates both. `summary`
is the homepage card line; `body` is the prose on the index page. `status`, `year`,
`technologies`, and `links` are optional and are omitted from the page when absent
rather than rendered empty.

Each `body` currently repeats its `summary` and should be expanded into real
paragraphs.

## Contact

Footer contact details live in `content/site.ts` and are rendered by
`components/site-footer.tsx` on every page. Empty values are omitted rather than
rendered as dead links. `githubUrl` is inferred from the local git user name and
is unconfirmed; `linkedinUrl` is empty and must be filled before release.

Technology labels use plain text with dot separators on both the index and case
studies. Project titles remain linked; the explicit action sits at the bottom of
each project entry.

The root `<html>` element uses `suppressHydrationWarning` to tolerate browser
integrations that inject attributes before hydration (observed with Zotero’s
`data-zotero-connector-injected` marker). This silences attribute mismatches on
that element only; it neither disables the integration nor suppresses descendant
hydration checks. Root attributes such as `lang` also share that exception.

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

Development and production builds share `.next`. Stop the development server
before building, or restart it after the build before reviewing the local preview.

The existing `lint` script opens the ESLint setup prompt because this repository
has no ESLint configuration or dependency. Configuring it is a separate decision;
the production build and TypeScript checks run without adding dependencies.
