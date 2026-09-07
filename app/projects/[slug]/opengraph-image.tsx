import { ImageResponse } from "next/og";
import { OgCard, truncate } from "@/components/og-card";
import { getProject, projects } from "@/content/projects";

export const alt = "Project case study by Adam Nielsen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

// params is awaited so this works whether Next passes a promise or a plain
// object; generateStaticParams means an unknown slug is never rendered.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={project ? `${project.kicker} · ${project.status} · ${project.year}` : undefined}
        title={project?.title ?? "Adam Nielsen"}
        description={project ? truncate(project.indexSummary) : undefined}
        footer={project?.technologies.join(" · ")}
      />
    ),
    size,
  );
}
