import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og-card";
import { smallerProjects } from "@/content/smaller-projects";

export const alt = "Smaller projects by Adam Nielsen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Utilities, experiments, and embedded builds"
        title="Smaller projects"
        description="Smaller things I've built to solve a problem I had or to try out an idea, usually learning something new along the way."
        footer={smallerProjects.map((build) => build.title).join(" · ")}
      />
    ),
    size,
  );
}
