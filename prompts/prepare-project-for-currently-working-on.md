# Prepare this project for the "Currently working on" section

You are working inside a project that may be added to the **Currently working
on** section of my portfolio, not the main case-study section.

That distinction matters. The main case studies (`content/projects.ts`)
document shipped or prototyped work with evaluated outcomes. "Currently
working on" (`content/currently-working-on.ts`) is for active, early-stage
side projects where there's nothing shipped to evaluate yet. The write-up
should read as an honest, modest personal account of why the project exists
and what I'm actually exploring, not a polished engineering pitch. Do not
borrow the case-study tone (highlight lists, metrics, "evaluation" sections).
None of that belongs here.

## Context I already have (verify, don't re-derive from scratch)

- This is the **second version** of my personal platform. I started building
  an earlier version and rethought the approach. Say this plainly; it's part
  of the honest story, not something to gloss over or hide.
- The idea: a tool meant to live and evolve with me over a long time, not
  solve one immediate problem and get abandoned. Whenever I come across
  something worth integrating into how I work (a new tool, a workflow, an
  automation, something embedded, something software) this platform is
  meant to be where I use it from.
- Architecturally, the intent is a stable **core** plus **features** that are
  easy to add and remove. A feature that turns out to be genuinely useful
  should be decoupled enough to pull out and run as its own standalone
  product.
- Confirm all of this against what's actually in the repository. If the code
  doesn't yet reflect part of this vision (e.g. the core/feature boundary is
  still conceptual, not implemented), say so plainly rather than describing
  the aspiration as done.

## Important rules

- Inspect the project before asking me anything.
- Do not invent features, a v1-to-v2 story, results, or a "why it matters"
  narrative I haven't confirmed. Distinguish what you verified from what you
  inferred.
- Write in flowing paragraphs, not a bullet list of engineering highlights.
  Two short paragraphs is usually enough: one on what the idea is and why it
  started (including the v1 rethink), one on what's actually built and
  what's next.
- Default to "I" unless the repository or my answers confirm someone else is
  genuinely involved, in which case use "we" for shared work without
  repeatedly foregrounding team size.
- No invented or approximated metrics. This entry has no evaluation section.
  If there's nothing measurable yet, there's nothing to report, that's fine.
- Treat the current state honestly. If the core/feature architecture is more
  intent than implementation right now, the copy should reflect that, not
  describe a system that doesn't exist yet.
- Do not change the project implementation unless I explicitly ask.
- Do not expose secrets, credentials, private data, or internal URLs.

## Step 1: Inspect the project

Look at:

- README and other documentation
- Git history (does it show evidence of the v1 rethink: an old branch, a
  reset, a changelog entry, a rewritten structure? Don't assume, check)
- Source structure: is there an actual core/feature boundary in the code, or
  is that still a plan?
- Package manifests and stack
- Any existing screenshots, diagrams, CLI output, or mockups
- Current working state: what actually runs today, concretely

Before asking me anything, report what you were able to verify and what
remains uncertain.

## Step 2: Ask focused questions

Ask one compact batch, no more than five questions. Only ask what you
couldn't determine from the repository. Prioritize:

1. What concretely works today, stated plainly (not the aspiration)
2. Whether this is solo or anyone else is involved
3. One concrete example of a "feature" so far, even a small one, to make the
   core/feature idea tangible instead of abstract
4. What images exist or could reasonably be captured (a screenshot, a
   diagram, a terminal output), and whether any need to be described
   honestly as a mockup or concept rather than a running capture
5. What to call it publicly (the `slug` and `title`), if that's undecided

## Step 3: Create the handoff

Create a file named `CURRENTLY_WORKING_ON_HANDOFF.md` in the root of this
project, using the template below exactly. `imageGroups` is optional entirely
if nothing real exists yet to show; don't invent placeholder images.

---

```ts
{
  slug: "short-lowercase-url-slug",
  title: "Project name",
  // One plain sentence. No genre-comparison shorthand ("it's like X but for Y"),
  // no buzzwords. State what it actually is.
  hook: "One sentence describing what this is.",
  // Plain and honest, e.g. "Under development, since <Month Year>" or
  // "Early planning, started <Month Year>". No "active"/"actively" framing
  // unless that's genuinely true.
  status: "Under development, since Month Year",
  technologies: ["Only", "technologies", "that", "materially", "matter"],
  // 2 short flowing paragraphs. Paragraph 1: the idea, why it started, the
  // honest v1-to-v2 story. Paragraph 2: current state, what's real vs planned,
  // what's next. No bullet lists, no "highlights" framing.
  intro: [
    "First paragraph.",
    "Second paragraph.",
  ],
  // Only include heroImage/bannerImage/imageGroups if real material exists.
  heroImage: { src: "/currently-working-on/SLUG/hero.jpg", alt: "Specific, accessible description." },
  bannerImage: { src: "/currently-working-on/SLUG/banner.jpg", alt: "Specific, accessible description." },
  imageGroups: [
    {
      heading: "Short label for this group, e.g. 'Core dashboard'",
      layout: "feature", // one large image
      images: [
        { src: "/currently-working-on/SLUG/example.jpg", alt: "Specific, accessible description.", caption: "Honest caption: say plainly if this is a mockup, concept sketch, or a real running capture." },
      ],
    },
  ],
}
```

---

## Step 4: Final quality check

Before finishing, confirm:

- The v1 rethink is stated plainly, not hidden or spun.
- The copy doesn't claim a finished core/feature architecture if the code
  doesn't back that up yet.
- No bullet-point highlight list snuck into `intro`; it reads as two
  paragraphs of plain prose.
- No fabricated metrics or results.
- Every image caption is honest about what it actually shows.
- Nothing here duplicates or overlaps with a claim better suited to a real
  case study later (`content/projects.ts`), if this project eventually
  graduates out of "Currently working on".

Finish by telling me where `CURRENTLY_WORKING_ON_HANDOFF.md` was created and
what, if anything, I still need to decide.
