"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { SectionFrame } from "@/components/SectionFrame/SectionFrame";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";
import { PRINCIPLE_KEYS } from "@/content/principles";
import { Principle } from "./Principle";
import styles from "./About.module.css";

export function About() {
  const t = useTranslations("about");
  const reduced = useReducedMotion();

  const narrativeVariants = reduced ? {} : fadeIn(0.1);
  const listVariants = reduced ? {} : staggerContainer(0.08, 0.15);

  return (
    <SectionFrame index={3} total={5} id="about">
      <EyebrowTag as="p">{t("eyebrow")}</EyebrowTag>
      <h2 id="about-heading" className={styles.heading}>
        {t("heading")}
      </h2>

      <div className={styles.columns}>
        <motion.div
          className={styles.narrative}
          variants={narrativeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <blockquote className={styles.pullQuote}>{t("pull_quote")}</blockquote>
          <p className={styles.body}>{t("body")}</p>
        </motion.div>

        <div className={styles.principles}>
          <EyebrowTag as="p">{t("principles_eyebrow")}</EyebrowTag>
          <motion.ol
            className={styles.principleList}
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {PRINCIPLE_KEYS.map((key, i) => (
              <Principle key={key} number={i + 1} text={t(key)} />
            ))}
          </motion.ol>
        </div>
      </div>
    </SectionFrame>
  );
}
