import type { ReactNode } from "react";
import styles from "./MonoLabel.module.css";

type CaseVariant = "lower" | "upper";
type ColorVariant = "default" | "voltage" | "dim" | "bone" | "secondary";

type Props = {
  children: ReactNode;
  casing: CaseVariant;
  color?: ColorVariant;
  size?: "10" | "12" | "14";
  as?: "span" | "p" | "div" | "time" | "code";
};

const colorClass: Record<ColorVariant, string> = {
  default: styles.colorDefault,
  voltage: styles.colorVoltage,
  dim: styles.colorDim,
  bone: styles.colorBone,
  secondary: styles.colorSecondary,
};

const sizeClass: Record<string, string> = {
  "10": styles.size10,
  "12": styles.size12,
  "14": styles.size14,
};

export function MonoLabel({
  children,
  casing,
  color = "default",
  size = "12",
  as: Tag = "span",
}: Props) {
  const cls = [
    styles.mono,
    casing === "upper" ? styles.upper : styles.lower,
    colorClass[color],
    sizeClass[size],
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={cls}>{children}</Tag>;
}
