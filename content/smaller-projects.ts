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
      "A focused app for tracking recurring habits and time-based reminders.",
    body: [
      "A focused app for tracking recurring habits and time-based reminders.",
    ],
  },
  {
    slug: "second-screen-widget",
    category: "Desktop utility",
    title: "Second-screen widget",
    summary:
      "A desktop widget for keeping useful information visible on a dedicated second screen.",
    body: [
      "A desktop widget for keeping useful information visible on a dedicated second screen.",
    ],
  },
  {
    slug: "pomodoro-timer",
    category: "Embedded system",
    title: "Pomodoro timer",
    summary:
      "A physical focus timer built as a smaller embedded-systems project.",
    body: [
      "A physical focus timer built as a smaller embedded-systems project.",
    ],
  },
];
