export type Experiment = {
  number: string;
  title: string;
  oneLiner: string;
  stack: string;
  status: string;
};

// Smaller in-progress builds. Copy and status are replaced with verified
// material as each one is far enough along to show properly.
export const experiments: Experiment[] = [
  {
    number: "E1",
    title: "Habit tracker",
    oneLiner: "A focused app for tracking recurring habits and time-based reminders.",
    stack: "Swift · SwiftUI",
    status: "In progress",
  },
  {
    number: "E2",
    title: "Second-screen widget",
    oneLiner: "A desktop widget that keeps schedule and focus information on a dedicated second screen.",
    stack: "TypeScript · Electron",
    status: "In progress",
  },
  {
    number: "E3",
    title: "Pomodoro timer",
    oneLiner: "A physical focus timer built as a smaller embedded-systems project.",
    stack: "C · Embedded",
    status: "Concept",
  },
];
