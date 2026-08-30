import Link from "next/link";
import { experiments } from "@/content/experiments";
import { projects } from "@/content/projects";

export default function Home() {
  const featured = projects
    .filter(({ scope }) => scope === "featured")
    .sort((a, b) => Number(a.number) - Number(b.number));

  return (
    <main className="wrap" id="top">
      <nav className="nav">
        <Link className="wordmark" href="/" aria-label="Portfolio home">
          AN<span>.</span>
        </Link>
        <div className="nav-links">
          <a href="#work">Index</a>
          <a href="mailto:nielsenadam44@gmail.com">Contact</a>
        </div>
      </nav>

      <header className="intro">
        <h1 className="intro-statement">
          Software engineer, building <em>real systems</em> end to end.
        </h1>
        <p className="intro-sub">
          Backend architecture, applied AI, and the product around them. M.Sc. in Computer
          and Information Engineering at Uppsala University.
        </p>
        <p className="intro-meta">
          {featured.length + experiments.length} projects · 2024&ndash;26
        </p>
      </header>

      <section className="work" id="work">
        <div className="work-head">
          <span>Selected work</span>
          <span>{featured.length.toString().padStart(2, "0")}</span>
        </div>

        <div className="index-list">
          {featured.map((project) => (
            <div className="index-row" key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <span className="index-num">{project.number}</span>
                <div className="index-main">
                  <h2 className="index-name">{project.title}</h2>
                  <p className="index-line">{project.oneLiner}</p>
                  <p className="index-stack">{project.stack.join(" · ")}</p>
                </div>
                <div className="index-meta">
                  <span>{project.year}</span>
                  <span>{project.status}</span>
                  <span className="index-arrow" aria-hidden="true">↗</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="experiments">
        <div className="work-head">
          <span>Experiments</span>
          <span>{experiments.length.toString().padStart(2, "0")}</span>
        </div>

        <div className="exp-list">
          {experiments.map((item) => (
            <div className="exp-row" key={item.number}>
              <span className="exp-row-num">{item.number}</span>
              <div className="exp-row-name">
                {item.title}
                <span>{item.oneLiner}</span>
              </div>
              <div className="exp-row-meta">
                <span>{item.stack}</span>
                <span>{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="experiments-note">
          Shorter builds, still in progress. Names, copy, and detail pages get replaced with
          verified material as each one matures.
        </p>
      </section>

      <footer className="footer">
        <span>Adam Nielsen</span>
        <span>Software engineering · Data science</span>
        <a href="#top">Top ↑</a>
      </footer>
    </main>
  );
}
