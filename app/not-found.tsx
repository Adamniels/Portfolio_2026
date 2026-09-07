import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <main className="site-shell" id="top">
      <nav className="nav" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="Adam Nielsen, home">
          <span className="monogram" aria-hidden="true">an.</span> Adam Nielsen
        </Link>
        <Link className="nav-work" href="/#work">Selected work <span aria-hidden="true">↗</span></Link>
      </nav>

      <header className="case-hero">
        <p className="eyebrow">Error 404</p>
        <h1>This page doesn’t exist.</h1>
        <p>
          The link may be out of date, or the page may have moved. Everything
          currently published is reachable from the two indexes below.
        </p>
        <div className="notfound-actions">
          <Link className="text-link" href="/#work">Selected projects <span aria-hidden="true">→</span></Link>
          <Link className="text-link" href="/smaller-projects">Smaller projects <span aria-hidden="true">→</span></Link>
        </div>
      </header>

      <SiteFooter />
    </main>
  );
}
