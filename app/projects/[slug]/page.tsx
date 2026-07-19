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
    title: project ? `${project.title} — Case Study` : "Project",
    description: project?.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex(({ slug }) => slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className={`case-page case-${project.slug}`} id="top">
      <nav className="nav case-nav">
        <Link className="wordmark" href="/" aria-label="Portfolio home">AN<span>.</span></Link>
        <div className="nav-links">
          <Link href="/#work">All projects</Link>
          <a href="mailto:hello@example.com">Contact ↗</a>
        </div>
      </nav>

      <header className="case-hero">
        <div className="case-hero-meta">
          <span>{project.number} / {project.kicker}</span>
          <span>{project.status} · {project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="disciplines case-disciplines">
          {project.disciplines.map((item) => <span key={item}>{item}</span>)}
        </div>
      </header>

      <div className="case-visual-wrap">
        <ProjectVisual slug={project.slug} />
      </div>

      <section className="case-overview">
        <p className="case-label">01 / Challenge</p>
        <div className="case-copy">
          <h2>{project.challengeTitle}</h2>
          <p>{project.challenge}</p>
        </div>
        <div className="case-stat">
          <strong>{project.metric}</strong>
          <span>{project.metricLabel}</span>
        </div>
      </section>

      <section className="case-architecture">
        <p className="case-label">02 / Architecture</p>
        <div className="architecture-content">
          <h2>{project.architecture.title}</h2>
          <p>{project.architecture.summary}</p>
        </div>

        <div className={`architecture-visual${project.architecture.image ? " has-image" : ""}`}>
          {project.architecture.image ? (
            <DiagramViewer
              diagram={{
                src: project.architecture.image,
                alt: `${project.title} system architecture showing actors, clients, backend modules, infrastructure adapters, and external systems`,
                caption:
                  "Whole-system overview — clients, core capabilities, persistence, and replaceable infrastructure boundaries.",
                label: "System architecture",
                theme: "light",
              }}
            />
          ) : (
            <>
              <div className="architecture-visual-meta">
                <span>System overview</span>
                <span>Diagram placeholder</span>
              </div>
              <div className="architecture-flow" aria-label={`${project.title} architecture flow`}>
                {project.architecture.flow.map((step, index) => (
                  <div className="architecture-step" key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                    {index < project.architecture.flow.length - 1 && <i>→</i>}
                  </div>
                ))}
              </div>
              <p className="replace-note">
                Replace with the project architecture diagram
              </p>
            </>
          )}
        </div>
      </section>

      <section className="case-technical">
        <p className="case-label">03 / Technical highlights</p>
        <div className="technical-content">
          <h2>What was most interesting to build.</h2>
          <div className="technical-list">
            {project.technicalHighlights.map((highlight, index) => {
              const diagrams = highlight.visuals ?? [];

              return (
                <article className={diagrams.length ? "has-visuals" : ""} key={highlight.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.summary}</p>
                    <ul>
                      {highlight.details.map((detail) => <li key={detail}>{detail}</li>)}
                    </ul>
                  </div>
                  {diagrams.length ? (
                    <DiagramCarousel
                      title={highlight.visualTitle ?? `${highlight.title} / Technical walkthrough`}
                      diagrams={diagrams}
                    />
                  ) : (
                    <div className="technical-visual-placeholder">
                      <span>Supporting visual</span>
                      <strong>{highlight.title}</strong>
                      <small>Diagram or code-level walkthrough</small>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="case-evaluation">
        <p className="case-label">04 / Evaluation</p>
        <div className={`evaluation-content${project.evaluation.textOnly ? " is-text-only" : ""}`}>
          <h2>{project.evaluation.title}</h2>
          <div className="evaluation-copy">
            {(project.evaluation.details ?? [project.evaluation.summary]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {!project.evaluation.textOnly && (
            <>
              <div className="evidence-grid">
                {project.evaluation.evidence.map(({ value, label }) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
              <div className="evaluation-visual-placeholder">
                <span>Evaluation visual placeholder</span>
                <p>Replace with an aggregate chart, test result, or comparison from the project.</p>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="case-result" id="outcome">
        <p className="case-label">05 / Outcome</p>
        {project.outcomeTitle && project.outcomeSummary && project.outcomeHighlights ? (
          <div className="case-result-structured">
            <h2>{project.outcomeTitle}</h2>
            <p>{project.outcomeSummary}</p>
            <div className="outcome-highlights">
              {project.outcomeHighlights.map(({ label, text }) => (
                <div key={label}>
                  <span>{label}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="case-result-copy">
            {(project.outcomeDetails ?? [project.outcome]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}
      </section>

      <Link className="next-project" href={`/projects/${nextProject.slug}`}>
        <span>Next project / {nextProject.number}</span>
        <strong>{nextProject.title}</strong>
        <i>↗</i>
      </Link>

      <footer>
        <Link href="/">Project index</Link>
        <span>{project.title} / {project.year}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
