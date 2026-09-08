import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og-card";

export const alt =
  "Adam Nielsen — backend systems, embedded projects, software architecture, and applied AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Software engineering · Uppsala, Sweden"
        title="Things I've built and how they work."
        description="M.Sc. Information Technology student at Uppsala University. I build backend systems and embedded projects, work with applied AI, and care about how software fits together."
        footer="Backend development · Embedded systems · System architecture · Applied AI"
      />
    ),
    size,
  );
}
