# Project Wiki — visual manifest

Six SVGs in `public/projects/project-wiki/`. All are self-contained (inline `<style>` in `<defs>`,
no `<image>`, no external script or font import), sized on a 1600-unit grid, and carry `<title>` and
`<desc>` for assistive technology. All six use the portfolio’s neutral light theme with blue emphasis, updated in
September 2026. Original artwork remains in Git on `main` at `c21c606`.

Each entry gives the short label the portfolio entry already uses, in bold, followed by the fuller
label for anywhere a longer one fits.

---

## 1. `system-overview.svg`

- **Theme:** light
- **Label:** **System overview** — connectors, engine, concept graph, three consumers
- **Caption:** Sources enter as stable coordinates, distillation turns them into a graph of typed concepts, and the browser, chat, and MCP server read that graph rather than the files.
- **Alt:** A four-column flow: git and Notion connectors feeding Postgres coordinates, a retrieval index and batched distillation engine, a small typed concept graph, and three consumers, with an info-versus-knowledge divider through the middle and dashed provenance threads running back from the graph to the source coordinates.

## 2. `highlight-01-step-01.svg`

- **Theme:** light
- **Label:** **Packing** — whole files packed against a token budget
- **Caption:** File-aware packing groups a document's units together up to a token budget, and sub-splits a single unit that exceeds it on its own.
- **Alt:** Three documents drawn as stacks of source units flow into a size budget and out as batches: two documents pack together into ordinal 0, and one oversized unit is sub-split into three pieces at ordinals 1 to 3 that all keep their parent's coordinate.

## 3. `highlight-01-step-02.svg`

- **Theme:** light
- **Label:** **Commit loop** — one batch, one transaction, one row
- **Caption:** Each batch runs in its own transaction and is recorded as it goes, so a failed batch is isolated and the run finishes the rest.
- **Alt:** Three lanes through the same four steps: batch 0 commits, batch 1 comes back cut off at the model's output cap and is recorded as failed with kind truncated and skipped, batch 2 commits, beside the batch table's three rows and the run's report of two done and one failed with the retry command.

## 4. `highlight-01-step-03.svg`

- **Theme:** light
- **Label:** **Retry policy** — the recovery follows the failure kind
- **Caption:** Retry re-plans the source at the revision the batch was read at, finds the batch by ordinal, and picks its policy from the recorded failure kind.
- **Alt:** A three-way fork on the recorded failure kind: truncated re-plans the batch's units into smaller sub-batches with the budget halved per prior attempt, a transient failure backs off and retries as-is, and invalid JSON is retried once and then left visibly failed, with attempts capped at three.

## 5. `highlight-02-flow.svg`

- **Theme:** light
- **Label:** **Maintenance flow** — a merged pull request, scoped by provenance
- **Caption:** The change set is computed from git rather than the webhook payload, only touched documents are re-ingested, and only the concepts pinned to those coordinates are re-examined.
- **Alt:** A four-step chain from a merged pull request through a git diff, re-ingestion of the touched documents, and provenance-based selection of concepts, forking into three outcomes — corrected, proposed for deprecation, or queued as contested — with a worked case where a retention period moved from 30 to 45 calendar days and the concept was corrected rather than retired.

## 6. `highlight-03-gate.svg`

- **Theme:** light
- **Label:** **make check** — six stages, four guards, one lesson
- **Caption:** The single build command runs formatting, lint, strict types, the dependency rule, the test suite, and the frontend build, with the documentation-honesty guards inside the test stage.
- **Alt:** A six-stage pipeline from formatting to the frontend build, with a callout listing the four documentation-honesty guards that run inside the test stage and a second callout describing the browser-driven init that passed its gate for months while never working, fixed by committing before scheduling.

---

## Palette used

Matches the portfolio’s September 2026 theme. Each SVG embeds its own styles so
it also works when opened or downloaded independently.

Background `#fcfcfd`, card `#ffffff` on `#c6cedb`, highlighted card `#edf2fc` on
`#91aade`, main text `#202630`, secondary text `#626b78`, accent and arrowheads
`#285bc5`, rejected or failed path `#b6423a`, failed surface `#fcf0ee`.

Sans stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif`.
Mono stack: `'SFMono-Regular', Menlo, monospace`. Labels use 1px letter spacing.
Diagram text and geometry are preserved; node corners and state surfaces match
the new theme.
