import { motion, useReducedMotion } from "framer-motion";
import { site } from "../content/site";
import { heroFade, heroLine, heroMedia, heroNameStagger } from "../lib/motion";
import { MediaSlot } from "./MediaSlot";
import { WaterWaveBackground } from "./WaterWaveBackground";

const names = site.name.split(" ");

function HeroName({ reduce }: { reduce: boolean }) {
  const lineClasses = (index: number) =>
    index === 1
      ? "-mt-1 block pl-[12%] lg:-mt-2 lg:pl-[16%]"
      : index === 2
        ? "relative -mt-1 block pl-[22%] lg:-mt-2 lg:pl-[38%]"
        : "block";

  return (
    <motion.span
      className="block"
      variants={heroNameStagger}
      initial={reduce ? "show" : "hidden"}
      animate="show"
    >
      {names.map((part, index) => (
        <motion.span key={part} className={lineClasses(index)} variants={heroLine(reduce)}>
          {part}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden px-6 pb-16 pt-28 md:px-10 lg:min-h-[100svh] lg:px-16 lg:pb-20 lg:pt-32">
      <WaterWaveBackground />

      <div
        aria-hidden="true"
        className="hero-name-wave pointer-events-none absolute inset-0 z-30 px-6 pb-16 pt-28 md:px-10 lg:px-16 lg:pb-20 lg:pt-32"
      >
        <div className="font-medium tracking-[-0.05em] leading-[0.82] text-[clamp(3.5rem,12vw,4.5rem)] text-[#201c0d] lg:text-[clamp(7.5rem,8vw,10rem)]">
          <HeroName reduce={reduce} />
        </div>
      </div>

      <h1 className="relative z-20 order-1 font-medium tracking-[-0.05em] leading-[0.82] text-[clamp(3.5rem,12vw,4.5rem)] lg:text-[clamp(7.5rem,8vw,10rem)]">
        <HeroName reduce={reduce} />
      </h1>

      <motion.div
        className="relative z-10 order-3 ml-[14%] mt-8 w-[86%] origin-center overflow-hidden lg:absolute lg:right-16 lg:top-[22%] lg:order-2 lg:ml-0 lg:mt-0 lg:w-[46%]"
        variants={heroMedia(reduce)}
        initial={reduce ? "show" : "hidden"}
        animate="show"
      >
        <MediaSlot
          type={site.hero.type}
          label="HERO PHOTO"
          className="aspect-[4/5] min-h-0 bg-cinema"
          priority
          play={false}
        />
      </motion.div>

      <motion.div
        className="relative z-20 order-2 mt-10 max-w-56 lg:order-3 lg:mt-12"
        variants={heroFade(0.55, reduce)}
        initial={reduce ? "show" : "hidden"}
        animate="show"
      >
        <p className="text-meta font-medium uppercase tracking-[0.14em] text-muted">
          {site.roles[0]}
        </p>
        <p className="mt-2 text-meta font-medium uppercase tracking-[0.14em] text-muted">
          {site.roles[1]}
        </p>
      </motion.div>

      <motion.p
        className="relative z-20 order-4 mt-10 font-medium tracking-[-0.04em] leading-[0.9] text-[clamp(2.25rem,8vw,2.5rem)] lg:ml-[22%] lg:mt-28 lg:text-[clamp(3rem,5vw,4.5rem)]"
        variants={heroFade(0.85, reduce)}
        initial={reduce ? "show" : "hidden"}
        animate="show"
      >
        Visual{" "}
        <span className="font-editorial italic font-normal">storyteller</span>
      </motion.p>
    </section>
  );
}
