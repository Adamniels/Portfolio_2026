import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DiagramCarousel, DiagramViewer } from "@/components/diagram-viewer";
import { ProjectVisual } from "@/components/project-visuals";
import { getProject, projects } from "@/content/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return {
    title: project ? `${project.title} — Case study` : "Project",
    description: project?.oneLiner ?? project?.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const ordered = [...projects].sort((a, b) => Number(a.number) - Number(b.number));
  const currentIndex = ordered.findIndex(({ slug }) => slug === project.slug);
  const nextProject = ordered[(currentIndex + 1) % ordered.length];

  const evaluationParagraphs =
    project.evaluation.details ?? [project.evaluation.summary];

  return (
    <main className="wrap case" id="top">
      <nav className="nav case-nav">
        <Link className="wordmark" href="/" aria-label="Portfolio home">
          AN<span>.</span>
        </Link>
        <div className="nav-links">
          <Link href="/#work">Index</Link>
          <a href="mailto:nielsenadam44@gmail.com">Contact</a>
        </div>
      </nav>

      <header className="case-head">
        <p className="case-kicker">
          {project.number} / {project.status} / {project.year}
        </p>
        <h1 className="case-title">{project.title}</h1>
        <p className="case-lead">{project.oneLiner}</p>
        <dl className="spec">
          <div className="spec-row">
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div className="spec-row">
            <dt>Stack</dt>
            <dd>{project.stack.join(" · ")}</dd>
          </div>
          <div className="spec-row">
            <dt>Focus</dt>
            <dd>{project.disciplines.join(" · ")}</dd>
          </div>
          <div className="spec-row">
            <dt>Scale</dt>
            <dd>
              {project.metric} {project.metricLabel}
            </dd>
          </div>
        </dl>
      </header>

      <div className="case-figure">
        <ProjectVisual slug={project.slug} />
      </div>

      <section className="section">
        <div className="section-inner">
          <p className="section-label">Challenge</p>
          <div className="section-body">
            <h2>{project.challengeTitle}</h2>
            <p>{project.challenge}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="section-label">Approach</p>
          <div className="section-body">
            <ol className="approach-list">
              {project.approach.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section is-wide">
        <div className="section-inner">
          <p className="section-label">Architecture</p>
          <div className="section-body">
            <h2>{project.architecture.title}</h2>
            <p>{project.architecture.summary}</p>
            {project.architecture.image ? (
              <div className="section-figure">
                <DiagramViewer
                  diagram={{
                    src: project.architecture.image,
                    alt:
                      project.architecture.imageAlt ??
                      `${project.title} system architecture and its main component boundaries`,
                    caption:
                      project.architecture.imageCaption ??
                      "Whole-system overview.",
                    label: "System architecture",
                    theme: project.architecture.imageTheme ?? "light",
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section is-wide">
        <div className="section-inner">
          <p className="section-label">Highlights</p>
          <div className="section-body">
            {project.technicalHighlights.map((highlight, index) => (
              <article className="highlight" key={highlight.title}>
                <div className="highlight-head">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{highlight.title}</h3>
                </div>
                <div className="highlight-body">
                  <p>{highlight.summary}</p>
                  <ul>
                    {highlight.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  {highlight.visuals && highlight.visuals.length > 0 ? (
                    <DiagramCarousel
                      title={
                        highlight.visualTitle ??
                        `${highlight.title} / Technical walkthrough`
                      }
                      diagrams={highlight.visuals}
                    />
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <p className="section-label">Evaluation</p>
          <div className="section-body">
            <h2>{project.evaluation.title}</h2>
            {evaluationParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {!project.evaluation.textOnly ? (
              <div className="evidence">
                {project.evaluation.evidence.map(({ value, label }) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section" id="outcome">
        <div className="section-inner">
          <p className="section-label">Outcome</p>
          <div className="section-body">
            {project.outcomeTitle && project.outcomeSummary && project.outcomeHighlights ? (
              <>
                <h2>{project.outcomeTitle}</h2>
                <p>{project.outcomeSummary}</p>
                <div className="outcome-cols">
                  {project.outcomeHighlights.map(({ label, text }) => (
                    <div key={label}>
                      <span>{label}</span>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              (project.outcomeDetails ?? [project.outcome]).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))
            )}
          </div>
        </div>
      </section>

      <Link className="case-next" href={`/projects/${nextProject.slug}`}>
        <span>Next / {nextProject.number}</span>
        <strong>{nextProject.title}</strong>
        <span className="case-next-arrow" aria-hidden="true">↗</span>
      </Link>

      <footer className="footer">
        <Link href="/">Index</Link>
        <span>{project.title} · {project.year}</span>
        <a href="#top">Top ↑</a>
      </footer>
    </main>
  );
}
