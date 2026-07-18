import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

      <section className="case-process">
        <p className="case-label">02 / Approach</p>
        <ol>
          {project.approach.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-result">
        <p className="case-label">03 / Outcome</p>
        <p>{project.outcome}</p>
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
