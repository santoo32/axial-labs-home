import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NavBar } from "@/components/NavBar/NavBar";
import { SITE_URL, buildAlternates } from "@/lib/seo";
import { SITE } from "@/content/site";
import "../globals.css";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const heading = t("heading");
  const description = t("sub");

  return {
    title: {
      template: "%s | Axial Labs",
      default: `Axial Labs — ${heading}`,
    },
    description,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: `Axial Labs — ${heading}`,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: SITE.name,
      locale: locale === "es" ? "es_419" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@axiallabs",
      creator: "@axiallabs",
    },
    alternates: buildAlternates(locale),
    themeColor: "#0A0A0B",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <NavBar locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
