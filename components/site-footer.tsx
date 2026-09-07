import Link from "next/link";
import { contact } from "@/content/site";

// `home` renders the wordmark as plain text, since the homepage is already here.
export function SiteFooter({ home = false }: { home?: boolean }) {
  const wordmark = (
    <>
      Adam Nielsen <span className="footer-year">/ 2026</span>
    </>
  );

  return (
    <footer className="site-footer">
      {home ? <span>{wordmark}</span> : <Link href="/">{wordmark}</Link>}
      <ul className="footer-contact">
        <li>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>
        {contact.githubUrl && (
          <li>
            <a href={contact.githubUrl} target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
          </li>
        )}
        {contact.linkedinUrl && (
          <li>
            <a href={contact.linkedinUrl} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </li>
        )}
      </ul>
      <a href="#top">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
