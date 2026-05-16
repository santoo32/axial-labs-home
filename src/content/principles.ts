export const PRINCIPLE_KEYS = ["p01", "p02", "p03", "p04", "p05"] as const;
export type PrincipleKey = (typeof PRINCIPLE_KEYS)[number];
