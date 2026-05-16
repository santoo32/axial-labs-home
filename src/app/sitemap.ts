import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { es: `${SITE_URL}/es` } },
    },
    {
      url: `${SITE_URL}/es`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: `${SITE_URL}/en` } },
    },
  ];
}
