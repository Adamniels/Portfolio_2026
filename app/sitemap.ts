import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/site";

// Generated from the project list so the sitemap cannot drift from the routes
// that actually exist. lastModified is the build time.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/smaller-projects",
    ...projects.map(({ slug }) => `/projects/${slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
