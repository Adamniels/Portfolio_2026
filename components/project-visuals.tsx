import { ProductScreenshotCarousel } from "@/components/product-screenshot-carousel";

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
      <ProductScreenshotCarousel />
    </div>
  );
}

export function BeaconVisual() {
  return (
    <div className="visual visual-beacon" aria-label="Beacon distributed trace interface">
      <div className="visual-topline">
        <span><i /> BEACON / TRACE 08F2</span>
        <span>INCIDENT MODE</span>
      </div>
      <div className="beacon-grid">
        <div className="trace-map">
          <p>EVENT JOURNEY</p>
          <div className="trace-path">
            <div className="trace-node ok"><span>01</span><b>API GATEWAY</b><small>42ms</small></div>
            <div className="trace-line" />
            <div className="trace-node ok"><span>02</span><b>ORDER CREATED</b><small>118ms</small></div>
            <div className="trace-line failed" />
            <div className="trace-node error"><span>03</span><b>PAYMENT WORKER</b><small>TIMEOUT</small></div>
            <div className="trace-line muted" />
            <div className="trace-node muted"><span>04</span><b>FULFILMENT</b><small>SKIPPED</small></div>
          </div>
        </div>
        <div className="trace-detail">
          <p>ROOT CAUSE</p>
          <span className="severity">HIGH / RETRY EXHAUSTED</span>
          <h3>Provider response exceeded the 2,000ms limit.</h3>
          <div className="code-lines">
            <span><i>01</i> attempt: 3</span>
            <span><i>02</i> elapsed_ms: 2014</span>
            <span><i>03</i> region: eu-north-1</span>
          </div>
        </div>
      </div>
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
  if (slug === "beacon") return <BeaconVisual />;
  if (slug === "vend-and-go") return <VendGoVisual />;
  return null;
}
