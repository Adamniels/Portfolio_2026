# Prepare this project for my portfolio

You are working inside a project that may be added to my software engineering,
data science, and embedded systems portfolio.

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
- For team projects, use `we` for shared work and outcomes. Ask what I
  contributed before making individual claims, but do not repeatedly foreground
  the team size.
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
- Which two to four technical areas appear strongest for a detailed showcase
- What the repository suggests I may have contributed personally, without
  presenting that inference as fact

Before asking me anything, briefly report what you were able to verify and what
remains uncertain.

## Step 2: Ask focused questions

Before asking questions, recommend two to four potential technical highlights
based on the repository. For each recommendation, briefly explain:

- Why it is technically interesting
- What evidence supports it
- What decision, tradeoff, or implementation detail could be demonstrated
- Which visual would explain it well

Then ask me which one or two I personally worked on and feel most proud of. Do
not decide what I am proud of from the code alone.

If other important information is still missing, ask me one compact batch of no
more than five questions in total. Only ask questions that materially improve
the case study.

Prioritize:

1. My exact role, especially if the repository had multiple contributors
2. Why I started the project and who it was intended for
3. Which recommended technical highlight I most want to showcase, why I am
   proud of it, and what my contribution was
4. A difficult decision, constraint, failure, or tradeoff
5. The current status and any outcome, feedback, or metric that cannot be
   verified from the repository

Do not ask me to repeat technologies, features, or implementation details that
you can discover yourself.

If I do not have a real metric, do not manufacture one. Use a specific,
verifiable qualitative outcome or mark the metric fields as needing a decision.

## Step 3: Create the portfolio handoff

After inspecting the repository and receiving any needed answers, create a file
named `PORTFOLIO_HANDOFF.md` in the root of this project.

Use the following template exactly.

Use only `Shipped` or `Prototype` for `status`. Leave `number` as
`TO_BE_ASSIGNED`; the portfolio will assign it based on project order. Use
`featured` when the project should receive a primary homepage presentation and
`compact` when it should appear under Additional work.

---

# Portfolio handoff

## Project entry

```ts
{
  slug: "short-lowercase-url-slug",
  number: "TO_BE_ASSIGNED",
  scope: "featured",
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
  architecture: {
    title: "A clear sentence explaining why the architecture matters.",
    summary: "A concise explanation of the components, boundaries, data or control flow, and the architectural quality worth showcasing.",
    flow: [
      "First component or stage",
      "Second component or stage",
      "Third component or stage",
      "Fourth component or stage",
      "Optional fifth component or stage"
    ]
  },
  technicalHighlights: [
    {
      title: "The first technical area I selected and am proud of",
      summary: "Why this problem or implementation is worth understanding.",
      details: [
        "A specific implementation detail",
        "A specific decision, algorithm, or boundary",
        "A tradeoff, limitation, or extension point"
      ]
    },
    {
      title: "Optional second technical highlight",
      summary: "Why it matters and how it connects to the larger system.",
      details: [
        "A specific implementation detail",
        "A specific decision, algorithm, or boundary",
        "A tradeoff, limitation, or extension point"
      ]
    }
  ],
  evaluation: {
    title: "A sentence explaining how the project was evaluated.",
    summary: "What was tested, measured, compared, or learned.",
    evidence: [
      { value: "Verified value", label: "Precise explanation" },
      { value: "Verified value", label: "Precise explanation" },
      { value: "Verified value", label: "Precise explanation" }
    ]
  },
  outcome: "A concise, evidence-backed description of what worked, changed, or was learned.",
  outcomeDetails: [
    "Optional first longer outcome paragraph.",
    "Optional second paragraph covering limitations, remaining work, or reflection."
  ]
}
```

## One-minute project story

Write a natural 100–160 word explanation I could use when walking someone
through the project in an interview. Cover the problem, my role, the most
important decision, and the result.

## Case-study narrative

Write the deeper narrative in the same five-part structure used by the
portfolio:

### 01 — Challenge

Explain the context, existing approach, constraints, and central tension.

### 02 — Architecture

Explain the system or analytical workflow, its important boundaries, and how
data or control moves through it. Focus on why the architecture helped the
project rather than merely naming layers. Include 3–6 concise flow stages.

### 03 — Technical highlights

For each highlight I selected, explain:

- The technical problem
- Why it was difficult or interesting
- My contribution
- How it works
- The strongest decision or tradeoff
- A limitation or future extension

Do not turn this into a generic feature list. Prefer one or two substantial
highlights over many shallow ones.

### 04 — Evaluation

Explain how the project was tested, validated, compared, or studied. Use
verified evidence. If no quantitative metric exists, describe the evaluation
method and qualitative result honestly.

### 05 — Outcome

Explain what was delivered, what worked, what still needs improvement, and what
was learned. Use smaller, longer explanatory paragraphs when the outcome cannot
be expressed honestly as one short metric-led statement.

## Supporting technical information

### Key decisions and tradeoffs

Document the three strongest decisions. Include the decision, reasoning,
alternative considered, and tradeoff or limitation.

### Stack

List only technologies that materially shaped the project, grouped as
appropriate.

## Visual direction

Recommend visuals for the full case-study structure:

- One strong homepage visual
- One architecture diagram or system-flow visual
- One diagram, code walkthrough, state transition, or comparison for each
  selected technical highlight
- One evaluation chart, test result, or evidence summary

Prefer visuals that explain how the project works over decorative mockups.

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
- Confirm the architecture explains why its boundaries or flow mattered.
- Confirm the technical highlights are the areas I selected, not assumptions
  made by the agent.
- Confirm each technical highlight contains implementation detail and a
  tradeoff, limitation, or extension point.
- Confirm the evaluation and outcome are separate and do not overstate results.
- Confirm unfinished elements are clearly identified.
- Confirm the proposed visuals can be created from available material.
- Remove duplicated ideas and generic filler.

Finish by telling me where `PORTFOLIO_HANDOFF.md` was created and summarize any
remaining decisions I need to make.
