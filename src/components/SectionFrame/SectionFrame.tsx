"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { drawDown, fadeIn, fadeUp } from "@/lib/motion";
import styles from "./SectionFrame.module.css";

type Props = {
  index: number; // 0-based
  total: number;
  id: string;
  label?: string;
  children: ReactNode;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function SectionFrame({ index, total, id, label, children }: Props) {
  const reduced = useReducedMotion();

  const axisVariants = reduced ? { hidden: { scaleY: 1 }, visible: { scaleY: 1 } } : drawDown;

  const badgeVariants = reduced ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : fadeIn(0.2);

  const contentVariants = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : fadeUp(0.1);

  return (
    <section id={id} className={styles.frame} aria-labelledby={`${id}-heading`}>
      <motion.div
        className={styles.axisLine}
        aria-hidden="true"
        style={{ transformOrigin: "top" }}
        variants={axisVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      />

      <motion.div
        className={styles.index}
        aria-hidden="true"
        variants={badgeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <span className={styles.indexLabel}>
          {pad(index)}&nbsp;/&nbsp;{pad(total - 1)}
          {label && <>&nbsp;·&nbsp;{label}</>}
        </span>
      </motion.div>

      <motion.div
        className={styles.content}
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
