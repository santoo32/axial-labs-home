import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NavBar } from "@/components/NavBar/NavBar";
import { SITE_URL, buildAlternates } from "@/lib/seo";
import { SITE } from "@/content/site";

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
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
    <NextIntlClientProvider messages={messages}>
      <div className="page-axis-line" aria-hidden="true" />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <NavBar locale={locale} />
      {children}
    </NextIntlClientProvider>
  );
}
