import type { Media } from "../content/types";
import { mediaAspectClass } from "../lib/media";
import { cx } from "../lib/utils";
import { MediaSlot } from "./MediaSlot";

type GalleryProps = {
  items: Media[];
  onSelect?: (index: number) => void;
};

const layouts = [
  "md:col-span-12",
  "md:col-span-5",
  "md:col-span-6 md:col-start-7 md:mt-20",
  "md:col-span-10 md:col-start-2",
] as const;

const fallbackAspect = ["aspect-[3/2]", "aspect-[4/5]", "aspect-[3/2]", "aspect-[2.39/1]"] as const;

export function Gallery({ items, onSelect }: GalleryProps) {
  if (!items.length) return null;

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-x-4 md:gap-y-6">
      {items.map((item, index) => (
        <li key={`${item.alt}-${index}`} className={cx(layouts[index % layouts.length])}>
          {onSelect ? (
            <button
              type="button"
              className="block w-full min-h-11 text-left"
              onClick={() => onSelect(index)}
              aria-label={`Open ${item.alt || "image"}`}
            >
              <MediaSlot
                type={item.src ? "still" : "placeholder"}
                media={item}
                className={cx(
                  "min-h-0",
                  mediaAspectClass(item, fallbackAspect[index % fallbackAspect.length]),
                )}
              />
            </button>
          ) : (
            <MediaSlot
              type={item.src ? "still" : "placeholder"}
              media={item}
              className={cx(
                "min-h-0",
                mediaAspectClass(item, fallbackAspect[index % fallbackAspect.length]),
              )}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
