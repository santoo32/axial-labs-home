"use client";

import { motion } from "motion/react";
import styles from "./Principle.module.css";

type Props = {
  number: number;
  text: string;
};

const itemVariant = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.24, ease: [0.32, 0.72, 0, 1] as const },
  },
};

export function Principle({ number, text }: Props) {
  return (
    <motion.li className={styles.principle} variants={itemVariant}>
      <span className={styles.number}>{String(number).padStart(2, "0")}</span>
      <p className={styles.text}>{text}</p>
    </motion.li>
  );
}
