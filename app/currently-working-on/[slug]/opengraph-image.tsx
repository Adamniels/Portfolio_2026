import { ImageResponse } from "next/og";
import { OgCard, truncate } from "@/components/og-card";
import { currentlyWorkingOn, getCurrentlyWorkingOn } from "@/content/currently-working-on";

export const contentType = "image/png";

const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return currentlyWorkingOn.map(({ slug }) => ({ slug }));
}

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const entry = getCurrentlyWorkingOn((await params).slug);

  return [
    {
      id: "card",
      size,
      contentType,
      alt: entry ? `${entry.title} — ${entry.hook}` : "Currently working on, by Adam Nielsen",
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const entry = getCurrentlyWorkingOn((await params).slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={entry ? `Currently working on · ${entry.status}` : undefined}
        title={entry?.title ?? "Adam Nielsen"}
        description={entry ? truncate(entry.hook) : undefined}
        footer={entry?.technologies.join(" · ")}
      />
    ),
    size,
  );
}
