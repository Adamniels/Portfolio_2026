import Link from "next/link";
import { smallerProjects } from "@/content/smaller-projects";

export function SelectedBuildsPreview() {
  return (
    <section className="selected-builds-preview" aria-labelledby="selected-builds-heading">
      <div className="section-heading">
        <h2 id="selected-builds-heading">Smaller projects</h2>
        <span>{String(smallerProjects.length).padStart(2, "0")} projects</span>
      </div>
      <p className="small-project-intro">
        Utilities, experiments, and embedded builds. Smaller projects for exploring
        an idea or solving an everyday problem.
      </p>
      <div className="small-project-grid">
        {smallerProjects.map((build) => (
          <article className="small-project" key={build.slug}>
            <p className="small-project-category">{build.category}</p>
            <h3>
              <Link href={`/smaller-projects#${build.slug}`}>{build.title}</Link>
            </h3>
            <p className="small-project-description">{build.summary}</p>
          </article>
        ))}
      </div>
      <div className="selected-builds-foot">
        <Link className="text-link" href="/smaller-projects">
          See all smaller projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
