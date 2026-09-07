// Shared layout for generated Open Graph cards.
//
// Rendered by Satori (behind next/og's ImageResponse), which supports only a
// subset of CSS: flexbox only, no grid, and every element is laid out as flex.
// Set display explicitly on any element with more than one child, and prefer
// margins over shorthand layout properties.
export const OG_SIZE = { width: 1200, height: 630 };

// Guard against an index summary long enough to overflow the card. The limit
// clears every current summary (the longest is 169) so nothing is cut today;
// it exists so a future long one degrades at a word boundary instead.
export function truncate(text: string, limit = 200) {
  if (text.length <= limit) return text;
  const lastSpace = text.lastIndexOf(" ", limit);
  return `${text.slice(0, lastSpace > 0 ? lastSpace : limit)}…`;
}

export function OgCard({
  eyebrow,
  title,
  description,
  footer,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  footer?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fcfcfd",
        color: "#202630",
        borderLeft: "16px solid #285bc5",
        padding: "68px 76px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: 32, fontWeight: 600, color: "#285bc5" }}>an.</span>
        <span style={{ fontSize: 24, fontWeight: 600, marginLeft: 18 }}>Adam Nielsen</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {eyebrow ? (
          <span style={{ fontSize: 25, color: "#626b78", marginBottom: 20 }}>{eyebrow}</span>
        ) : null}
        <span
          style={{
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "-0.035em",
            lineHeight: 1.12,
          }}
        >
          {title}
        </span>
        {description ? (
          <span
            style={{
              fontSize: 27,
              color: "#626b78",
              lineHeight: 1.5,
              marginTop: 24,
              maxWidth: 940,
            }}
          >
            {description}
          </span>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #dde2e9",
          paddingTop: 24,
          fontSize: 21,
          color: "#626b78",
        }}
      >
        {footer ?? "adamnielsdev.com"}
      </div>
    </div>
  );
}
