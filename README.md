# Adam Nielsen — Portfolio Concept

A design-first portfolio concept for a software engineer and data science student.

## Add a project

Project metadata and case-study copy live in `content/projects.ts`. Adding a
project there creates its homepage summary and dedicated `/projects/[slug]` page.
Add the project's visual treatment in `components/project-visuals.tsx`.

To prepare an existing project, copy the contents of
`prompts/prepare-project-for-portfolio.md` into an agent running inside that
project. It will inspect the repository, ask for missing context, and produce a
`PORTFOLIO_HANDOFF.md` ready to bring back here.

## Run locally

```bash
npm install
npm run dev
```
