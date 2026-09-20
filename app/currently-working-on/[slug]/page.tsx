import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { currentlyWorkingOn, getCurrentlyWorkingOn } from "@/content/currently-working-on";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return currentlyWorkingOn.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = getCurrentlyWorkingOn((await params).slug);
  if (!entry) return { title: "Currently working on" };

  const title = `${entry.title} — Adam Nielsen`;
  const url = `/currently-working-on/${entry.slug}`;

  return {
    title,
    description: entry.hook,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description: entry.hook, url },
  };
}

export default async function CurrentlyWorkingOnPage({ params }: Props) {
  const entry = getCurrentlyWorkingOn((await params).slug);
  if (!entry) notFound();

  return (
    <main className="site-shell case-page" id="top">
      <a className="skip-link" href="#overview">Skip to content</a>
      <nav className="nav" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Adam Nielsen, home">
          <span className="monogram" aria-hidden="true">an.</span> Adam Nielsen
        </Link>
        <Link className="nav-work" href="/#currently-working-on">All projects <span aria-hidden="true">↗</span></Link>
      </nav>

      <header className="case-hero">
        <Link className="breadcrumb" href="/#currently-working-on">← Currently working on</Link>
        <div className="case-hero-meta">
          <span>Side project</span><span>{entry.status}</span>
        </div>
        <h1>{entry.title}</h1>
        <p>{entry.hook}</p>
        <ul className="technology-list" aria-label="Technologies and focus">
          {entry.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </header>

      <figure className="cwo-banner">
        <img src={entry.bannerImage.src} alt={entry.bannerImage.alt} loading="eager" />
      </figure>

      <section className="cwo-intro" id="overview" aria-label="About the project">
        {entry.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>

      <section className="cwo-gallery" aria-label={`${entry.title} images`}>
        <div className="cwo-gallery-group">
          <h3>Main menu</h3>
          <figure className="cwo-gallery-hero">
            <img src={entry.menuImage.src} alt={entry.menuImage.alt} loading="lazy" />
            <figcaption>{entry.menuImage.caption}</figcaption>
          </figure>
        </div>
        <div className="cwo-gallery-group">
          <h3>Mini games</h3>
          <div className="cwo-gallery-thumbs">
            {entry.miniGameImages.map((image) => (
              <figure key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
