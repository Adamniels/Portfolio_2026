export function PulseVisual() {
  const bars = [34, 48, 41, 62, 55, 78, 67, 84, 73, 91, 64, 70];

  return (
    <div className="visual visual-pulse" aria-label="Pulse forecasting interface">
      <div className="visual-topline">
        <span><i /> PULSE / LIVE MODEL</span>
        <span>STOCKHOLM · 14:32</span>
      </div>
      <div className="pulse-grid">
        <div className="forecast">
          <p>48H FORECAST</p>
          <strong>42.8</strong>
          <span>MWh predicted demand</span>
          <div className="chart" aria-hidden="true">
            {bars.map((height, index) => (
              <i
                key={index}
                style={{ height: `${height}%`, animationDelay: `${index * 45}ms` }}
              />
            ))}
          </div>
          <div className="axis"><span>NOW</span><span>+24H</span><span>+48H</span></div>
        </div>
        <div className="signals">
          <p>MODEL SIGNALS</p>
          <div><span>Temperature</span><b>−3.2°</b></div>
          <div><span>Grid pressure</span><b>Elevated</b></div>
          <div><span>Confidence</span><b>92.4%</b></div>
          <div className="pulse-alert">
            <small>DEMAND EVENT</small>
            <strong>Spike expected<br />tomorrow at 08:00</strong>
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

export function ProjectVisual({ slug }: { slug: string }) {
  return slug === "beacon" ? <BeaconVisual /> : <PulseVisual />;
}
