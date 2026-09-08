import type { Metadata } from "next";
import { siteUrl } from "@/content/site";
import "./globals.css";

const description =
  "Selected projects by Adam Nielsen, an M.Sc. Information Technology student at Uppsala University focused on backend systems, embedded projects, software architecture, and applied AI.";

// metadataBase resolves the relative URLs below, and the og:image that Next
// attaches from each route's opengraph-image, into absolute URLs. Crawlers
// fetch those from another origin, so relative paths would not resolve.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Adam Nielsen — Backend & Systems Engineering",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Adam Nielsen",
    locale: "en_US",
    url: "/",
    title: "Adam Nielsen — Backend & Systems Engineering",
    description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Browser integrations can add attributes to <html> before React hydrates.
    // Tolerate that root-only difference; descendants retain hydration checks.
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
