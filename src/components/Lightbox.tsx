import { useEffect, useId, useRef } from "react";
import type { Media } from "../content/types";
import { mediaAspectClass } from "../lib/media";
import { cx, padIndex } from "../lib/utils";
import { MediaSlot } from "./MediaSlot";

type LightboxProps = {
  items: Media[];
  index: number;
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({
  items,
  index,
  open,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const labelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const current = items[index];

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>("button"))
      : [];

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();

      if (event.key !== "Tab" || !focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open || !current) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelId}
      className="fixed inset-0 z-50 flex flex-col bg-bg"
    >
      <div className="flex items-center justify-between px-6 py-6 md:px-10 lg:px-16">
        <p id={labelId} className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
          {current.alt || "Media"}
        </p>
        <button
          ref={closeRef}
          type="button"
          className="min-h-11 px-2 text-meta font-medium uppercase tracking-[0.14em] text-muted"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 md:px-24">
        <MediaSlot
          type={current.src ? "still" : "placeholder"}
          media={current}
          className={cx(
            "max-h-[70vh] w-full max-w-5xl",
            mediaAspectClass(current, "aspect-[3/2]"),
          )}
        />
      </div>

      <div className="flex items-center justify-between px-6 py-6 md:px-10 lg:px-16">
        <button
          type="button"
          className="min-h-11 px-2 text-meta font-medium uppercase tracking-[0.14em] text-muted"
          aria-label="Previous image"
          onClick={onPrev}
        >
          Prev
        </button>
        <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
          {padIndex(index + 1)} / {padIndex(items.length)}
        </p>
        <button
          type="button"
          className="min-h-11 px-2 text-meta font-medium uppercase tracking-[0.14em] text-muted"
          aria-label="Next image"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
