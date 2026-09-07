import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DiagramCarousel, DiagramViewer } from "@/components/diagram-viewer";
import { ProjectVisual } from "@/components/project-visuals";
import { SiteFooter } from "@/components/site-footer";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "Project" };

  const title = `${project.title} — Adam Nielsen`;
  const url = `/projects/${project.slug}`;

  return {
    title,
    description: project.indexSummary,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description: project.indexSummary, url },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const orderedProjects = [...projects].sort((a, b) => Number(a.number) - Number(b.number));
  const currentIndex = orderedProjects.findIndex(({ slug }) => slug === project.slug);
  const nextProject = orderedProjects[(currentIndex + 1) % orderedProjects.length];

  return (
    <main className="site-shell case-page" id="top">
      <a className="skip-link" href="#overview">Skip to project content</a>
      <nav className="nav" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Adam Nielsen, home">
          <span className="monogram" aria-hidden="true">an.</span> Adam Nielsen
        </Link>
        <Link className="nav-work" href="/#work">All projects <span aria-hidden="true">↗</span></Link>
      </nav>

      <header className="case-hero">
        <Link className="breadcrumb" href="/#work">← Selected projects</Link>
        <div className="case-hero-meta">
          <span>{project.kicker}</span><span>{project.status} · {project.year}</span>
        </div>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <ul className="technology-list" aria-label="Technologies and focus">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </header>

      <nav className="case-toc" aria-label="On this page">
        <a href="#overview">Overview</a>
        <a href="#architecture">Architecture</a>
        <a href="#engineering">Engineering</a>
        <a href="#product">Product</a>
        <a href="#evaluation">Evaluation</a>
        <a href="#outcome">Outcome</a>
      </nav>

      <section className="case-section" id="overview" aria-labelledby="overview-heading">
        <p className="case-label">01 / The problem</p>
        <div className="case-copy">
          <h2 id="overview-heading">{project.challengeTitle}</h2>
          <p>{project.challenge}</p>
        </div>
        <div className="case-stat"><strong>{project.metric}</strong><span>{project.metricLabel}</span></div>
      </section>

      <section className="case-section" id="architecture" aria-labelledby="architecture-heading">
        <p className="case-label">02 / Architecture</p>
        <div className="case-copy">
          <h2 id="architecture-heading">{project.architecture.title}</h2>
          <p>{project.architecture.summary}</p>
        </div>
        <div className="architecture-visual">
          {project.architecture.image ? (
            <DiagramViewer diagram={{
              src: project.architecture.image,
              alt: project.architecture.imageAlt ?? `${project.title} architecture and component boundaries`,
              caption: project.architecture.imageCaption ?? "System overview: core capabilities, persistence, and replaceable infrastructure boundaries.",
              label: "System architecture",
              theme: project.architecture.imageTheme ?? "light",
            }} />
          ) : (
            <div className="architecture-flow" aria-label={`${project.title} architecture flow`}>
              {project.architecture.flow.map((step, index) => (
                <div className="architecture-step" key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="case-section" id="engineering" aria-labelledby="engineering-heading">
        <p className="case-label">03 / Engineering</p>
        <div className="technical-content">
          <h2 id="engineering-heading">The decisions behind the system.</h2>
          <div className="technical-list">
            {project.technicalHighlights.map((highlight, index) => (
              <article key={highlight.title}>
                <div className="technical-heading">
                  <span>{String(index + 1).padStart(2, "0")}</span><h3>{highlight.title}</h3>
                </div>
                <p className="technical-summary">{highlight.summary}</p>
                <details className="technical-details">
                  <summary>Implementation details</summary>
                  <ul>{highlight.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                </details>
                {!!highlight.visuals?.length && (
                  <DiagramCarousel title={highlight.visualTitle ?? highlight.title} diagrams={highlight.visuals} />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="case-section" id="product" aria-labelledby="product-heading">
        <p className="case-label" id="product-heading">04 / Product walkthrough</p>
        <ProjectVisual slug={project.slug} />
      </section>

      <section className="case-section" id="evaluation" aria-labelledby="evaluation-heading">
        <p className="case-label">05 / Evaluation</p>
        <div className="case-copy">
          <h2 id="evaluation-heading">{project.evaluation.title}</h2>
          <div className="evaluation-copy">
            {(project.evaluation.details ?? [project.evaluation.summary]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        {!project.evaluation.textOnly && (
          <div className="evidence-grid">
            {project.evaluation.evidence.map(({ value, label }) => (
              <div key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        )}
      </section>

      <section className="case-section" id="outcome" aria-labelledby="outcome-heading">
        <p className="case-label">06 / Outcome</p>
        <div className="case-copy">
          <h2 id="outcome-heading">{project.outcomeTitle ?? "What the project delivered."}</h2>
          {project.outcomeSummary ? <p>{project.outcomeSummary}</p> :
            (project.outcomeDetails ?? [project.outcome]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {project.outcomeHighlights && (
            <div className="outcome-highlights">
              {project.outcomeHighlights.map(({ label, text }) => (
                <div key={label}><span>{label}</span><p>{text}</p></div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Link className="next-project" href={`/projects/${nextProject.slug}`}>
        <span>Next project</span><strong>{nextProject.title}</strong><i aria-hidden="true">↗</i>
      </Link>
      <SiteFooter />
    </main>
  );
}
