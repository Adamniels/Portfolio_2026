import type { MetadataRoute } from "next";
import { currentlyWorkingOn } from "@/content/currently-working-on";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/site";

// Generated from the project lists so the sitemap cannot drift from the routes
// that actually exist. lastModified is the build time.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/smaller-projects",
    ...projects.map(({ slug }) => `/projects/${slug}`),
    ...currentlyWorkingOn.map(({ slug }) => `/currently-working-on/${slug}`),
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
