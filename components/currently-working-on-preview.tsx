import Link from "next/link";
import { currentlyWorkingOn } from "@/content/currently-working-on";

export function CurrentlyWorkingOnPreview() {
  return (
    <section className="currently-working-on" id="currently-working-on" aria-labelledby="cwo-heading">
      <div className="section-heading">
        <h2 id="cwo-heading">Currently working on</h2>
        <span>
          {String(currentlyWorkingOn.length).padStart(2, "0")}{" "}
          project{currentlyWorkingOn.length === 1 ? "" : "s"}
        </span>
      </div>
      {currentlyWorkingOn.map((entry) => (
        <article className="cwo-card" key={entry.slug}>
          <p className="cwo-card-status">{entry.status}</p>
          <Link className="project-title-link" href={`/currently-working-on/${entry.slug}`}>
            <h3>{entry.title}</h3>
          </Link>
          <p className="cwo-card-hook">{entry.hook}</p>
          <ul className="technology-list" aria-label={`${entry.title} technologies`}>
            {entry.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <Link className="text-link" href={`/currently-working-on/${entry.slug}`}>
            Read more <span aria-hidden="true">→</span>
          </Link>
        </article>
      ))}
    </section>
  );
}
