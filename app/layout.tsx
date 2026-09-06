import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adam Nielsen — Backend & Systems Engineering",
  description:
    "Selected projects by Adam Nielsen, an M.Sc. Information Technology student at Uppsala University focused on backend systems, software architecture, and applied AI.",
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
