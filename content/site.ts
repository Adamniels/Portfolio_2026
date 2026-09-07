// Canonical production origin. Used for metadataBase, Open Graph URLs, robots,
// and the sitemap. It must match the origin the site is actually served from:
// configure the registrar so the other of apex/www 301s here, or previews and
// canonical URLs will disagree.
export const siteUrl = "https://adamnielsdev.com";

// Contact details rendered in the site footer.
// Empty values are omitted rather than rendered as dead links.
export const contact = {
  email: "nielsenadam44@gmail.com",
  githubUrl: "https://github.com/Adamniels",
  linkedinUrl: "https://www.linkedin.com/in/adam-nielsen-5a333131a",
};
