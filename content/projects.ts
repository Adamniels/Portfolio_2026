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

export const projects: Project[] = [
  {
    slug: "pulse",
    number: "01",
    scope: "featured",
    title: "Pulse",
    kicker: "Forecasting workspace",
    summary:
      "A forecasting workspace that helps small energy teams act before demand spikes—not after.",
    status: "Prototype",
    year: "2026",
    disciplines: [
      "Machine learning",
      "Product engineering",
      "Data visualization",
    ],
    metric: "18%",
    metricLabel: "lower forecast error in simulation",
    challengeTitle: "Forecasts existed. Confidence didn’t.",
    challenge:
      "Small energy operators often work across spreadsheets, weather feeds, and disconnected dashboards. The data exists, but the decision is still difficult. Pulse explores a calmer workflow: one forecast, its uncertainty made visible, and a clear next action.",
    approach: [
      "Frame the operational decision before selecting the model",
      "Build a reproducible forecasting and evaluation pipeline",
      "Expose uncertainty directly in the product interface",
    ],
    architecture: {
      title: "One pipeline from raw signals to an actionable forecast.",
      summary:
        "Historical demand and weather signals move through a reproducible feature pipeline into a versioned forecasting model. A small prediction API exposes the forecast and its uncertainty to the operator interface.",
      flow: [
        "Demand history",
        "Feature pipeline",
        "Forecast model",
        "Prediction API",
        "Operator UI",
      ],
    },
    technicalHighlights: [
      {
        title: "Reproducible forecasting",
        summary:
          "Training and backtesting use the same feature definitions, time boundaries, and evaluation windows.",
        details: [
          "Time-aware splits avoid leaking future observations into training",
          "Model versions retain their features, parameters, and evaluation results",
          "The pipeline can be rerun against a new location without changing the product layer",
        ],
      },
      {
        title: "Uncertainty as product data",
        summary:
          "The interface presents confidence and contributing signals alongside the point forecast.",
        details: [
          "Prediction intervals are returned with every forecast",
          "Operators can distinguish a strong warning from a weak model signal",
          "The UI translates model output into an operational next step",
        ],
      },
    ],
    evaluation: {
      title: "Measured against the decision, not a leaderboard.",
      summary:
        "The prototype was evaluated through time-based backtesting and a simulated operator workflow rather than model accuracy alone.",
      evidence: [
        { value: "48h", label: "forecast horizon" },
        { value: "18%", label: "lower simulated forecast error" },
        { value: "3", label: "operational signals exposed" },
      ],
    },
    outcome:
      "The prototype reduced simulated forecast error by 18% and turned model confidence into an interface element that operators could actually use.",
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
