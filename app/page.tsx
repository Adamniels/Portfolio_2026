import Link from "next/link";
import { ProjectVisual } from "@/components/project-visuals";
import { SelectedBuildsPreview } from "@/components/selected-builds-preview";
import { projects } from "@/content/projects";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const featuredProjects = projects.filter(({ scope }) => scope === "featured");
  const compactProjects = projects.filter(({ scope }) => scope === "compact");

  return (
    <main id="top">
      <nav className="nav">
        <Link className="wordmark" href="/" aria-label="Portfolio home">AN<span>.</span></Link>
        <div className="nav-links">
          <a href="#work">Project index</a>
          <a href="mailto:hello@example.com">Contact <Arrow /></a>
        </div>
      </nav>

      <header className="home-hero">
        <div className="hero-meta">
          <span>M.Sc. Student in Computer &amp; Information Engineering</span>
          <span>2024—26</span>
          <span>{projects.length.toString().padStart(2, "0")} projects</span>
        </div>
        <h1>
          Software engineer <em>with an interest in</em> data science and embedded systems.
        </h1>
        <a href="#work" className="round-link" aria-label="View project index">↓</a>
      </header>

      <section className="project-index" id="work">
        <div className="section-heading">
          <p>Featured projects</p>
          <span>{featuredProjects.length.toString().padStart(2, "0")} projects</span>
        </div>

        {featuredProjects.map((project) => (
          <article
            className={`project-summary project-${project.slug}`}
            id={project.slug}
            key={project.slug}
          >
            <div className="summary-head">
              <span>{project.number}</span>
              <div className="summary-meta">
                <span>{project.status}</span>
                <span>{project.year}</span>
              </div>
            </div>

            <Link className="project-title-link" href={`/projects/${project.slug}`}>
              <div>
                <p>{project.kicker}</p>
                <h2>{project.title}</h2>
              </div>
              <span className="title-arrow">↗</span>
            </Link>

            <p className="project-summary-copy">{project.summary}</p>

            {project.slug === "contextual-outreach" ? (
              <div className="visual-link is-interactive">
                <ProjectVisual slug={project.slug} />
              </div>
            ) : (
              <Link className="visual-link" href={`/projects/${project.slug}`} aria-label={`View ${project.title} case study`}>
                <ProjectVisual slug={project.slug} />
              </Link>
            )}

            <div className="summary-foot">
              <div className="disciplines">
                {project.disciplines.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="result">
                <strong>{project.metric}</strong>
                <span>{project.metricLabel}</span>
              </div>
              <Link className="text-link" href={`/projects/${project.slug}`}>
                Full case study <Arrow />
              </Link>
            </div>
          </article>
        ))}

        <section className="additional-work">
          <div className="section-heading additional-heading">
            <p>Additional work</p>
            <span>{compactProjects.length.toString().padStart(2, "0")} project</span>
          </div>

          {compactProjects.map((project) => (
            <article className="compact-project" id={project.slug} key={project.slug}>
              <div className="compact-meta">
                <span>{project.number}</span>
                <span>{project.kicker}</span>
                <span>{project.year}</span>
              </div>
              <Link className="compact-title" href={`/projects/${project.slug}`}>
                <h2>{project.title}</h2>
                <span>↗</span>
              </Link>
              <div className="compact-body">
                <p>{project.summary}</p>
                <div className="disciplines">
                  {project.disciplines.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="compact-result">
                  <strong>{project.metric}</strong>
                  <span>{project.metricLabel}</span>
                </div>
                <Link className="text-link" href={`/projects/${project.slug}`}>
                  View team project <Arrow />
                </Link>
              </div>
            </article>
          ))}
        </section>

        <SelectedBuildsPreview />
      </section>

      <footer>
        <span>Selected work / 2026</span>
        <span>Software engineering · Data science</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
