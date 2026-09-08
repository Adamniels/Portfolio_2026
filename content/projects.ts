export type Project = {
  slug: string;
  number: string;
  scope: "featured" | "compact";
  title: string;
  kicker: string;
  summary: string;
  indexSummary: string;
  technologies: string[];
  status: "Shipped" | "Prototype";
  year: string;
  disciplines: string[];
  metric: string;
  metricLabel: string;
  challengeTitle: string;
  challenge: string;
  approach: string[];
  architecture: {
    title: string;
    summary: string;
    flow: string[];
    image?: string;
    imageTheme?: "light" | "dark";
    imageAlt?: string;
    imageCaption?: string;
  };
  technicalHighlights: Array<{
    title: string;
    summary: string;
    details: string[];
    visualTitle?: string;
    visuals?: Array<{
      src: string;
      alt: string;
      caption: string;
      label: string;
      theme?: "light" | "dark";
    }>;
  }>;
  evaluation: {
    title: string;
    summary: string;
    details?: string[];
    textOnly?: boolean;
    evidence: Array<{
      value: string;
      label: string;
    }>;
  };
  outcome: string;
  outcomeDetails?: string[];
  outcomeTitle?: string;
  outcomeSummary?: string;
  outcomeHighlights?: Array<{
    label: string;
    text: string;
  }>;
};

// The client is referred to generically by choice, not pending attribution.
const outreachClient = "an IT consultancy";

export const projects: Project[] = [
  {
    slug: "contextual-outreach",
    number: "01",
    scope: "featured",
    title: "Contextual Outreach",
    indexSummary: "A pipeline that researches a company and turns what it finds into drafts worth actually sending. Built on my own, with a workflow engine underneath and every integration swappable.",
    technologies: ["C#", "ASP.NET Core", "PostgreSQL", "Applied AI"],
    kicker: "Research-led outreach",
    summary: `A prototype built around ${outreachClient}'s problem: research a prospect, work out who's worth talking to, and draft outreach that's grounded in what the company actually does and the work the consultancy has already done.`,
    status: "Prototype",
    year: "2025–26",
    disciplines: [
      "Software engineering",
      "Applied AI",
      "Product engineering",
      "Workflow automation",
    ],
    metric: "End-to-end",
    metricLabel: "research-to-outreach prototype built independently",
    challengeTitle:
      "Outreach only sounds personal if the system actually knows something.",
    challenge: `Developed independently through exploratory discussions with ${outreachClient}, the prototype examined how prospect research could become outreach that still felt specific to the sender. It needed to find and enrich relevant contacts, understand the target company, connect its situation to previous client work, and preserve user control over tone. The harder boundary was delivery: LinkedIn restricts unauthorized automation, so generating useful content and safely executing a multi-channel sequence were fundamentally different problems.`,
    approach: [
      "Separated prospect intake, enrichment, contact selection, drafting, and workflow scheduling into explicit use cases",
      "Collected first-party website evidence and external signals before synthesizing reusable company intelligence",
      "Kept CRM, research, AI, email, and LinkedIn integrations behind replaceable application boundaries",
    ],
    architecture: {
      title:
        "Clear boundaries meant research, rules, generation, and delivery could each be swapped without disturbing the others.",
      summary:
        "A Vue interface calls thin ASP.NET Core endpoints, which delegate to single-purpose application use cases and domain entities. Repository and service interfaces isolate PostgreSQL, CRM intake, web research, AI providers, and channel delivery. This allowed the complete research-to-workflow path to be built while keeping uncertain email and LinkedIn execution at the infrastructure edge.",
      flow: [
        "Prospect intake",
        "Authenticated interface",
        "Application use cases",
        "Research and generation",
        "Persistence and adapters",
      ],
      image: "/projects/contextual-outreach/system-overview.svg",
      imageTheme: "light",
      imageAlt:
        "System architecture showing prospect intake and the Vue interface flowing through an ASP.NET Core API into application use cases and domain rules, with replaceable persistence, research, AI, and delivery adapters.",
      imageCaption:
        "Whole-system overview — stable application rules sit inside volatile research, AI, CRM, and delivery integrations.",
    },
    technicalHighlights: [
      {
        title: "Multi-source company and contact enrichment",
        visualTitle: "Enrichment / Two evidence tracks",
        summary:
          "Give it a company name and a domain and it builds a picture of that company. The rule underneath is that no single source and no single model answer gets to be the truth on its own.",
        details: [
          "First-party website analysis and external signal discovery run concurrently before their evidence is merged",
          "Synthesis prioritizes company-owned material for stable facts and external sources for recent hooks",
          "Freshness, source quality, deduplication, and traceability remain production extension points",
        ],
        visuals: [
          {
            src: "/projects/contextual-outreach/enrichment-01-collect.svg",
            alt: "Two parallel research tracks collecting first-party website evidence and external market signals for a fictional prospect.",
            caption:
              "Collect — parallel evidence tracks reduce dependence on a single source.",
            label: "Collect",
            theme: "light",
          },
          {
            src: "/projects/contextual-outreach/enrichment-02-synthesize.svg",
            alt: "Collected evidence being ranked and synthesized into a structured company profile, outreach hooks, and contact candidates.",
            caption:
              "Synthesize — ranked evidence becomes reusable company and contact context.",
            label: "Synthesize",
            theme: "light",
          },
        ],
      },
      {
        title: "Context-aware outreach generation",
        visualTitle: "Generation / Context before content",
        summary:
          "Writing a draft isn't one prompt. Most of the work is deciding what the model should know before it writes anything, and the sender still owns how it sounds.",
        details: [
          "The context builder combines prospect intelligence, the active contact, sender identity, company positioning, previous cases, and a channel prompt",
          "Separate strategies support collected-data and web-search paths for email and LinkedIn content",
          "Drafts remain editable and support conversational revision, while factual and stylistic review stays human-owned",
        ],
        visuals: [
          {
            src: "/projects/contextual-outreach/generation-01-context.svg",
            alt: "Seven explicit sources feeding an outreach context builder before any message is generated.",
            caption:
              "Context — research, identity, positioning, cases, and prompt settings become explicit inputs.",
            label: "Context",
            theme: "light",
          },
          {
            src: "/projects/contextual-outreach/generation-02-refine.svg",
            alt: "A fictional outreach draft beside a conversation panel used to request and apply a focused revision.",
            caption:
              "Refine — the generated draft stays editable and can be revised through conversation.",
            label: "Refine",
            theme: "light",
          },
        ],
      },
      {
        title: "Stateful multi-channel workflow engine",
        visualTitle: "Workflow / Validate before execution",
        summary:
          "A sequence you wrote once becomes a real schedule for one specific prospect. Before it's allowed to start, the system checks that everything it's going to need actually exists.",
        details: [
          "Ordered steps support email, LinkedIn messages, connection requests, waits, and lightweight interactions",
          "Activation validates enrichment and generation requirements before converting local offsets into scheduled timestamps",
          "A background worker and executor are implemented, but channel actions remain mock adapters rather than production delivery claims",
        ],
        visuals: [
          {
            src: "/projects/contextual-outreach/workflow-01-lifecycle.svg",
            alt: "Workflow lifecycle moving from editable draft through dependency validation and timezone scheduling into active, completed, failed, or cancelled states.",
            caption:
              "Lifecycle — incomplete sequences are stopped before they can be activated.",
            label: "Lifecycle",
            theme: "light",
          },
          {
            src: "/projects/contextual-outreach/workflow-02-boundary.svg",
            alt: "Scheduled email and LinkedIn steps reaching explicit mock adapters, with production providers shown as future replacements outside the implemented boundary.",
            caption:
              "Boundary — orchestration is implemented while external delivery remains replaceable.",
            label: "Boundary",
            theme: "light",
          },
        ],
      },
      {
        title: "Clean Architecture around volatile integrations",
        visualTitle: "Architecture / Dependencies point inward",
        summary:
          "I rebuilt the backend around clear layers so no external provider ends up owning the logic. The workflow is mine. The integrations just plug into the edge of it.",
        details: [
          "Domain entities encapsulate prospect ownership, active-contact selection, workflow transitions, ordering, and activation rules",
          "Single-action use cases expose one entry point while thin endpoints translate HTTP concerns",
          "The additional types and wiring improve replaceability, but consistent authorization and integration coverage still require production review",
        ],
        visuals: [
          {
            src: "/projects/contextual-outreach/architecture-dependencies.svg",
            alt: "Layered backend architecture with domain rules at the center, application contracts around them, infrastructure implementations outside, and API composition at the edge.",
            caption:
              "Dependencies — external implementations point toward application contracts and domain rules.",
            label: "Layers",
            theme: "light",
          },
        ],
      },
    ],
    evaluation: {
      title:
        "Tested and walked through. Never actually used in production.",
      summary:
        "There are unit tests over the domain rules and the main use cases, and I walked the workflow through with the consultancy repeatedly to check it matched how they actually sell. That tells you the thing behaves as built and that the problem was real. It tells you nothing about adoption, reply rates, deliverability, or whether it would have made anyone money.",
      details: [
        "There are unit tests over the domain rules and the main use cases, and I walked the workflow through with the consultancy repeatedly to check it matched how they actually sell. That tells you the thing behaves as built and that the problem was real. It tells you nothing about adoption, reply rates, deliverability, or whether it would have made anyone money.",
        "It was never deployed. Partway through, the consultancy bought an existing commercial tool that already handled the LinkedIn side, so my version stayed what it started as: an exploration.",
      ],
      textOnly: true,
      evidence: [
        { value: "39", label: "unit-test cases present in source" },
        { value: "6", label: "documented interface states" },
        { value: "0", label: "production deployments" },
      ],
    },
    outcome:
      "The project delivered a working research-to-outreach prototype and made its hardest external integration constraint concrete.",
    outcomeTitle:
      "A working prototype, and a clear answer about where the real wall is.",
    outcomeSummary:
      "It connects the whole path: pull in a prospect, research the company and the people in it, bring in previous client work, generate a draft you can edit and argue with, then schedule the sequence. It also made something clear I hadn't expected going in. Whether you build or buy a tool like this comes down to which integrations you're allowed to make, not to how good your application is.",
    outcomeHighlights: [
      {
        label: "Delivered",
        text: "The whole path end to end: prospect intake, research, contact enrichment, drafting, revising by conversation, settings, and workflow scheduling.",
      },
      {
        label: "Validated",
        text: "Regular conversations with the consultancy kept it tied to how they actually work, and tests plus interface walkthroughs confirmed the parts that exist behave the way they should.",
      },
      {
        label: "Next",
        text: "Sending anything for real would need approved channel integrations, better traceability back to sources, wider integration tests, and actual users.",
      },
    ],
  },
  {
    slug: "vend-and-go",
    number: "02",
    scope: "featured",
    title: "Vend & Go",
    indexSummary: "Backend logic for vending payments, loyalty, and campaigns. Working out the best combination of discounts, and dealing with what happens when the machine only drops half your order.",
    technologies: ["TypeScript", "Prisma", "Checkout orchestration", "Data analysis"],
    kicker: "Bachelor thesis",
    summary:
      "My bachelor thesis: a mobile payment and loyalty app for the people buying from vending machines, and for the people refilling them.",
    status: "Prototype",
    year: "2026",
    disciplines: [
      "Software engineering",
      "Backend engineering",
      "Software architecture",
      "UX research",
      "Data science",
    ],
    metric: "7.4M",
    metricLabel: "historical vending sale rows analyzed",
    challengeTitle:
      "Tapping a card already works. An app has to beat that.",
    challenge:
      "Vending machines already have card terminals, and tapping one takes about two seconds. That's a hard baseline to beat. What it costs the operator in transaction fees is invisible to the customer, so there's no reason for them to care. The thesis asked whether mobile payment plus loyalty rewards you can actually see would be worth switching for, without burying people in registration steps and reward rules on the way there.",
    approach: [
      "Built a synchronized mobile client, admin interface, API, and database so the concept could be evaluated as a working flow",
      "Kept pricing, campaign selection, loyalty rules, and checkout validation server-side with shared contracts across clients",
      "Combined a 29-person survey and moderated usability sessions with analysis of 7.4 million historical transactions",
    ],
    architecture: {
      title:
        "One backend behind both apps, with the machines and the payment provider kept at arm's length.",
      summary:
        "Customer and refiller interfaces share contracts with a backend that centralizes machines, inventory, products, campaigns, loyalty, and purchasing. Persistent storage and replaceable payment and dispensing adapters sit at the infrastructure boundary, allowing the clients and external integrations to evolve without moving core business rules out of the application.",
      flow: [
        "Customer & refiller clients",
        "Shared contracts",
        "Application API",
        "Core business modules",
        "Data & integrations",
      ],
      image: "/projects/vend-and-go/portfolio-system-overview.svg",
    },
    technicalHighlights: [
      {
        title: "Campaign optimization algorithm",
        visualTitle: "Campaign optimizer / Three-part walkthrough",
        summary:
          "Two campaigns can want the same can of soda. Take the biggest looking discount first and you can easily end up charging more than you should have.",
        details: [
          "Cart units are represented as grouped product quantities rather than expanded individual objects",
          "A memoized recursive search evaluates valid, non-overlapping campaign assignments",
          "The grouped state avoids the previous unit-level 2ⁿ growth while preserving the best valid discount",
        ],
        visuals: [
          {
            src: "/projects/vend-and-go/campaign-optimizer-01-setup.svg",
            alt: "A cart with two Sodas, one Juice, and two Waters represented as grouped quantities, alongside four overlapping campaigns competing for the same units.",
            caption:
              "Setup — grouped quantities expose competing campaign claims.",
            label: "Setup",
          },
          {
            src: "/projects/vend-and-go/campaign-optimizer-02-search.svg",
            alt: "A recursive search over grouped cart states where two optimal paths converge on the memoized state B:1, while the greedy largest-discount-first branch is rejected.",
            caption:
              "Search — recursive branches converge on a memoized state.",
            label: "Search",
          },
          {
            src: "/projects/vend-and-go/campaign-optimizer-03-result.svg",
            alt: "The winning non-overlapping campaign assignment applies Soda Twins, Water Pair, and Juice Deal for a total discount of 42 kronor and a final total of 68 kronor.",
            caption:
              "Result — the best non-overlapping assignment saves 42 kr.",
            label: "Result",
          },
        ],
      },
      {
        title: "Checkout with mocked edges",
        visualTitle: "Checkout / Mocked-edges walkthrough",
        summary:
          "The server decides what everything costs and what happens next. Payment and the machine itself sit behind interfaces, so either can be swapped for a real provider later.",
        details: [
          "The server recomputes prices and chooses the best campaign assignment before payment",
          "The use case reserves payment, invokes dispensing, updates inventory and payment state, and returns item-level results",
          "Mock services implement the same interfaces intended for future providers, keeping integration changes at the edges",
        ],
        visuals: [
          {
            src: "/projects/vend-and-go/checkout-mocked-edges-01-authority.svg",
            alt: "A left-to-right checkout guard sequence showing the server loading the cart, checking machine and stock, recomputing prices, matching the client snapshot, and persisting an order in a safe failed state before contacting payment.",
            caption:
              "Authority — the server verifies the cart, stock, and pricing before any money moves.",
            label: "Authority",
          },
          {
            src: "/projects/vend-and-go/checkout-mocked-edges-02-orchestration.svg",
            alt: "A checkout execution walkthrough showing reserve, per-unit dispensing, settlement, inventory updates, persistence, and finalization, with a synthetic partial-dispense example that captures 36 kronor and refunds 12 kronor.",
            caption:
              "Orchestration — one jammed unit becomes an item-level partial result and proportional refund.",
            label: "Orchestration",
          },
          {
            src: "/projects/vend-and-go/checkout-mocked-edges-03-replaceability.svg",
            alt: "A ports-and-adapters diagram showing CheckoutCartUseCase depending on payment and machine-dispensing interfaces, with current mock adapters, a real points processor, Prisma repositories, and possible future provider replacements.",
            caption:
              "Replaceability — stable interfaces keep payment and machine integrations at the edges.",
            label: "Replaceability",
          },
        ],
      },
    ],
    evaluation: {
      title: "We tested a working app, not a mockup.",
      summary:
        "Instead of putting a static design in front of people, we tested a real app wired to its backend, loyalty logic, campaign system, and database. Participants could complete an actual purchase and watch real prices, real discounts, and real points land.",
      details: [
        "Instead of putting a static design in front of people, we tested a real app wired to its backend, loyalty logic, campaign system, and database. Participants could complete an actual purchase and watch real prices, real discounts, and real points land.",
        "The buying part worked. Registration and some of the loyalty concepts didn't land as clearly as we'd hoped. The survey and the sales data filled in the rest: what puts people off signing up, which rewards they actually want, and how differently machines behave depending on where they're standing.",
      ],
      textOnly: true,
      evidence: [
        { value: "29", label: "survey participants" },
        { value: "2", label: "moderated usability sessions" },
        { value: "7.4M", label: "historical sale rows analyzed" },
      ],
    },
    outcome:
      "We delivered and evaluated a functional prototype spanning the customer app, admin interface, backend, and persistent data.",
    outcomeTitle: "A prototype complete enough to test, and built so it could keep going.",
    outcomeSummary:
      "Vend & Go ties both apps to one backend handling campaigns, loyalty, checkout, inventory, and storage. The sales analysis turned into something separate and more interesting on the side: a starting point for tools that could tell refillers which discounts to run and when to run them.",
    outcomeHighlights: [
      {
        label: "Delivered",
        text: "A working customer app, a refiller interface, the backend behind both, the campaign and loyalty system, checkout, and the data layer underneath.",
      },
      {
        label: "Validated",
        text: "Picking a machine, browsing products, and checking out mostly made sense to people once they had the real app in their hands.",
      },
      {
        label: "Next",
        text: "Wire up real payment and dispensing providers, cut registration down, and make the loyalty rewards easier to understand.",
      },
    ],
  },
  {
    slug: "project-wiki",
    number: "03",
    scope: "featured",
    title: "Project Wiki",
    indexSummary: "Turns a codebase and its docs into a map of concepts rather than files. It keeps itself current as the code moves, and serves people and coding agents from the same place.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "MCP"],
    kicker: "Knowledge engine for codebases",
    summary:
      "A knowledge engine for projects spread across several repositories and a Notion workspace. It distils them into a graph of concepts, keeps a link from every concept back to the exact code it came from, and updates itself as the sources change. Coding agents read it over MCP. I read it in a browser or just ask it.",
    status: "Prototype",
    year: "2026",
    disciplines: [
      "Backend & systems engineering",
      "Applied AI",
      "Developer tooling",
    ],
    metric: "68 / 69",
    metricLabel: "requirements verified by a requirement-tagged test",
    challengeTitle:
      "Everyone relearns the same project by reading the same files again. Including the agents.",
    challenge:
      "When a project is spread across several repos and a Notion workspace, the understanding of how it all fits together doesn't live anywhere. A person rebuilds it by reading source. A coding agent rebuilds it from scratch every session, pulling the same files into its context window and paying for the same reading again. Generated API docs just mirror the folder tree and rot along with it, and full text search hands you text rather than understanding. Some things aren't written down in any single file at all, like a wire contract two repositories both quietly depend on. So I wanted a knowledge base organised by concept instead of by file, where every concept points back to the exact symbol it came from, that keeps up as the code moves, and that a person and an agent can both read without going back to the raw material.",
    approach: [
      "Separate raw info from distilled knowledge by modelling the wiki as a graph of typed concept nodes stored in the product, each carrying at least one provenance link to a source coordinate",
      "Make guided init resumable and human-in-the-loop: file-aware batched LLM distillation with a per-batch transaction and failure-aware retry, wrapped in a checkpointed graph that pauses for a person only on a genuine contradiction",
      "Keep the wiki current incrementally by computing what changed from git, re-examining only the concepts whose provenance points at touched files, and never removing knowledge the system cannot prove is gone",
    ],
    architecture: {
      title:
        "A strict hexagonal core with thin entry points, so every surface and the maintenance loop are adapters over one read model instead of three separate implementations.",
      summary:
        "Four rings with dependencies pointing inward only, enforced by two import-linter contracts: an ordinary layer contract, and a forbidden-imports contract that names every framework, database driver, and model SDK the domain and application rings may not touch. Sources enter through pluggable connectors as stable coordinates in Postgres. A retrieval index and a batched distillation engine turn them into a provenance-linked concept graph, while an organisation pass and a review queue add domains, cross-source edges, and human adjudication of anything contested. A Typer CLI, a FastAPI read API, and an MCP server are transport-agnostic drivers over the same application use cases. Maintenance re-runs a narrow slice of that pipeline whenever a source moves.",
      flow: [
        "Git & Notion connectors",
        "Retrieval index",
        "Batched distillation",
        "Organise & review",
        "Serve & maintain",
      ],
      image: "/projects/project-wiki/system-overview.svg",
      imageTheme: "light",
      imageAlt:
        "A four-column flow: git and Notion connectors feeding Postgres coordinates, a retrieval index and batched distillation engine, a small typed concept graph, and three consumers, with an info-versus-knowledge divider through the middle and dashed provenance threads running from the graph back to the source coordinates.",
      imageCaption:
        "Whole-system overview — sources become a graph of named concepts that the browser, chat, and MCP server read instead of the files.",
    },
    technicalHighlights: [
      {
        title: "Batched, resumable, self-correcting distillation pipeline",
        visualTitle: "Distillation pipeline / Three-part walkthrough",
        summary:
          "Init is long, expensive, and likely to break somewhere. One model call over a whole repository hits the output cap, loses everything the moment it fails, and spreads the model's attention too thin to be useful. The pipeline turns it into small pieces of work that survive failing halfway.",
        details: [
          "File-aware packing groups a file's units together up to a token budget and sub-splits a single oversized unit, so the model always distils a symbol alongside its local context",
          "Each batch commits in its own transaction, so partial progress survives a later failure and re-running init skips batches already done; a failed batch is isolated, recorded with its failure kind, and the run finishes the rest",
          "Retry depends on why the batch failed: a truncated reply is re-planned into smaller sub-batches with the budget halved per attempt, a transient error backs off, invalid JSON retries once and then stays visibly failed, capped at three attempts",
          "A batch is identified by its packing ordinal, not by the set of coordinates it covers, because sub-split pieces share one parent coordinate and keying by coordinate re-distilled a whole oversized file once per piece",
        ],
        visuals: [
          {
            src: "/projects/project-wiki/highlight-01-step-01.svg",
            alt: "Three documents drawn as stacks of source units flow into a size budget and out as batches: two documents pack together into ordinal 0, and one oversized unit is sub-split into three pieces at ordinals 1 to 3 that all keep their parent's coordinate.",
            caption:
              "Packing — a file's units travel together up to a token budget, and an oversized unit is sub-split.",
            label: "Packing",
            theme: "light",
          },
          {
            src: "/projects/project-wiki/highlight-01-step-02.svg",
            alt: "Three lanes through the same four steps: batch 0 commits, batch 1 comes back cut off at the model's output cap and is recorded as failed with kind truncated and skipped, batch 2 commits, beside the batch table's three rows and the run's report of two done and one failed with the retry command.",
            caption:
              "Commit loop — each batch is its own transaction, so a failed batch is isolated and the run finishes.",
            label: "Commit loop",
            theme: "light",
          },
          {
            src: "/projects/project-wiki/highlight-01-step-03.svg",
            alt: "A three-way fork on the recorded failure kind: truncated re-plans the batch's units into smaller sub-batches with the budget halved per prior attempt, a transient failure backs off and retries as-is, and invalid JSON is retried once and then left visibly failed, with attempts capped at three.",
            caption:
              "Retry — the recovery path is chosen from the recorded failure kind.",
            label: "Retry policy",
            theme: "light",
          },
        ],
      },
      {
        title: "Provenance and incremental maintenance from git",
        visualTitle: "Maintenance / A merged pull request through the loop",
        summary:
          "Keeping the wiki current without rebuilding it is the harder half of the problem. Maintenance runs off git itself, only looks at what a change actually touched, and can never throw away knowledge it can't prove is gone.",
        details: [
          "What changed is computed from git directly, never from a webhook payload, because a pull-request payload carries no file list and a push payload truncates past 20 commits",
          "Only the touched documents are re-ingested, and only the concepts whose provenance points at those coordinates are re-examined, through the same batch path init uses, so the two cannot drift",
          "Evidence is retired only when its content is provably gone, asked of the coordinate's identity rather than a line range; a concept left with no live evidence is proposed for deprecation, never deleted",
          "A concept that its own changed source now contradicts is corrected, quoting the document's new sentence, rather than retired; a source that merely stops mentioning a concept is never treated as a verdict",
        ],
        visuals: [
          {
            src: "/projects/project-wiki/highlight-02-flow.svg",
            alt: "A four-step chain from a merged pull request through a git diff, re-ingestion of the touched documents, and provenance-based selection of concepts, forking into three outcomes (corrected, proposed for deprecation, or queued as contested) with a worked case where a retention period moved from 30 to 45 calendar days and the concept was corrected rather than retired.",
            caption:
              "Maintenance flow — a git diff selects documents, provenance selects concepts, each is corrected, deprecation-proposed, or queued.",
            label: "Maintenance flow",
            theme: "light",
          },
        ],
      },
      {
        title: "Architecture and verification discipline as a system",
        visualTitle: "Verification / The build gate",
        summary:
          "I made the project's own correctness and honesty into things you can test, after a green build lied to me for months.",
        details: [
          "Strict hexagonal, four rings, enforced by two import-linter contracts, one of them a forbidden-imports list naming every framework, driver, and model SDK the domain and application rings may not import",
          "A test that stubs the seam it is testing proves nothing: browser-driven init passed its gate for months while never working, because the endpoint flushed instead of committing and the fake background task never touched the database; every scheduling site now commits before scheduling and a test drives real scheduled work against Postgres",
          "A requirement counts as verified only through a passing test tagged with its ID: a pytest plugin writes a verification map and a generator rolls it into the status page, which is never hand-edited",
          "Four documentation-honesty gates run inside the single build command: the migration head must match the ORM metadata, .env.example must document every settings field, the generated agent context must match its source, and every internal doc link and repository path must resolve",
        ],
        visuals: [
          {
            src: "/projects/project-wiki/highlight-03-gate.svg",
            alt: "A six-stage pipeline from formatting to the frontend build, with a callout listing the four documentation-honesty guards that run inside the test stage and a second callout describing the browser-driven init that passed its gate for months while never working, fixed by committing before scheduling.",
            caption:
              "make check — six stages, with the four documentation-honesty guards running inside the test stage.",
            label: "make check",
            theme: "light",
          },
        ],
      },
    ],
    evaluation: {
      title:
        "Checked by a requirement-tagged test suite, plus two full runs against real models scored against a key I wrote before starting.",
      summary:
        "The engine and surfaces are covered by a green build gate. The parts a fake cannot judge honestly were driven by hand against the real language and embedding models and scored against a pre-written assessment key.",
      details: [
        "The gate is the single build command: roughly 775 backend tests and 127 frontend tests, plus ruff, strict pyright, and the import-linter dependency rule, all green. 68 of 69 registered requirements are verified by a requirement-tagged test. The 69th, engine-proposed reading paths, is deliberately unbuilt and named as such on the generated status page, so the denominator is every requirement the project knows about.",
        "The proof runs drove guided init and the full maintenance loop end to end against a two-repository fixture pair with real Anthropic and OpenAI models, on 1 and 14 August 2026. Each run was scored against an assessment key written beforehand. In the maintenance run, 8 of 9 checks passed, 1 was unevaluable, and 1 surfaced a real defect: a concept left asserting what its source no longer said, because the reconciliation judge was scoped by source reference rather than by document. That was fixed. Measured cost for both fixtures was about $1.10.",
        "What I haven't tested is how it behaves at the size of a real project: how big the review queue gets, whether coverage skews toward prose, and where the single process maintenance loop gives out. That's next, by actually running it on my own platform and fixing what shows up, rather than something I want to claim now.",
      ],
      textOnly: false,
      evidence: [
        {
          value: "68 / 69",
          label:
            "requirements verified by a requirement-tagged test, on the generated status page",
        },
        {
          value: "8 / 9",
          label:
            "maintenance checks passing in the 14 August 2026 proof run, scored against a key written beforehand",
        },
        {
          value: "~775 + 127",
          label: "backend tests and frontend tests in the green build gate",
        },
      ],
    },
    outcome:
      "The engine and all four v1 surfaces are built on a strict hexagonal core with a self-checking build, and two end-to-end runs against real models, scored against pre-written keys, validated the pipeline and caught a real defect. No real project has been pointed at it yet, and that is the deliberate next step.",
    outcomeTitle:
      "An unfinished knowledge engine that proves its own claims, now going into real use on my own projects.",
    outcomeSummary:
      "The interesting engineering is in place and tested: a resumable, self correcting pipeline over a paid model, incremental maintenance that tracks provenance and refuses to drop anything it can't prove is gone, and a build that fails when its own documentation drifts away from the code. It isn't finished. The next phase is pointing it at my own platform, seeing how what I built holds up against real work, and improving it from that instead of in the abstract.",
    outcomeHighlights: [
      {
        label: "Delivered",
        text: "The full engine (ingest, index, distil, merge, organise, review, light divergence) and all four v1 surfaces (guided init and review queue, visual browser, MCP server, in-product chat with server-side history), plus self-maintenance from merged pull requests.",
      },
      {
        label: "Validated",
        text: "68 of 69 requirements green by requirement-tagged tests, plus two end-to-end proof runs against real Anthropic and OpenAI models scored against assessment keys written before each run; one run caught and led to the fix of a real reconciliation-scope defect.",
      },
      {
        label: "Next",
        text: "Project Wiki is not a finished product. I am putting it to work on my own multi-repo platform, using that to evaluate what exists today and to improve it over time as real use shows what matters (review-queue volume, prose-skewed coverage, single-process maintenance). The one unbuilt requirement, engine-proposed reading paths, comes first.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
