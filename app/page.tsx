import Link from "next/link";
import { SelectedBuildsPreview } from "@/components/selected-builds-preview";
import { SiteFooter } from "@/components/site-footer";
import { projects } from "@/content/projects";

export default function Home() {
  const orderedProjects = [...projects].sort((a, b) => Number(a.number) - Number(b.number));

  return (
    <main className="site-shell" id="top">
      <a className="skip-link" href="#work">Skip to projects</a>
      <nav className="nav" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Adam Nielsen, home">
          <span className="monogram" aria-hidden="true">an.</span> Adam Nielsen
        </Link>
        <a className="nav-work" href="#work">Selected work <span aria-hidden="true">↘</span></a>
      </nav>

      <header className="home-hero">
        <p className="eyebrow">Software engineering · Uppsala, Sweden</p>
        <h1>Behind the interface.<br /><span>Inside the system.</span></h1>
        <p className="hero-intro">
          I’m Adam, an M.Sc. Information Technology student at Uppsala University.
          I build backend systems, work with applied AI, and care about how software fits together.
        </p>
        <div className="hero-focus" aria-label="Areas of focus">
          <span>Backend development</span><span>System architecture</span><span>Applied AI</span>
        </div>
      </header>

      <section className="project-index" id="work" aria-labelledby="work-heading">
        <div className="section-heading">
          <h2 id="work-heading">Selected projects</h2>
          <span>{String(orderedProjects.length).padStart(2, "0")} projects / 2025–26</span>
        </div>
        {orderedProjects.map((project) => (
          <article className="project-row" key={project.slug}>
            <span className="project-number" aria-hidden="true">{project.number}</span>
            <div className="project-row-main">
              <div className="project-row-meta"><span>{project.kicker}</span><span>{project.status} · {project.year}</span></div>
              <Link className="project-title-link" href={`/projects/${project.slug}`}>
                <h3>{project.title}</h3>
              </Link>
              <p className="project-description">{project.indexSummary}</p>
              <ul className="technology-list" aria-label={`${project.title} technologies and focus`}>
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <div className="project-row-foot">
                <p><strong>{project.metric}</strong> {project.metricLabel}</p>
                <Link className="text-link" href={`/projects/${project.slug}`}>Explore the project <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      <SelectedBuildsPreview />

      <SiteFooter home />
    </main>
  );
}
