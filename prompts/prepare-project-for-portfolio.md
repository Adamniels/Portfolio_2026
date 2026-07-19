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
    ],
    image: "/projects/PROJECT_SLUG/system-overview.svg"
  },
  technicalHighlights: [
    {
      title: "The first technical area I selected and am proud of",
      summary: "Why this problem or implementation is worth understanding.",
      details: [
        "A specific implementation detail",
        "A specific decision, algorithm, or boundary",
        "A tradeoff, limitation, or extension point"
      ],
      visualTitle: "Short title / Multi-part walkthrough",
      visuals: [
        {
          src: "/projects/PROJECT_SLUG/highlight-01-step-01.svg",
          alt: "Specific accessible description of what the diagram shows.",
          caption: "Step label — what this view explains.",
          label: "Short tab label"
        }
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
    details: [
      "Optional first explanatory paragraph.",
      "Optional second paragraph covering the result, limitation, or context."
    ],
    textOnly: false,
    evidence: [
      { value: "Verified value", label: "Precise explanation" },
      { value: "Verified value", label: "Precise explanation" },
      { value: "Verified value", label: "Precise explanation" }
    ]
  },
  outcome: "A concise, evidence-backed description of what worked, changed, or was learned.",
  outcomeTitle: "One strong closing statement.",
  outcomeSummary: "A concise explanation connecting the delivered work, validation, and remaining direction.",
  outcomeHighlights: [
    { label: "Delivered", text: "What was actually built or completed." },
    { label: "Validated", text: "What evidence, testing, or use established." },
    { label: "Next", text: "The most important limitation, extension, or next step." }
  ]
}
```

Use `textOnly: true` when a chart or evidence panel would feel forced,
duplicate the prose, or misrepresent the strength of the evidence. Keep
verified evidence in the handoff even when the portfolio may present the
section as text only.

Each technical highlight may use one diagram or a multi-part visual
walkthrough. Add as many `visuals` entries as the explanation genuinely needs.
In the visual direction, recommend a `light` or `dark` full-screen overlay for
each diagram according to where that asset remains clearest. Different diagrams
within one project may use different overlay themes.

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
method and qualitative result honestly. Explicitly recommend either a visual
evaluation treatment or a text-only section, and explain why that treatment is
the most accurate presentation of the available evidence.

### 05 — Outcome

Use the portfolio's preferred closing structure:

- One strong closing statement
- A concise supporting explanation
- **Delivered** — what was built or completed
- **Validated** — what testing, evidence, or use established
- **Next** — the most important limitation, extension, or next step

Do not force the outcome into a metric-led claim. Keep each item concise,
specific, and evidence-backed.

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
- One diagram or multi-part interactive walkthrough for each selected technical
  highlight; use multiple views when a sequence, state change, or comparison
  cannot be explained clearly in one frame
- An evaluation chart, test result, or evidence summary only when it represents
  the evidence honestly; otherwise recommend a text-only evaluation section

Prefer visuals that explain how the project works over decorative mockups.

For each proposed visual, include:

- What it should show
- Which real project data or interface it can use
- Where the necessary source or asset is located
- Whether sensitive information needs to be removed or recreated
- Whether its full-screen overlay should use the portfolio's `light` or `dark`
  theme, based on the asset's background and contrast

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
- Confirm the evaluation is explicitly marked as visual or text-only, with a
  reason grounded in the available evidence.
- Confirm the outcome uses the preferred closing statement, supporting
  explanation, Delivered, Validated, and Next structure.
- Confirm unfinished elements are clearly identified.
- Confirm the proposed visuals can be created from available material and each
  diagram has a justified light or dark overlay theme.
- Remove duplicated ideas and generic filler.

Finish by telling me where `PORTFOLIO_HANDOFF.md` was created and summarize any
remaining decisions I need to make.
