import { Link } from "react-router";
import type { Media } from "../content/types";
import { MediaSlot } from "./MediaSlot";

type ChapterPhotoProps = {
  cover?: Media;
};

export function ChapterPhoto({ cover }: ChapterPhotoProps) {
  return (
    <section className="border-t border-rule">
      <Link
        to="/photography"
        className="relative block min-h-0 px-6 py-16 md:px-10 md:py-24 lg:min-h-[45rem] lg:px-16 lg:py-32"
      >
        <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">01</p>
        <h2 className="relative z-20 mt-3 max-w-[10ch] font-medium tracking-[-0.06em] leading-[0.8] text-[clamp(3.5rem,10vw,8.75rem)]">
          Photo
          <br />
          graphy
        </h2>
        <div className="relative z-10 mt-8 w-full md:ml-[40%] md:w-3/5 lg:-mt-20 lg:ml-[46%] lg:w-[48%]">
          <MediaSlot
            type={cover?.src ? "still" : "placeholder"}
            media={cover}
            label={cover?.placeholder ?? "PHOTO"}
            className="aspect-[4/5] min-h-0"
          />
        </div>
        <p className="relative z-20 mt-10 max-w-xs text-base leading-[1.65] text-muted md:text-[17px] lg:mt-12">
          People, places, movement and details.
        </p>
        <span className="mt-6 inline-flex min-h-11 items-center text-meta font-medium uppercase tracking-[0.14em] text-muted">
          Enter stills →
        </span>
      </Link>
    </section>
  );
}
