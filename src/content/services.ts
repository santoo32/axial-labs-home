export const ALL_SERVICE_IDS = ["s01", "s02", "s03", "s04"] as const;

export type ServiceId = (typeof ALL_SERVICE_IDS)[number];
