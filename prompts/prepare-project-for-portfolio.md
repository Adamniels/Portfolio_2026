# Prepare this project for my portfolio

You are working inside a project that may be added to my software engineering
and data science portfolio.

Your job is to understand the project from the repository, ask me only the
questions that cannot be answered from the available evidence, and create a
complete portfolio handoff.

## Important rules

- Inspect the project before asking questions.
- Do not invent users, results, metrics, responsibilities, motivations, or
  technical decisions.
- Clearly distinguish verified facts from reasonable inferences.
- Treat unfinished work honestly. Use `Prototype` when the project is not
  shipped.
- Focus on the problem, engineering decisions, tradeoffs, and outcome—not a
  generic list of technologies.
- Write concise, specific copy. Avoid phrases such as “cutting-edge,”
  “innovative,” “passionate,” and “leveraging.”
- Do not change the project implementation unless I explicitly ask.
- Do not expose secrets, private data, internal URLs, credentials, or sensitive
  customer information.

## Step 1: Inspect the project

Start by examining the repository. Look at the most relevant available sources,
including:

- README and other documentation
- Package manifests and dependency files
- Source structure and important entry points
- Tests, examples, notebooks, schemas, and configuration
- Existing screenshots, diagrams, demos, and design assets
- Git history when it is available and useful
- TODOs or issue notes that clarify the current project status

Determine:

- What the project does
- Who or what it is for
- The problem it addresses
- Its current status
- My likely contribution and role
- The most important technical or product decisions
- Meaningful constraints and tradeoffs
- Evidence of outcomes or measurable results
- Which visual could explain the project most effectively

Before asking me anything, briefly report what you were able to verify and what
remains uncertain.

## Step 2: Ask focused questions

If important information is still missing, ask me one compact batch of no more
than five questions. Only ask questions that materially improve the case study.

Prioritize:

1. My exact role, especially if the repository had multiple contributors
2. Why I started the project and who it was intended for
3. A difficult decision, constraint, failure, or tradeoff
4. The current status and what is genuinely working
5. Any outcome, feedback, or metric that cannot be verified from the repository

Do not ask me to repeat technologies, features, or implementation details that
you can discover yourself.

If I do not have a real metric, do not manufacture one. Use a specific,
verifiable qualitative outcome or mark the metric fields as needing a decision.

## Step 3: Create the portfolio handoff

After inspecting the repository and receiving any needed answers, create a file
named `PORTFOLIO_HANDOFF.md` in the root of this project.

Use the following template exactly.

Use only `Shipped` or `Prototype` for `status`. Leave `number` as
`TO_BE_ASSIGNED`; the portfolio will assign it based on project order.

---

# Portfolio handoff

## Project entry

```ts
{
  slug: "short-lowercase-url-slug",
  number: "TO_BE_ASSIGNED",
  title: "Short project name",
  kicker: "Two-to-four-word project category",
  summary: "One specific sentence describing what the project enables and for whom.",
  status: "Prototype",
  year: "YYYY",
  disciplines: [
    "Primary discipline",
    "Secondary discipline",
    "Optional third discipline"
  ],
  metric: "A short verified value or TO_BE_DECIDED",
  metricLabel: "A precise explanation of the metric or outcome",
  challengeTitle: "A short editorial sentence describing the core tension.",
  challenge: "A concise paragraph explaining the context, problem, constraints, and why the existing approach was insufficient.",
  approach: [
    "The first important decision or technical step",
    "The second important decision or technical step",
    "The third important decision or technical step"
  ],
  outcome: "A concise, evidence-backed description of what worked, what changed, or what was learned."
}
```

## One-minute project story

Write a natural 100–160 word explanation I could use when walking someone
through the project in an interview. Cover the problem, my role, the most
important decision, and the result.

## Technical depth

### Architecture

Explain the system or analytical workflow in 3–6 concise bullets. Name the
important components and how data or control moves between them.

### Key decisions and tradeoffs

Document the three strongest decisions. For each, include:

- The decision
- Why it was made
- The alternative considered
- The tradeoff or limitation

### Stack

List only the technologies that materially shaped the project. Group them as
appropriate, such as application, data, infrastructure, and tooling.

## Visual direction

Recommend one strong homepage visual and two or three supporting case-study
visuals. Prefer visuals that explain how the project works over decorative
mockups.

For each proposed visual, include:

- What it should show
- Which real project data or interface it can use
- Where the necessary source or asset is located
- Whether sensitive information needs to be removed or recreated

If the repository already contains useful assets, list their exact paths.

## Evidence and confidence

### Verified from the repository

List the main claims that are directly supported by code, documentation, tests,
or assets. Include file paths where helpful.

### Supplied by me

List the claims that came from my answers rather than the repository.

### Inferences or unresolved items

List anything that still needs verification or a decision. Do not hide
uncertainty inside polished copy.

## Recommended scope

Choose one:

- **Featured case study** — enough substance, evidence, and visual material for
  a dedicated project page
- **Compact project** — useful work, but better represented by a shorter entry
- **Not ready** — important context, evidence, or implementation is still
  missing

Explain the recommendation in two or three sentences.

---

## Step 4: Final quality check

Before finishing:

- Confirm every major claim has a source.
- Confirm the summary explains value rather than listing features.
- Confirm the case study makes my contribution understandable.
- Confirm unfinished elements are clearly identified.
- Confirm the proposed visuals can be created from available material.
- Remove duplicated ideas and generic filler.

Finish by telling me where `PORTFOLIO_HANDOFF.md` was created and summarize any
remaining decisions I need to make.
