import { ImageResponse } from "next/og";

// iOS masks its own rounded corners, so this fills the square edge to edge
// rather than reusing icon.svg's radius.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#285bc5",
          color: "#fcfcfd",
          fontSize: 108,
          fontWeight: 600,
          fontFamily: "sans-serif",
        }}
      >
        a
      </div>
    ),
    size,
  );
}
