import { Hero } from "@/sections/Hero/Hero";
import { Services } from "@/sections/Services/Services";
import { About } from "@/sections/About/About";
import { Contact } from "@/sections/Contact/Contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Contact locale={locale} />
    </main>
  );
}
