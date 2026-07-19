"use client";

import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ProductScreenshot = {
  src: string;
  alt: string;
  label: string;
  caption: string;
};

const screenshots: ProductScreenshot[] = [
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

function ScreenshotModal({
  activeIndex,
  onChange,
  onClose,
}: {
  activeIndex: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onChange((activeIndex - 1 + screenshots.length) % screenshots.length);
      }
      if (event.key === "ArrowRight") {
        onChange((activeIndex + 1) % screenshots.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, onChange, onClose]);

  if (activeIndex === null || typeof document === "undefined") return null;

  const screenshot = screenshots[activeIndex];

  return createPortal(
    <div
      className="diagram-modal is-light product-screenshot-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${screenshot.label} product screenshot`}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="diagram-modal-panel">
        <header className="diagram-modal-header">
          <div>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(screenshots.length).padStart(2, "0")}
            </span>
            <strong>{screenshot.label}</strong>
          </div>
          <button ref={closeButton} type="button" onClick={onClose}>
            Close ×
          </button>
        </header>
        <div className="diagram-modal-stage is-light">
          <img src={screenshot.src} alt={screenshot.alt} />
        </div>
        <footer className="diagram-modal-footer">
          <p>{screenshot.caption}</p>
          <div>
            <button
              type="button"
              onClick={() =>
                onChange(
                  (activeIndex - 1 + screenshots.length) % screenshots.length,
                )
              }
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={() => onChange((activeIndex + 1) % screenshots.length)}
            >
              Next →
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

export function ProductScreenshotCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const scrollFrame = useRef<number | null>(null);
  const carouselId = useId();

  const moveTo = (index: number) => {
    const nextIndex = (index + screenshots.length) % screenshots.length;
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
      setActiveIndex(Math.max(0, Math.min(screenshots.length - 1, nextIndex)));
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
        className="product-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Contextual Outreach product walkthrough"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="product-carousel-tabs" role="tablist">
          {screenshots.map((screenshot, index) => (
            <button
              type="button"
              role="tab"
              id={`${carouselId}-tab-${index}`}
              aria-controls={`${carouselId}-slide-${index}`}
              aria-selected={activeIndex === index}
              key={screenshot.src}
              onClick={() => moveTo(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {screenshot.label}
            </button>
          ))}
        </div>

        <div
          className="product-carousel-track"
          ref={track}
          onScroll={handleScroll}
        >
          {screenshots.map((screenshot, index) => (
            <figure
              className="product-carousel-slide"
              id={`${carouselId}-slide-${index}`}
              role="tabpanel"
              aria-labelledby={`${carouselId}-tab-${index}`}
              aria-hidden={activeIndex !== index}
              key={screenshot.src}
            >
              <button
                type="button"
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => setModalIndex(index)}
                aria-label={`Open ${screenshot.label} product screenshot`}
              >
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
                <span>Open full image ↗</span>
              </button>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {screenshot.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="product-carousel-controls">
          <button type="button" onClick={() => moveTo(activeIndex - 1)}>
            ← Previous
          </button>
          <div aria-hidden="true">
            {screenshots.map((screenshot, index) => (
              <i
                className={activeIndex === index ? "is-active" : ""}
                key={screenshot.src}
              />
            ))}
          </div>
          <button type="button" onClick={() => moveTo(activeIndex + 1)}>
            Next →
          </button>
        </div>
      </div>

      <ScreenshotModal
        activeIndex={modalIndex}
        onChange={setModalIndex}
        onClose={() => setModalIndex(null)}
      />
    </>
  );
}
