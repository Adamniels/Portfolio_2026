export type Project = {
  slug: string;
  number: string;
  scope: "featured" | "compact";
  title: string;
  kicker: string;
  summary: string;
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

// Replace with the approved public client name when attribution is cleared.
const outreachClient = "an IT consultancy";

export const projects: Project[] = [
  {
    slug: "contextual-outreach",
    number: "01",
    scope: "featured",
    title: "Contextual Outreach",
    kicker: "Research-led outreach",
    summary: `A prototype for ${outreachClient} that researches prospects, identifies relevant contacts, and drafts outreach grounded in company context and previous client work.`,
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
      "Useful personalization required more context than a generic sales sequence could provide.",
    challenge: `Developed independently through exploratory discussions with ${outreachClient}, the prototype examined how prospect research could become outreach that still felt specific to the sender. It needed to find and enrich relevant contacts, understand the target company, connect its situation to previous client work, and preserve user control over tone. The harder boundary was delivery: LinkedIn restricts unauthorized automation, so generating useful content and safely executing a multi-channel sequence were fundamentally different problems.`,
    approach: [
      "Separated prospect intake, enrichment, contact selection, drafting, and workflow scheduling into explicit use cases",
      "Collected first-party website evidence and external signals before synthesizing reusable company intelligence",
      "Kept CRM, research, AI, email, and LinkedIn integrations behind replaceable application boundaries",
    ],
    architecture: {
      title:
        "Explicit boundaries kept research, business rules, generation, and delivery independently replaceable.",
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
      imageTheme: "dark",
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
          "The enrichment pipeline turns a company name and domain into reusable sales intelligence without treating one source or model response as ground truth.",
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
            theme: "dark",
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
          "Drafting is treated as context construction rather than a single prompt, preserving user control while grounding suggestions in research and previous work.",
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
            theme: "dark",
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
          "Reusable sequences become prospect-specific workflow instances whose content dependencies and schedule are validated before activation.",
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
            theme: "dark",
          },
          {
            src: "/projects/contextual-outreach/workflow-02-boundary.svg",
            alt: "Scheduled email and LinkedIn steps reaching explicit mock adapters, with production providers shown as future replacements outside the implemented boundary.",
            caption:
              "Boundary — orchestration is implemented while external delivery remains replaceable.",
            label: "Boundary",
            theme: "dark",
          },
        ],
      },
      {
        title: "Clean Architecture around volatile integrations",
        visualTitle: "Architecture / Dependencies point inward",
        summary:
          "The backend was refactored around domain, application, infrastructure, and API boundaries so external providers do not own the business workflow.",
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
            theme: "dark",
          },
        ],
      },
    ],
    evaluation: {
      title:
        "The prototype was evaluated through tests and walkthroughs, not production use.",
      summary:
        "The repository contains unit tests for selected domain rules and application use cases, while recurring walkthroughs grounded the workflow in a real consultancy context. These establish implemented behavior and relevance to the explored problem, but not adoption, conversion, deliverability, or business impact.",
      details: [
        "The repository contains unit tests for selected domain rules and application use cases, while recurring walkthroughs grounded the workflow in a real consultancy context. These establish implemented behavior and relevance to the explored problem, but not adoption, conversion, deliverability, or business impact.",
        "The system was never deployed. During development, the consultancy adopted an established commercial platform that already addressed its LinkedIn outreach requirement, so the independent prototype remained exploratory rather than moving toward production.",
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
      "A working prototype that made both the opportunity and the hardest integration constraint concrete.",
    outcomeSummary:
      "The project connected prospect intake, company and contact research, previous client work, editable AI drafting, and workflow orchestration. It also showed why build-versus-buy decisions depend on difficult external integrations—not only the quality of the application itself.",
    outcomeHighlights: [
      {
        label: "Delivered",
        text: "An end-to-end prototype covering prospect intake, research, contact enrichment, personalized drafting, conversational revision, configuration, and workflow orchestration.",
      },
      {
        label: "Validated",
        text: "Exploratory discussions grounded the workflow in a real consultancy context, while source-level tests and interface walkthroughs established implemented behavior.",
      },
      {
        label: "Next",
        text: "Production delivery would require approved channel integrations, stronger source traceability, broader integration testing, and evaluation with real users.",
      },
    ],
  },
  {
    slug: "beacon",
    number: "02",
    scope: "featured",
    title: "Beacon",
    kicker: "Event system observability",
    summary:
      "A developer tool for tracing failures across asynchronous services without searching through five different dashboards.",
    status: "Prototype",
    year: "2026",
    disciplines: [
      "Distributed systems",
      "Developer tooling",
      "Interface design",
    ],
    metric: "4.6×",
    metricLabel: "faster root-cause discovery in testing",
    challengeTitle: "The error was visible. The cause wasn’t.",
    challenge:
      "In event-driven systems, one user action can cross queues, workers, and external services. Logs show fragments of the journey, but rarely the full story. Beacon connects those fragments into a single trace built around the event itself.",
    approach: [
      "Design a compact event envelope shared across services",
      "Stream and index traces without blocking application work",
      "Show causality and payload changes in one visual timeline",
    ],
    architecture: {
      title: "Events become traces without blocking application work.",
      summary:
        "Services emit a compact shared event envelope to an asynchronous collector. The collector links related events, stores the resulting trace, and serves a causality-first view to the debugging interface.",
      flow: [
        "Application event",
        "Shared envelope",
        "Async collector",
        "Trace store",
        "Debug interface",
      ],
    },
    technicalHighlights: [
      {
        title: "Causality over log order",
        summary:
          "Beacon reconstructs the event journey using identifiers and parent relationships instead of relying on timestamp order.",
        details: [
          "Each event carries trace, parent, service, and attempt identifiers",
          "Retries remain attached to the operation that caused them",
          "Skipped downstream work is visible instead of disappearing from the timeline",
        ],
      },
      {
        title: "Low-overhead collection",
        summary:
          "Application services emit small envelopes and leave indexing and trace reconstruction to the collector.",
        details: [
          "Collection does not block the request or worker path",
          "Payload changes can be sampled independently from core trace metadata",
          "Storage and interface concerns stay outside application services",
        ],
      },
    ],
    evaluation: {
      title: "Tested with incidents, not ideal paths.",
      summary:
        "A simulated incident set compared the event-centered workflow with a conventional search across separate service logs.",
      evidence: [
        { value: "4.6×", label: "faster root-cause discovery" },
        { value: "11m", label: "previous median investigation" },
        { value: "2.4m", label: "Beacon median investigation" },
      ],
    },
    outcome:
      "In a simulated incident set, the event-centered workflow cut median root-cause discovery from eleven minutes to under two and a half.",
  },
  {
    slug: "vend-and-go",
    number: "03",
    scope: "compact",
    title: "Vend & Go",
    kicker: "Bachelor thesis",
    summary:
      "A mobile payment and loyalty prototype for vending customers and machine refillers.",
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
      "An app had to offer more value than an effortless card tap.",
    challenge:
      "Existing vending machines offered a familiar card-terminal experience that was already quick, but added transaction costs for operators. The thesis examined whether mobile payment and visible loyalty rewards could make switching worthwhile without adding too much registration, navigation, or reward complexity.",
    approach: [
      "Built a synchronized mobile client, admin interface, API, and database so the concept could be evaluated as a working flow",
      "Kept pricing, campaign selection, loyalty rules, and checkout validation server-side with shared contracts across clients",
      "Combined a 29-person survey and moderated usability sessions with analysis of 7.4 million historical transactions",
    ],
    architecture: {
      title:
        "A modular architecture connected the mobile experience, business logic, and vending infrastructure.",
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
          "Bundle offers and product discounts can compete for the same items, so choosing each campaign independently can produce the wrong total.",
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
          "The application flow stays authoritative while external payment and machine dispensing remain replaceable adapters.",
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
      title: "A functional prototype made the concept testable.",
      summary:
        "Rather than evaluating a static design, we tested a working application connected to its backend, loyalty logic, campaign system, and persistent data. This allowed participants to complete realistic flows and receive actual pricing, discounts, and loyalty feedback.",
      details: [
        "Rather than evaluating a static design, we tested a working application connected to its backend, loyalty logic, campaign system, and persistent data. This allowed participants to complete realistic flows and receive actual pricing, discounts, and loyalty feedback.",
        "The core purchase journey worked well, while registration and some loyalty concepts needed clearer communication. Survey responses and historical sales analysis provided additional context around adoption barriers, reward preferences, and differences between vending environments.",
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
    outcomeTitle: "An end-to-end prototype, built to be tested and extended.",
    outcomeSummary:
      "Vend & Go connected the customer and refiller experiences to shared backend logic for campaigns, loyalty, checkout, inventory, and persistent data. The historical sales analysis also created a foundation for future tools that could recommend relevant discounts and campaign timing to refillers.",
    outcomeHighlights: [
      {
        label: "Delivered",
        text: "A functional customer app, refiller interface, backend, campaign and loyalty system, checkout flow, and persistent data layer.",
      },
      {
        label: "Validated",
        text: "Machine selection, product browsing, and checkout were generally understandable when tested through the working application.",
      },
      {
        label: "Next",
        text: "Connect production payment and dispensing providers, simplify registration, and communicate loyalty rewards more clearly.",
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
