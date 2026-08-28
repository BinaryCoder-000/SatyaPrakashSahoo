import { useEffect, useState } from "react";

/**
 * Active homepage section from the viewport center marker, not intersectionRatio.
 * Tall sections (Selected Work) never fill a shrunk observer root enough to
 * cross a ratio threshold; About/Contact are short enough that they did.
 */
export function useActiveSection(
  ids: readonly string[],
  enabled: boolean,
): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    if (!enabled) return;

    const list = key.split(",").filter(Boolean);

    function update() {
      const viewportMarker = window.innerHeight * 0.5;
      let next: string | null = null;

      for (const id of list) {
        const section = document.getElementById(id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportMarker && rect.bottom >= viewportMarker) {
          next = id;
          break;
        }
      }

      setActive((current) => (current === next ? current : next));
    }

    update();
    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    const root = document.getElementById("main") ?? document.body;
    const mutations = new MutationObserver(update);
    mutations.observe(root, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mutations.disconnect();
    };
  }, [enabled, key]);

  return enabled ? active : null;
}
