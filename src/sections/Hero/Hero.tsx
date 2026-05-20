"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";
import { Button } from "@/components/Button/Button";
import { EASE_AXIAL_TUPLE, EASE_OUT_TUPLE, DURATION } from "@/lib/motion";
import styles from "./Hero.module.css";

// At ≤480px, only the 4 "keep" ticks render; the 3 "extra" are hidden via CSS.
const TICKS: { x: number; extra?: boolean }[] = [
  { x: 0 },
  { x: 160, extra: true },
  { x: 266 },
  { x: 400, extra: true },
  { x: 534 },
  { x: 640, extra: true },
  { x: 800 },
];

function TickRow({ flipped }: { flipped?: boolean }) {
  return (
    <svg
      className={styles.ticks}
      viewBox="0 0 800 8"
      preserveAspectRatio="none"
      height="8"
      aria-hidden="true"
    >
      {TICKS.map(({ x, extra }) => (
        <line
          key={x}
          className={extra ? styles.tickExtra : undefined}
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
  const reduced = useReducedMotion();

  const heading = t("heading");
  const words = heading.split(" ");

  const d = (ms: number) => (reduced ? 0 : ms / 1000);
  const dur = (s: number) => (reduced ? 0 : s);

  return (
    <section id="hero" className={styles.section} aria-labelledby="hero-heading">
      <motion.div
        className={styles.gridOverlay}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur(DURATION.hero), ease: EASE_OUT_TUPLE }}
      />

      <span className={`${styles.cornerLabel} ${styles.cornerTL}`} aria-hidden="true">
        X 0 Y 0
      </span>
      <span className={`${styles.cornerLabel} ${styles.cornerTR}`} aria-hidden="true">
        X 1280 Y 0
      </span>
      <span className={`${styles.cornerLabel} ${styles.cornerBL}`} aria-hidden="true">
        X 0 Y 720
      </span>
      <span className={`${styles.cornerLabel} ${styles.cornerBR}`} aria-hidden="true">
        X 1280 Y 720
      </span>

      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(DURATION.ui), delay: d(300), ease: EASE_AXIAL_TUPLE }}
        >
          <EyebrowTag as="p" prefix>
            {t("eyebrow")}
          </EyebrowTag>
        </motion.div>

        <div className={styles.headingFrame}>
          <TickRow />
          <div className={styles.ruleTop} aria-hidden="true" />
          <h1 id="hero-heading" className={styles.heading}>
            {words.map((word, i) => (
              <span key={`${word}-${i}`}>
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: dur(DURATION.ui),
                    delay: d(400) + i * d(80),
                    ease: EASE_AXIAL_TUPLE,
                  }}
                >
                  {word}
                </motion.span>
                {i < words.length - 1 && " "}
              </span>
            ))}
          </h1>
          <div className={styles.ruleBottom} aria-hidden="true" />
          <TickRow flipped />
        </div>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur(DURATION.ui), delay: d(1100), ease: EASE_AXIAL_TUPLE }}
        >
          {t("sub")}
        </motion.p>

        <div className={styles.ctas}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: dur(DURATION.ui), delay: d(1300), ease: EASE_AXIAL_TUPLE }}
          >
            <Button variant="primary" href="#contact">
              {t("cta_primary")} →
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: dur(DURATION.ui), delay: d(1380), ease: EASE_AXIAL_TUPLE }}
          >
            <Button variant="ghost" href="#services">
              {t("cta_ghost")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
