type Props = {
  size?: number;
  className?: string;
};

export function Crosshair({ size = 8, className }: Props) {
  const half = size / 2;
  const gap = size * 0.2; // gap at center

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Horizontal arm left */}
      <line
        x1={0}
        y1={half}
        x2={half - gap}
        y2={half}
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="square"
      />
      {/* Horizontal arm right */}
      <line
        x1={half + gap}
        y1={half}
        x2={size}
        y2={half}
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="square"
      />
      {/* Vertical arm top */}
      <line
        x1={half}
        y1={0}
        x2={half}
        y2={half - gap}
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="square"
      />
      {/* Vertical arm bottom */}
      <line
        x1={half}
        y1={half + gap}
        x2={half}
        y2={size}
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="square"
      />
    </svg>
  );
}
