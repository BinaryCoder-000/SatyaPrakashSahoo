import { Link } from "react-router";
import type { Media } from "../content/types";
import { MediaSlot } from "./MediaSlot";

type ChapterFilmProps = {
  cover?: Media;
};

export function ChapterFilm({ cover }: ChapterFilmProps) {
  return (
    <section className="border-t border-rule bg-cinema">
      <Link to="/films" className="block">
        <div className="relative">
          <MediaSlot
            type="video"
            media={cover}
            label={cover?.placeholder ?? "FILM"}
            className="aspect-video min-h-56 border-0 bg-cinema md:min-h-[28rem]"
            play
          />
          <h2 className="pointer-events-none absolute bottom-6 left-6 z-20 max-w-[8ch] font-medium tracking-[-0.06em] leading-[0.8] text-[clamp(3.5rem,10vw,8.75rem)] md:bottom-12 md:left-10 lg:left-16">
            Films
          </h2>
        </div>
        <p className="max-w-md px-6 py-8 text-base leading-[1.65] text-muted md:px-10 md:pb-20 md:text-[17px] lg:px-16">
          I like turning stories into frames and films.
        </p>
      </Link>
    </section>
  );
}
