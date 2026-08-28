import { Link } from "react-router";
import { site } from "../content/site";
import { MediaSlot } from "./MediaSlot";

export function AboutStrip() {
  return (
    <section id="about" className="relative scroll-mt-28 border-t border-rule px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-36">
      <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">About</p>
      <h2 className="relative z-20 mt-4 max-w-[10ch] font-medium tracking-[-0.05em] leading-[0.85] text-[clamp(2.75rem,8vw,6rem)]">
        I see
        <br />
        the world
        <br />
        in <span className="font-editorial italic font-normal">frames.</span>
      </h2>
      <div className="relative z-10 mt-10 w-[70%] md:absolute md:right-10 md:top-28 md:mt-0 md:w-[36%] lg:right-20 lg:w-[32%]">
        <MediaSlot
          type="placeholder"
          label="PORTRAIT"
          className="aspect-[3/4] min-h-0"
        />
      </div>
      <p className="relative z-20 mt-10 max-w-md text-base leading-[1.65] text-muted md:mt-16 md:max-w-[46%] md:text-[17px]">
        {site.bio}
      </p>
      <Link
        to="/about"
        className="relative z-20 mt-6 inline-flex min-h-11 items-center text-meta font-medium uppercase tracking-[0.14em] text-muted"
      >
        About →
      </Link>
    </section>
  );
}
