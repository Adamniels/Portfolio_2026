import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { smallerProjects } from "@/content/smaller-projects";

export const metadata: Metadata = {
  title: "Smaller projects — Adam Nielsen",
  description:
    "Utilities, experiments, and embedded builds by Adam Nielsen. Smaller projects for exploring an idea or solving an everyday problem.",
};

export default function SmallerProjectsPage() {
  return (
    <main className="site-shell" id="top">
      <a className="skip-link" href="#builds">Skip to projects</a>
      <nav className="nav" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Adam Nielsen, home">
          <span className="monogram" aria-hidden="true">an.</span> Adam Nielsen
        </Link>
        <Link className="nav-work" href="/#work">All projects <span aria-hidden="true">↗</span></Link>
      </nav>

      <header className="case-hero">
        <Link className="breadcrumb" href="/#work">← Selected projects</Link>
        <div className="case-hero-meta">
          <span>Utilities, experiments, and embedded builds</span>
          <span>{String(smallerProjects.length).padStart(2, "0")} projects</span>
        </div>
        <h1>Smaller projects</h1>
        <p>
          Smaller projects for exploring an idea or solving an everyday problem.
          Each one is short enough to finish, and narrow enough to learn something
          specific from.
        </p>
      </header>

      <section className="builds-list" id="builds" aria-label="Smaller projects">
        {smallerProjects.map((build) => (
          <article id={build.slug} key={build.slug}>
            <div className="build-meta">
              <span>{build.category}</span>
              {build.status && build.year && (
                <span>{build.status} · {build.year}</span>
              )}
            </div>
            <h2>{build.title}</h2>
            {build.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {!!build.technologies?.length && (
              <ul className="technology-list" aria-label={`${build.title} technologies`}>
                {build.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            )}
            {!!build.links?.length && (
              <div className="build-links">
                {build.links.map(({ label, href }) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer">
                    {label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
