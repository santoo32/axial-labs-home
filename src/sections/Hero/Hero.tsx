import { useTranslations } from "next-intl";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";
import { Button } from "@/components/Button/Button";
import { SchematicBackground } from "./SchematicBackground";
import styles from "./Hero.module.css";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="hero" className={styles.section} aria-labelledby="hero-heading">
      <SchematicBackground />
      <div className={styles.axisLine} aria-hidden="true" />
      <div className={styles.indexBadge} aria-hidden="true">
        <span className={styles.indexLabel}>§00&nbsp;/&nbsp;§03</span>
      </div>

      <div className={styles.inner}>
        <EyebrowTag as="p">{t("eyebrow")}</EyebrowTag>

        <div className={styles.headingFrame}>
          <h1 id="hero-heading" className={styles.heading}>
            {t("heading")}
          </h1>
        </div>

        <p className={styles.sub}>{t("sub")}</p>

        <div className={styles.ctas}>
          <Button variant="primary" href="#contact">
            {t("cta_primary")} →
          </Button>
          <Button variant="ghost" href="#services">
            {t("cta_ghost")}
          </Button>
        </div>
      </div>

      <div className={styles.coordinate} aria-hidden="true">
        {t("coordinate")}
      </div>
    </section>
  );
}
