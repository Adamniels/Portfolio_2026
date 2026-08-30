import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adam Nielsen — Software engineer",
  description:
    "Software engineer building real systems end to end: backend architecture, applied AI, and the product around them.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
