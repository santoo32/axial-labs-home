export const BRAND_SERVICE_IDS = ["b01", "b02", "b03"] as const;
export const SOFTWARE_SERVICE_IDS = ["i01", "i02", "i03"] as const;
export const ALL_SERVICE_IDS = [...BRAND_SERVICE_IDS, ...SOFTWARE_SERVICE_IDS] as const;

export type ServiceId = (typeof ALL_SERVICE_IDS)[number];
