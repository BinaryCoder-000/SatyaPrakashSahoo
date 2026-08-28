import { useEffect, useRef, useState } from "react";

type HideOnScrollOptions = {
  enabled?: boolean;
  threshold?: number;
  topOffset?: number;
  interacting?: boolean;
};

/**
 * Hide navbar while scrolling down.
 * Show navbar immediately while scrolling up.
 */
export function useHideOnScroll({
  enabled = true,
  threshold = 10,
  topOffset = 32,
  interacting = false,
}: HideOnScrollOptions = {}): boolean {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setHidden(false);
      return;
    }

    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y <= topOffset || interacting) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      if (Math.abs(delta) < threshold) {
        return;
      }

      if (delta > 0) {
        // Scrolling down.
        setHidden(true);
      } else {
        // Scrolling up.
        setHidden(false);
      }

      lastY.current = y;
    };

    const onScroll = () => {
      if (frame.current !== null) return;

      frame.current = window.requestAnimationFrame(() => {
        update();
        frame.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);

      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };
  }, [enabled, interacting, threshold, topOffset]);

  if (!enabled || interacting) {
    return false;
  }

  return hidden;
}