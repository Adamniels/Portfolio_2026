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
        description="Smaller projects for exploring an idea or solving an everyday problem. Each one is short enough to finish, and narrow enough to learn something specific from."
        footer={smallerProjects.map((build) => build.title).join(" · ")}
      />
    ),
    size,
  );
}
