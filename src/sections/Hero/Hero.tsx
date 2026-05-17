import { useTranslations } from "next-intl";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";
import { Button } from "@/components/Button/Button";
import styles from "./Hero.module.css";

const TICK_X = [0, 160, 266, 400, 534, 640, 800];

function TickRow({ flipped }: { flipped?: boolean }) {
  return (
    <svg
      className={styles.ticks}
      viewBox="0 0 800 8"
      preserveAspectRatio="none"
      height="8"
      aria-hidden="true"
    >
      {TICK_X.map((x) => (
        <line
          key={x}
          x1={x}
          y1={flipped ? 0 : 8}
          x2={x}
          y2={flipped ? 8 : 0}
          stroke="var(--graphite-500)"
          strokeWidth="1"
          strokeLinecap="square"
        />
      ))}
    </svg>
  );
}

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="hero" className={styles.section} aria-labelledby="hero-heading">
      <div className={styles.gridOverlay} aria-hidden="true" />

      <span className={`${styles.cornerLabel} ${styles.cornerTL}`} aria-hidden="true">X 0 · Y 0</span>
      <span className={`${styles.cornerLabel} ${styles.cornerTR}`} aria-hidden="true">X 1280 · Y 0</span>
      <span className={`${styles.cornerLabel} ${styles.cornerBL}`} aria-hidden="true">X 0 · Y 720</span>
      <span className={`${styles.cornerLabel} ${styles.cornerBR}`} aria-hidden="true">X 1280 · Y 720</span>

      <div className={styles.indexBadge} aria-hidden="true">
        <span className={styles.indexLabel}>§00&nbsp;/&nbsp;§04</span>
      </div>

      <div className={styles.inner}>
        <EyebrowTag as="p" prefix>{t("eyebrow")}</EyebrowTag>

        <div className={styles.headingFrame}>
          <TickRow />
          <div className={styles.ruleTop} aria-hidden="true" />
          <h1 id="hero-heading" className={styles.heading}>
            {t("heading")}
          </h1>
          <div className={styles.ruleBottom} aria-hidden="true" />
          <TickRow flipped />
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
    </section>
  );
}
