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
  }>;
  evaluation: {
    title: string;
    summary: string;
    evidence: Array<{
      value: string;
      label: string;
    }>;
  };
  outcome: string;
  outcomeDetails?: string[];
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
    disciplines: ["Machine learning", "Product engineering", "Data visualization"],
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
      flow: ["Demand history", "Feature pipeline", "Forecast model", "Prediction API", "Operator UI"],
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
    disciplines: ["Distributed systems", "Developer tooling", "Interface design"],
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
      flow: ["Application event", "Shared envelope", "Async collector", "Trace store", "Debug interface"],
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
    disciplines: ["Software engineering", "UX research", "Data science"],
    metric: "7.4M",
    metricLabel: "historical vending sale rows analyzed",
    challengeTitle: "An app had to offer more value than an effortless card tap.",
    challenge:
      "Existing vending machines offered a familiar card-terminal experience that was already quick, but added transaction costs for operators. The thesis examined whether mobile payment and visible loyalty rewards could make switching worthwhile without adding too much registration, navigation, or reward complexity.",
    approach: [
      "Built a synchronized mobile client, admin interface, API, and database so the concept could be evaluated as a working flow",
      "Kept pricing, campaign selection, loyalty rules, and checkout validation server-side with shared contracts across clients",
      "Combined a 29-person survey and moderated usability sessions with analysis of 7.4 million historical transactions",
    ],
    architecture: {
      title: "A modular architecture connected the mobile experience, business logic, and vending infrastructure.",
      summary:
        "Customer and refiller interfaces share contracts with a backend that centralizes machines, inventory, products, campaigns, loyalty, and purchasing. Persistent storage and replaceable payment and dispensing adapters sit at the infrastructure boundary, allowing the clients and external integrations to evolve without moving core business rules out of the application.",
      flow: ["Customer & refiller clients", "Shared contracts", "Application API", "Core business modules", "Data & integrations"],
    },
    technicalHighlights: [
      {
        title: "Campaign optimization algorithm",
        summary:
          "Bundle offers and product discounts can compete for the same items, so choosing each campaign independently can produce the wrong total.",
        details: [
          "Cart units are represented as grouped product quantities rather than expanded individual objects",
          "A memoized recursive search evaluates valid, non-overlapping campaign assignments",
          "The grouped state avoids the previous unit-level 2ⁿ growth while preserving the best valid discount",
        ],
      },
      {
        title: "Checkout with mocked edges",
        summary:
          "The application flow stays authoritative while external payment and machine dispensing remain replaceable adapters.",
        details: [
          "The server recomputes prices and chooses the best campaign assignment before payment",
          "The use case reserves payment, invokes dispensing, updates inventory and payment state, and returns item-level results",
          "Mock services implement the same interfaces intended for future providers, keeping integration changes at the edges",
        ],
      },
    ],
    evaluation: {
      title: "A working system made the evaluation more honest.",
      summary:
        "The concept was evaluated through a pre-launch survey, moderated use of the functional prototype, and analysis of historical transaction patterns.",
      evidence: [
        { value: "29", label: "survey participants" },
        { value: "2", label: "moderated usability sessions" },
        { value: "7.4M", label: "historical sale rows analyzed" },
      ],
    },
    outcome:
      "We delivered and evaluated a functional prototype spanning the customer app, admin interface, backend, and persistent data.",
    outcomeDetails: [
      "We delivered and evaluated a functional prototype spanning the customer app, admin interface, backend, and persistent data. In usability testing, the core flows for selecting a machine, browsing products, and completing a purchase were generally easy to understand.",
      "The evaluation also showed where the concept needed more work. Registration created friction, and participants needed clearer explanations of points, bundles, claims, and tier progression. The transaction analysis revealed useful location-level patterns, but the available contextual data was not strong enough for reliable individual category prediction.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
