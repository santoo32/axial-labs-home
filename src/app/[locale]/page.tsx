import { Hero } from "@/sections/Hero/Hero";
import { Ticker } from "@/components/Ticker/Ticker";
import { Services } from "@/sections/Services/Services";
import { Pricing } from "@/sections/Pricing/Pricing";
import { About } from "@/sections/About/About";
import { Contact } from "@/sections/Contact/Contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Ticker />
      <Services />
      <Pricing />
      <About />
      <Contact locale={locale} />
    </main>
  );
}
