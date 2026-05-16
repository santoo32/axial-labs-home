import styles from "./Hero.module.css";

export function SchematicBackground() {
  return (
    <svg
      className={styles.schemBg}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="axial-schematic-grid" width="64" height="64" patternUnits="userSpaceOnUse">
          <path d="M 64 0 L 0 0 0 64" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="1920" height="1080" fill="url(#axial-schematic-grid)" />

      {/* Top-left corner registration */}
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="square" fill="none">
        <line x1="64" y1="64" x2="96" y2="64" />
        <line x1="64" y1="64" x2="64" y2="96" />
      </g>
      {/* Top-right corner registration */}
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="square" fill="none">
        <line x1="1856" y1="64" x2="1824" y2="64" />
        <line x1="1856" y1="64" x2="1856" y2="96" />
      </g>
      {/* Bottom-left corner registration */}
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="square" fill="none">
        <line x1="64" y1="1016" x2="96" y2="1016" />
        <line x1="64" y1="984" x2="64" y2="1016" />
      </g>
      {/* Bottom-right corner registration */}
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="square" fill="none">
        <line x1="1824" y1="1016" x2="1856" y2="1016" />
        <line x1="1856" y1="984" x2="1856" y2="1016" />
      </g>

      <text
        x="104"
        y="80"
        fontFamily="monospace"
        fontSize="10"
        fill="currentColor"
        opacity="0.4"
      >
        §00
      </text>
      <text
        x="1816"
        y="80"
        fontFamily="monospace"
        fontSize="10"
        fill="currentColor"
        opacity="0.4"
        textAnchor="end"
      >
        04°N · 73°W
      </text>
    </svg>
  );
}
