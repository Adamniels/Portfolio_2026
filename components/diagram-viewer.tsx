"use client";

import { createPortal } from "react-dom";
import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";

export type DiagramItem = {
  src: string;
  alt: string;
  caption: string;
  label: string;
  theme?: "light" | "dark";
};

type DiagramModalProps = {
  diagrams: DiagramItem[];
  activeIndex: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

function DiagramModal({
  diagrams,
  activeIndex,
  onChange,
  onClose,
}: DiagramModalProps) {
  const modal = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onChange((activeIndex - 1 + diagrams.length) % diagrams.length);
      }
      if (event.key === "ArrowRight") {
        onChange((activeIndex + 1) % diagrams.length);
      }
      if (event.key === "Tab") {
        const focusable = Array.from(
          modal.current?.querySelectorAll<HTMLButtonElement>("button") ?? [],
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [activeIndex, diagrams.length, onChange, onClose]);

  if (activeIndex === null || typeof document === "undefined") return null;

  const activeDiagram = diagrams[activeIndex];
  const hasMultiple = diagrams.length > 1;

  return createPortal(
    <div
      ref={modal}
      className={`diagram-modal is-${activeDiagram.theme ?? "dark"}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${activeDiagram.label} diagram`}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="diagram-modal-panel">
        <header className="diagram-modal-header">
          <div>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(diagrams.length).padStart(2, "0")}
            </span>
            <strong>{activeDiagram.label}</strong>
          </div>
          <button ref={closeButton} type="button" onClick={onClose}>
            Close ×
          </button>
        </header>

        <div className={`diagram-modal-stage is-${activeDiagram.theme ?? "dark"}`}>
          <img src={activeDiagram.src} alt={activeDiagram.alt} />
        </div>

        <footer className="diagram-modal-footer">
          <p>{activeDiagram.caption}</p>
          {hasMultiple && (
            <div>
              <button
                type="button"
                onClick={() =>
                  onChange(
                    (activeIndex - 1 + diagrams.length) % diagrams.length,
                  )
                }
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={() => onChange((activeIndex + 1) % diagrams.length)}
              >
                Next →
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>,
    document.body,
  );
}

export function DiagramViewer({ diagram }: { diagram: DiagramItem }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <button
        className="diagram-viewer"
        type="button"
        onClick={() => setActiveIndex(0)}
        aria-label={`Open ${diagram.label} diagram`}
      >
        <img src={diagram.src} alt={diagram.alt} />
        <span>Open full diagram ↗</span>
      </button>
      <DiagramModal
        diagrams={[diagram]}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}

export function DiagramCarousel({
  title,
  diagrams,
}: {
  title: string;
  diagrams: DiagramItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const scrollFrame = useRef<number | null>(null);
  const carouselId = useId();

  const moveTo = (index: number) => {
    const nextIndex = (index + diagrams.length) % diagrams.length;
    const element = track.current;
    if (!element) return;

    setActiveIndex(nextIndex);
    element.scrollTo({
      left: nextIndex * element.clientWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (scrollFrame.current !== null) {
      cancelAnimationFrame(scrollFrame.current);
    }

    scrollFrame.current = requestAnimationFrame(() => {
      const element = track.current;
      if (!element) return;

      const nextIndex = Math.round(element.scrollLeft / element.clientWidth);
      setActiveIndex(Math.max(0, Math.min(diagrams.length - 1, nextIndex)));
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveTo(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveTo(activeIndex + 1);
    }
  };

  useEffect(
    () => () => {
      if (scrollFrame.current !== null) {
        cancelAnimationFrame(scrollFrame.current);
      }
    },
    [],
  );

  return (
    <>
      <div
        className="diagram-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="diagram-carousel-header">
          <span>{title}</span>
          <span>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(diagrams.length).padStart(2, "0")}
          </span>
        </div>

        <div className="diagram-carousel-tabs" role="tablist">
          {diagrams.map((diagram, index) => (
            <button
              type="button"
              role="tab"
              id={`${carouselId}-tab-${index}`}
              aria-controls={`${carouselId}-slide-${index}`}
              aria-selected={activeIndex === index}
              key={diagram.src}
              onClick={() => moveTo(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {diagram.label}
            </button>
          ))}
        </div>

        <div
          className="diagram-carousel-track"
          ref={track}
          onScroll={handleScroll}
        >
          {diagrams.map((diagram, index) => (
            <figure
              className="diagram-carousel-slide"
              id={`${carouselId}-slide-${index}`}
              role="tabpanel"
              aria-labelledby={`${carouselId}-tab-${index}`}
              aria-hidden={activeIndex !== index}
              aria-label={`${index + 1} of ${diagrams.length}`}
              key={diagram.src}
            >
              <button
                type="button"
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setModalIndex(index)}
                aria-label={`Open ${diagram.label} diagram`}
              >
                <img src={diagram.src} alt={diagram.alt} loading="lazy" />
                <span>Open full diagram ↗</span>
              </button>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {diagram.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="diagram-carousel-controls">
          <button type="button" onClick={() => moveTo(activeIndex - 1)}>
            ← Previous
          </button>
          <div aria-hidden="true">
            {diagrams.map((diagram, index) => (
              <i
                className={activeIndex === index ? "is-active" : ""}
                key={diagram.src}
              />
            ))}
          </div>
          <button type="button" onClick={() => moveTo(activeIndex + 1)}>
            Next →
          </button>
        </div>
      </div>

      <DiagramModal
        diagrams={diagrams}
        activeIndex={modalIndex}
        onChange={setModalIndex}
        onClose={() => setModalIndex(null)}
      />
    </>
  );
}
