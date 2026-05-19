import styles from "./Logo.module.css";

type Variant = "icon" | "wordmark" | "lockup";

type Props = {
  variant?: Variant;
  /** Width in px. Icon defaults 20, wordmark defaults 160, lockup defaults 160. */
  width?: number;
  className?: string;
};

function IconMark({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", flexShrink: 0 }}
    >
      <rect x="10" y="1" width="4" height="22" fill="currentColor" />
      <rect x="2" y="10" width="20" height="4" fill="currentColor" />
    </svg>
  );
}

function WordmarkSvg({ width }: { width: number }) {
  const height = Math.round(width * 0.3); // 800:240 ratio
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 800 240"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <text
        fontFamily="var(--font-display)"
        fontWeight="600"
        fontSize="96"
        letterSpacing="-0.02em"
        fill="currentColor"
        x="400"
        y="140"
        textAnchor="middle"
      >
        AXIAL LABS
      </text>
      <g stroke="currentColor" strokeLinecap="square" strokeOpacity="0.35">
        <line x1="120" y1="180" x2="680" y2="180" strokeWidth="1" />
        <line x1="120" y1="176" x2="120" y2="184" strokeWidth="1" />
        <line x1="400" y1="176" x2="400" y2="184" strokeWidth="1" />
        <line x1="680" y1="176" x2="680" y2="184" strokeWidth="1" />
        <line x1="200" y1="178" x2="200" y2="182" strokeWidth="0.75" />
        <line x1="280" y1="178" x2="280" y2="182" strokeWidth="0.75" />
        <line x1="480" y1="178" x2="480" y2="182" strokeWidth="0.75" />
        <line x1="560" y1="178" x2="560" y2="182" strokeWidth="0.75" />
      </g>
    </svg>
  );
}

export function Logo({ variant = "lockup", width, className }: Props) {
  if (variant === "icon") {
    return (
      <span className={className ? `${styles.root} ${className}` : styles.root}>
        <IconMark size={width ?? 20} />
      </span>
    );
  }

  if (variant === "wordmark") {
    return (
      <span className={className ? `${styles.root} ${className}` : styles.root}>
        <WordmarkSvg width={width ?? 160} />
      </span>
    );
  }

  // lockup: icon + text
  return (
    <span className={className ? `${styles.lockup} ${className}` : styles.lockup}>
      <IconMark size={width ? Math.round(width * 0.125) : 20} />
      <span className={styles.wordmarkText} suppressHydrationWarning>Axial Labs</span>
    </span>
  );
}
