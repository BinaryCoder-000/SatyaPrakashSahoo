import type { Transition, Variants } from "framer-motion";

export const easeOutExpo: Transition["ease"] = [0.16, 1, 0.3, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
};

export const overlayMenu: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.2, ease: easeOutExpo },
  },
};

export const heroNameStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.08 },
  },
};

export function heroLine(reduce: boolean): Variants {
  return {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce ? { duration: 0 } : { duration: 0.7, ease: easeOutExpo },
    },
  };
}

export function heroFade(delay: number, reduce: boolean): Variants {
  return {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.7, delay, ease: easeOutExpo },
    },
  };
}

export function heroMedia(reduce: boolean): Variants {
  return {
    hidden: reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 },
    show: {
      opacity: 1,
      scale: 1,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.7, delay: 0.5, ease: easeOutExpo },
    },
  };
}

export const coverHover = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.7, ease: easeOutExpo } },
};

export const captionHover = {
  rest: { opacity: 0.55, y: 6 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeOutExpo } },
};

export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
};

export const mediaEnter: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
};

export const nextReveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOutExpo },
  },
};
