const previewBuilds = [
  {
    index: "01",
    category: "Mobile utility",
    title: "Habit tracker",
    description: "A focused app for tracking recurring habits and time-based reminders.",
    tags: ["Habits", "Reminders"],
    visual: "habit",
  },
  {
    index: "02",
    category: "Desktop utility",
    title: "Second-screen widget",
    description: "A desktop widget for keeping useful information visible on a dedicated second screen.",
    tags: ["Desktop", "Utility"],
    visual: "widget",
  },
  {
    index: "03",
    category: "Embedded system",
    title: "Pomodoro timer",
    description: "A physical focus timer built as a smaller embedded-systems project.",
    tags: ["Embedded", "Physical interface"],
    visual: "pomodoro",
  },
];

function HabitPreview() {
  return (
    <div className="build-mock build-mock-habit" aria-label="Placeholder visual for the habit tracker">
      <div className="habit-window">
        <div className="habit-topline"><span>Today</span><span>03 / 04</span></div>
        <strong>Keep the rhythm.</strong>
        <div className="habit-days" aria-hidden="true">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
          <i className="is-done">✓</i><i className="is-done">✓</i><i className="is-current">3</i><i /><i /><i /><i />
        </div>
        <div className="habit-streak"><span>Current streak</span><b>3 days</b></div>
      </div>
    </div>
  );
}

function WidgetPreview() {
  return (
    <div className="build-mock build-mock-widget" aria-label="Placeholder visual for the second-screen widget">
      <div className="widget-bar"><span>Second screen</span><span>09:41</span></div>
      <div className="widget-grid">
        <div className="widget-clock"><strong>09:41</strong><span>Monday · July 19</span></div>
        <div className="widget-list">
          <span>Today</span>
          <p><i /> Project work</p>
          <p><i /> Study block</p>
          <p><i /> Evening reset</p>
        </div>
        <div className="widget-status"><span>Focus</span><b>62 min</b></div>
      </div>
    </div>
  );
}

function PomodoroPreview() {
  return (
    <div className="build-mock build-mock-pomodoro" aria-label="Placeholder visual for the embedded Pomodoro timer">
      <div className="pomodoro-shadow" />
      <div className="pomodoro-device">
        <div className="pomodoro-screen"><span>Focus</span><strong>25:00</strong></div>
        <div className="pomodoro-controls"><i /><i /><i /></div>
        <div className="pomodoro-knob"><span /></div>
      </div>
    </div>
  );
}

function BuildPreview({ visual }: { visual: string }) {
  if (visual === "habit") return <HabitPreview />;
  if (visual === "widget") return <WidgetPreview />;
  return <PomodoroPreview />;
}

export function SelectedBuildsPreview() {
  return (
    <section className="selected-builds-preview" aria-labelledby="selected-builds-heading">
      <div className="section-heading selected-builds-heading">
        <p id="selected-builds-heading">Selected builds</p>
        <span>03 layout previews</span>
      </div>

      <div className="build-preview-notice">
        <span>Mock section</span>
        <p>
          These cards preview how smaller projects could be presented. Names, copy, visuals,
          details, and project pages will be replaced with verified material later.
        </p>
      </div>

      <div className="build-preview-grid">
        {previewBuilds.map((build) => (
          <article className="build-preview-card" key={build.title}>
            <div className="build-preview-meta">
              <span>{build.index}</span>
              <span>{build.category}</span>
              <span>Mock preview</span>
            </div>
            <BuildPreview visual={build.visual} />
            <div className="build-preview-copy">
              <h3>{build.title}</h3>
              <p>{build.description}</p>
            </div>
            <div className="build-preview-foot">
              <div className="build-preview-tags">
                {build.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <span className="build-preview-status">Details to add later</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
