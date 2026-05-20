/** Axial easing as a CSS cubic-bezier string */
export const EASE_AXIAL = "cubic-bezier(0.32, 0.72, 0, 1)";

/** Axial easing as a number tuple for motion/react */
export const EASE_AXIAL_TUPLE = [0.32, 0.72, 0, 1] as const;

/** ease-out tuple — used for entering elements */
export const EASE_OUT_TUPLE = [0, 0, 0.35, 1] as const;

export const DURATION = {
  instant: 0.12,
  ui: 0.24,
  hero: 0.6,
  epic: 1.2,
} as const;

export const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.ui, delay, ease: EASE_AXIAL_TUPLE },
  },
});

export const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.ui, delay, ease: EASE_AXIAL_TUPLE },
  },
});

export const drawDown = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: DURATION.hero, ease: EASE_OUT_TUPLE },
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});
