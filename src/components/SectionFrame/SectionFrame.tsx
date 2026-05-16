import type { ReactNode } from "react";
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
  return (
    <section id={id} className={styles.frame} aria-labelledby={`${id}-heading`}>
      <div className={styles.axisLine} aria-hidden="true" />

      <div className={styles.index} aria-hidden="true">
        <span className={styles.indexLabel}>
          §{pad(index)}&nbsp;/&nbsp;{pad(total - 1)}
          {label && <>&nbsp;·&nbsp;{label}</>}
        </span>
      </div>

      <div className={styles.content}>{children}</div>
    </section>
  );
}
