import { getTranslations } from "next-intl/server";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";

export default async function NotFound() {
  const t = await getTranslations("not_found");

  return (
    <main
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(24px, 5vw, 96px)",
        paddingTop: "calc(80px + 56px)",
        maxWidth: "var(--max-container)",
      }}
    >
      <EyebrowTag as="p">{t("eyebrow")}</EyebrowTag>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          fontWeight: "var(--weight-semibold)",
          letterSpacing: "var(--track-tight)",
          lineHeight: "var(--lh-snug)",
          color: "var(--axial-bone)",
          margin: "var(--space-4) 0 var(--space-4)",
        }}
      >
        {t("heading")}
      </h1>

      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--size-16)",
          lineHeight: "var(--lh-normal)",
          color: "var(--graphite-400)",
          margin: "0 0 var(--space-8)",
        }}
      >
        {t("body")}
      </p>

      <a
        href="/"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--size-12)",
          fontWeight: "var(--weight-medium)",
          letterSpacing: "var(--track-wider)",
          textTransform: "uppercase",
          color: "var(--axial-voltage)",
          textDecoration: "none",
          borderBottom: "1px solid var(--axial-voltage-dim)",
          paddingBottom: "1px",
          width: "fit-content",
        }}
      >
        {t("cta")} →
      </a>
    </main>
  );
}
