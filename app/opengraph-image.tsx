import { ImageResponse } from "next/og";
import { OgCard } from "@/components/og-card";

export const alt =
  "Adam Nielsen — backend systems, software architecture, and applied AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Software engineering · Uppsala, Sweden"
        title="Behind the interface. Inside the system."
        description="M.Sc. Information Technology student at Uppsala University. I build backend systems, work with applied AI, and care about how software fits together."
        footer="Backend development · System architecture · Applied AI"
      />
    ),
    size,
  );
}
