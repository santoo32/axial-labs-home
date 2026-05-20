import styles from "./AxisDivider.module.css";

type Variant = "simple" | "ticked" | "labeled";

type Props = {
  variant?: Variant;
  label?: string;
  labelPosition?: "left" | "right";
};

export function AxisDivider({ variant = "simple", label, labelPosition = "left" }: Props) {
  if (variant === "ticked") {
    return (
      <svg
        className={styles.tickedSvg}
        aria-hidden="true"
        focusable="false"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="12" x2="100%" y2="12" stroke="var(--graphite-700)" strokeWidth="1" />
        <line x1="50%" y1="6" x2="50%" y2="18" stroke="var(--graphite-600)" strokeWidth="1" />
        <line
          x1="25%"
          y1="9"
          x2="25%"
          y2="15"
          stroke="var(--graphite-600)"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <line
          x1="75%"
          y1="9"
          x2="75%"
          y2="15"
          stroke="var(--graphite-600)"
          strokeWidth="1"
          strokeOpacity="0.6"
        />
        <line x1="0" y1="10" x2="0" y2="14" stroke="var(--graphite-700)" strokeWidth="1" />
        <line x1="100%" y1="10" x2="100%" y2="14" stroke="var(--graphite-700)" strokeWidth="1" />
        <circle cx="50%" cy="12" r="2" fill="var(--axial-voltage-dim)" />
      </svg>
    );
  }

  if (variant === "labeled") {
    return (
      <div
        className={[
          styles.labeled,
          labelPosition === "right" ? styles.labelRight : styles.labelLeft,
        ].join(" ")}
        role="separator"
        aria-label={label}
      >
        {labelPosition === "left" && <span className={styles.labelText}>{label}</span>}
        <div className={styles.line} aria-hidden="true" />
        {labelPosition === "right" && <span className={styles.labelText}>{label}</span>}
      </div>
    );
  }

  return <hr className={styles.simple} aria-hidden="true" />;
}
