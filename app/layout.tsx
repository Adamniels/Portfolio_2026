import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adam Nielsen — Software Engineer & Data Scientist",
  description:
    "Portfolio concept for Adam Nielsen, a software engineer and data science student.",
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
