import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import { SITE } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logos/axial-icon.svg`,
  sameAs: [SITE.social.x, SITE.social.github],
  contactPoint: {
    "@type": "ContactPoint",
    email: SITE.email,
    contactType: "customer support",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") ?? routing.defaultLocale;

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
