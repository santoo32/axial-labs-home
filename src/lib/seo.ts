export const SITE_URL = "https://axiallabs.com";

export function buildAlternates(locale: string) {
  return {
    canonical: `${SITE_URL}/${locale}`,
    languages: {
      en: `${SITE_URL}/en`,
      es: `${SITE_URL}/es`,
      "x-default": `${SITE_URL}/es`,
    },
  };
}

export const OG_SIZE = { width: 1200, height: 630 };
