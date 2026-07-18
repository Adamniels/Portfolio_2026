export type Project = {
  slug: string;
  number: string;
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
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "pulse",
    number: "01",
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
    outcome:
      "The prototype reduced simulated forecast error by 18% and turned model confidence into an interface element that operators could actually use.",
  },
  {
    slug: "beacon",
    number: "02",
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
    outcome:
      "In a simulated incident set, the event-centered workflow cut median root-cause discovery from eleven minutes to under two and a half.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
