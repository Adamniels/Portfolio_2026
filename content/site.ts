// Canonical production origin. Used for metadataBase, Open Graph URLs, robots,
// and the sitemap. It must match the origin the site is actually served from,
// so the apex is set to 301 here in the Vercel project's domain settings.
// www is primary because the DNS spec forbids CNAME on an apex: the subdomain
// can be a CNAME, which lets Vercel's CDN steer traffic instead of pinning an
// IP. If this and the served origin disagree, canonical URLs point at a host
// that only redirects.
export const siteUrl = "https://www.adamnielsdev.com";

// Contact details rendered in the site footer.
// Empty values are omitted rather than rendered as dead links.
export const contact = {
  email: "nielsenadam44@gmail.com",
  githubUrl: "https://github.com/Adamniels",
  linkedinUrl: "https://www.linkedin.com/in/adam-nielsen-5a333131a",
};
