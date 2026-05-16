/** Axial easing as a CSS cubic-bezier string */
export const EASE_AXIAL = "cubic-bezier(0.32, 0.72, 0, 1)";

/** Axial easing as a number tuple for motion/react */
export const EASE_AXIAL_TUPLE = [0.32, 0.72, 0, 1] as const;

export const DURATION = {
  instant: 0.12,
  ui: 0.24,
  hero: 0.6,
  epic: 1.2,
} as const;
