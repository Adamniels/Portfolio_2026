import {
  ProductScreenshot,
  ProductScreenshotCarousel,
} from "@/components/product-screenshot-carousel";

const outreachScreenshots: ProductScreenshot[] = [
  {
    src: "/projects/contextual-outreach/Screenshot%202026-07-19%20at%2011.31.50.png",
    alt: "Contextual Outreach email workspace showing an AI-generated Swedish draft for a prospect beside the conversational refinement panel.",
    label: "Draft",
    caption:
      "Draft — review generated outreach beside the conversational refinement workspace.",
  },
  {
    src: "/projects/contextual-outreach/Screenshot%202026-07-19%20at%2011.27.41.png",
    alt: "Contextual Outreach user settings showing separate configurable prompts for email and LinkedIn outreach.",
    label: "Voice",
    caption:
      "Voice — maintain channel-specific instructions for email and LinkedIn outreach.",
  },
  {
    src: "/projects/contextual-outreach/Screenshot%202026-07-19%20at%2011.27.24.png",
    alt: "Contextual Outreach company settings showing positioning fields and a section for previous project cases.",
    label: "Company",
    caption:
      "Company context — store positioning and previous cases as reusable generation inputs.",
  },
  {
    src: "/projects/contextual-outreach/Screenshot%202026-07-19%20at%2011.33.06.png",
    alt: "Contextual Outreach prospect list showing search, filtering, sorting, and several prospect records.",
    label: "Prospects",
    caption:
      "Prospects — manage manually created and CRM-sourced targets from one workspace.",
  },
];

// Screenshots of the running Project Wiki web app.
// Files live in /public/projects/project-wiki/ as wiki-screenshot1..3.png.
const wikiScreenshots: ProductScreenshot[] = [
  {
    src: "/projects/project-wiki/wiki-screenshot1.png",
    alt: "The Project Wiki browser showing the business rule 'Audit commit uncertainty recovery' as a document, with a contents sidebar of domains, a provenance panel linking back to the git source it was distilled from, and a relationships panel.",
    label: "Browse",
    caption:
      "Browse — a concept reads as a short chapter, with its provenance and relationships beside it.",
  },
  {
    src: "/projects/project-wiki/wiki-screenshot2.png",
    alt: "The Project Wiki admin console on the Guided init screen, showing a completed run with tiles for nodes created, edges written, and domains created, and a step-by-step log of the ingest, distil, organise, divergence, and review stages.",
    label: "Guided init",
    caption:
      "Guided init — the admin console runs ingest, distil, organise, and review, pausing only for a real decision.",
  },
  {
    src: "/projects/project-wiki/wiki-screenshot3.png",
    alt: "The Project Wiki review queue showing a contradiction between two concepts about a retention period, each with its text and git provenance, an engine confidence score, and record or reject actions.",
    label: "Review",
    caption:
      "Review — a flagged contradiction between two concepts, with both statements, their sources, and the engine's confidence.",
  },
];

export function OutreachVisual() {
  return (
    <div
      className="visual visual-outreach"
      aria-label="Contextual Outreach product screenshots"
    >
      <div className="visual-topline">
        <span><i /> CONTEXTUAL OUTREACH / PRODUCT WALKTHROUGH</span>
        <span>04 IMPLEMENTED VIEWS</span>
      </div>
      <ProductScreenshotCarousel
        screenshots={outreachScreenshots}
        regionLabel="Contextual Outreach product walkthrough"
      />
    </div>
  );
}

export function WikiVisual() {
  return (
    <div
      className="visual visual-wiki"
      aria-label="Project Wiki web app screenshots"
    >
      <div className="visual-topline">
        <span><i /> PROJECT WIKI / RUNNING APP</span>
        <span>{String(wikiScreenshots.length).padStart(2, "0")} VIEWS</span>
      </div>
      <ProductScreenshotCarousel
        screenshots={wikiScreenshots}
        regionLabel="Project Wiki browser walkthrough"
      />
    </div>
  );
}

export function VendGoVisual() {
  return (
    <div className="visual visual-vend" aria-label="Vend and Go mobile customer flow">
      <div className="visual-topline">
        <span><i /> VEND &amp; GO / MOBILE FLOW</span>
        <span>SELECT · BROWSE · CHECKOUT</span>
      </div>
      <div className="vend-flow">
        <figure className="phone-screenshot">
          <figcaption><span>01</span> Select a machine</figcaption>
          <img
            src="/projects/vend-and-go/select_machine.png"
            alt="Vend and Go screen for selecting a nearby vending machine"
          />
        </figure>
        <div className="flow-arrow">→</div>
        <figure className="phone-screenshot">
          <figcaption><span>02</span> Browse offers</figcaption>
          <img
            src="/projects/vend-and-go/home.png"
            alt="Vend and Go home screen showing machine selection, instant buy, assortment, and offers"
          />
        </figure>
        <div className="flow-arrow">→</div>
        <figure className="phone-screenshot">
          <figcaption><span>03</span> Checkout and points</figcaption>
          <img
            src="/projects/vend-and-go/checkout_points.png"
            alt="Vend and Go order confirmation showing the charge, discount, and loyalty points earned"
          />
        </figure>
      </div>
    </div>
  );
}

export function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "contextual-outreach") return <OutreachVisual />;
  if (slug === "project-wiki") return <WikiVisual />;
  if (slug === "vend-and-go") return <VendGoVisual />;
  return null;
}
