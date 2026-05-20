"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_AXIAL_TUPLE, EASE_OUT_TUPLE, DURATION } from "@/lib/motion";
import { SectionFrame } from "@/components/SectionFrame/SectionFrame";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";
import { Button } from "@/components/Button/Button";
import { SITE } from "@/content/site";
import styles from "./Pricing.module.css";

function useCountUp(target: number, durationMs: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, durationMs]);

  return count;
}

export function Pricing() {
  const t = useTranslations("pricing");
  const reduced = useReducedMotion();
  const [glowing, setGlowing] = useState(false);

  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, { once: true, amount: 0.3 });
  const priceTarget = Number(t("hourly_price")) || 20;
  const count = useCountUp(priceTarget, 800, inView && !reduced);

  const hourlyIncludes = [
    t("hourly_i1"),
    t("hourly_i2"),
    t("hourly_i3"),
    t("hourly_i4"),
    t("hourly_i5"),
  ];

  return (
    <SectionFrame index={2} total={5} id="pricing">
      <EyebrowTag as="p" id="pricing-heading">
        {t("eyebrow")}
      </EyebrowTag>

      <motion.article
        ref={cardRef}
        className={`${styles.hourlyCard}${glowing ? ` ${styles.hourlyCardGlow}` : ""}`}
        aria-label={t("hourly_title")}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: reduced ? 0 : DURATION.hero * 0.67, ease: EASE_AXIAL_TUPLE }}
        onAnimationComplete={() => {
          if (!reduced) setGlowing(true);
        }}
      >
        <div className={styles.hourlyRate}>
          <p className={styles.hourlyEyebrow}>{t("hourly_eyebrow")}</p>
          <h3 className={styles.hourlyTitle}>{t("hourly_title")}</h3>
          <div className={styles.priceLockup} role="img" aria-label={`$${t("hourly_price")} per hour`}>
            <span className={styles.priceCurrency} aria-hidden="true">
              $
            </span>
            <span className={styles.priceAmount} aria-hidden="true">
              {reduced ? priceTarget : count}
            </span>
            <span className={styles.priceUnit} aria-hidden="true">
              /hr
            </span>
          </div>
          <span className={styles.hourlyQualifier}>{t("hourly_qualifier")}</span>
        </div>

        <div className={styles.hourlyIncludes}>
          <span className={styles.colLabel}>{t("hourly_includes")}</span>
          <ul className={styles.hourlyBullets}>
            {hourlyIncludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.hourlyAction}>
          <p className={styles.hourlyNote}>
            <strong>{t("hourly_note_strong")}</strong> {t("hourly_note_body")}
          </p>
          <Button variant="primary" href={`#${SITE.anchors.contact}`}>
            {t("hourly_cta")} →
          </Button>
        </div>
      </motion.article>
    </SectionFrame>
  );
}
