// Smaller projects: utilities, experiments, and embedded builds.
//
// `summary` is the one-line card text on the homepage. `body` is the prose on
// /smaller-projects and currently repeats the summary for each entry — expand
// each one into two or three real paragraphs, and add `status`, `year`,
// `technologies`, and `links` as they become available. Optional fields are
// omitted from the page when absent rather than rendered empty.
export type SmallerProject = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  body: string[];
  status?: "Shipped" | "Prototype" | "In progress";
  year?: string;
  technologies?: string[];
  links?: Array<{ label: string; href: string }>;
};

export const smallerProjects: SmallerProject[] = [
  {
    slug: "habit-tracker",
    category: "Mobile utility",
    title: "Habit tracker",
    summary:
      "An app for the handful of habits I actually wanted to keep, with reminders that turn up when they're useful rather than whenever.",
    body: [
      "An app for the handful of habits I actually wanted to keep, with reminders that turn up when they're useful rather than whenever.",
    ],
  },
  {
    slug: "second-screen-widget",
    category: "Desktop utility",
    title: "Second-screen widget",
    summary:
      "A desktop widget that parks the things I keep checking on my second monitor, so I stop alt tabbing to find them.",
    body: [
      "A desktop widget that parks the things I keep checking on my second monitor, so I stop alt tabbing to find them.",
    ],
  },
  {
    slug: "pomodoro-timer",
    category: "Embedded system",
    title: "Pomodoro timer",
    summary:
      "A focus timer I built as a physical object, mostly as an excuse to do something embedded with my hands.",
    body: [
      "A focus timer I built as a physical object, mostly as an excuse to do something embedded with my hands.",
    ],
  },
];
