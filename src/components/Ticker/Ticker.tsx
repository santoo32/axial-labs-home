import styles from "./Ticker.module.css";

const CONTENT =
  "ENGINEERING STUDIO · DESIGN SYSTEMS · AUTOMATION · DELIVERY · PRECISION TOOLING · ";

export function Ticker() {
  return (
    <div className={styles.strip} aria-hidden="true">
      <div className={styles.track}>
        <span className={styles.segment}>{CONTENT}</span>
        <span className={styles.segment}>{CONTENT}</span>
        <span className={styles.segment}>{CONTENT}</span>
        <span className={styles.segment}>{CONTENT}</span>
      </div>
    </div>
  );
}
