export function OutreachVisual() {
  return (
    <div
      className="visual visual-outreach"
      aria-label="Contextual Outreach prospect research and drafting workspace"
    >
      <div className="visual-topline">
        <span><i /> CONTEXTUAL OUTREACH / PROSPECT WORKSPACE</span>
        <span>RESEARCH · CONTACT · DRAFT</span>
      </div>
      <div className="outreach-shell">
        <aside className="outreach-nav">
          <strong>CO</strong>
          <span>Overview</span>
          <span className="is-active">Prospects</span>
          <span>Sequences</span>
          <span>Settings</span>
          <small>EXPLORATORY PROTOTYPE</small>
        </aside>
        <div className="outreach-workspace">
          <header>
            <div>
              <span>PROSPECT / 014</span>
              <h3>Northstar Energy</h3>
            </div>
            <b>RESEARCHED</b>
          </header>
          <div className="outreach-columns">
            <section className="outreach-intelligence">
              <p>COMPANY INTELLIGENCE</p>
              <div className="intelligence-card">
                <span>COMPANY SNAPSHOT</span>
                <strong>Grid software for distributed energy teams.</strong>
                <small>4 first-party sources · 3 external signals</small>
              </div>
              <div className="signal-list">
                <div><i>01</i><span>Expansion into two Nordic markets</span><b>RECENT</b></div>
                <div><i>02</i><span>New reporting requirements</span><b>RELEVANT</b></div>
              </div>
              <div className="contact-card">
                <span>ACTIVE CONTACT</span>
                <div><strong>Maya Lind</strong><small>Head of Operations</small></div>
                <b>3 HOOKS</b>
              </div>
            </section>
            <section className="outreach-draft">
              <p>PERSONALIZED DRAFT</p>
              <div className="draft-meta">
                <span>EMAIL · COLLECTED DATA</span>
                <b>EDITABLE</b>
              </div>
              <h4>Making distributed reporting easier</h4>
              <p>Hi Maya,</p>
              <p>
                Your Nordic expansion makes consistent operational reporting
                harder across teams. We recently helped a distributed service
                organization simplify a similar workflow.
              </p>
              <p>Would a short comparison be useful?</p>
              <div className="draft-context">
                <span>CONTEXT USED</span>
                <i>Research</i><i>Contact</i><i>Previous case</i><i>Voice</i>
              </div>
            </section>
            <aside className="outreach-chat">
              <p>REFINE</p>
              <div className="chat-message is-user">Make the opening more direct.</div>
              <div className="chat-message is-system">Opening revised. Company evidence retained.</div>
              <small>Human review required</small>
            </aside>
          </div>
        </div>
      </div>
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
