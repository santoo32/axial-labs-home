"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { staggerContainer } from "@/lib/motion";
import { SectionFrame } from "@/components/SectionFrame/SectionFrame";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";
import { ALL_SERVICE_IDS } from "@/content/services";
import { ServiceCard } from "./ServiceCard";
import styles from "./Services.module.css";

export function Services() {
  const t = useTranslations("services");
  const reduced = useReducedMotion();

  const containerVariants = reduced ? {} : staggerContainer(0.08);

  return (
    <SectionFrame index={1} total={5} id="services">
      <EyebrowTag as="p" id="services-heading">
        {t("eyebrow")}
      </EyebrowTag>

      <motion.div
        className={styles.cards}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {ALL_SERVICE_IDS.map((id) => (
          <ServiceCard
            key={id}
            code={t(`${id}.code`)}
            title={t(`${id}.title`)}
            body={t(`${id}.body`)}
          />
        ))}
      </motion.div>
    </SectionFrame>
  );
}
