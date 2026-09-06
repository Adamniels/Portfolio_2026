const previewBuilds = [
  {
    category: "Mobile utility",
    title: "Habit tracker",
    description: "A focused app for tracking recurring habits and time-based reminders.",
  },
  {
    category: "Desktop utility",
    title: "Second-screen widget",
    description: "A desktop widget for keeping useful information visible on a dedicated second screen.",
  },
  {
    category: "Embedded system",
    title: "Pomodoro timer",
    description: "A physical focus timer built as a smaller embedded-systems project.",
  },
];

export function SelectedBuildsPreview() {
  return (
    <section className="selected-builds-preview" aria-labelledby="selected-builds-heading">
      <div className="section-heading">
        <h2 id="selected-builds-heading">Smaller projects</h2>
        <span>{String(previewBuilds.length).padStart(2, "0")} previews</span>
      </div>
      <p className="small-project-intro">
        Utilities, experiments, and embedded builds. Smaller projects for exploring
        an idea or solving an everyday problem.
      </p>
      <div className="small-project-grid">
        {previewBuilds.map((build) => (
          <article className="small-project" key={build.title}>
            <p className="small-project-category">{build.category}</p>
            <h3>{build.title}</h3>
            <p className="small-project-description">{build.description}</p>
          </article>
        ))}
      </div>
      <p className="small-project-notice">
        Layout preview. These are placeholder projects; final content and details will follow.
      </p>
    </section>
  );
}
