"use client";

import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type ProductScreenshot = {
  src: string;
  alt: string;
  label: string;
  caption: string;
};

function ScreenshotModal({
  screenshots,
  activeIndex,
  onChange,
  onClose,
}: {
  screenshots: ProductScreenshot[];
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
  }, [activeIndex, onChange, onClose, screenshots.length]);

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

export function ProductScreenshotCarousel({
  screenshots,
  regionLabel,
}: {
  screenshots: ProductScreenshot[];
  regionLabel: string;
}) {
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
        aria-label={regionLabel}
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
        screenshots={screenshots}
        activeIndex={modalIndex}
        onChange={setModalIndex}
        onClose={() => setModalIndex(null)}
      />
    </>
  );
}
