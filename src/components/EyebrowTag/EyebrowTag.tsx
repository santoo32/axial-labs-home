import type { ReactNode } from "react";
import styles from "./EyebrowTag.module.css";

type Props = {
  children: ReactNode;
  variant?: "default" | "voltage" | "bone";
  prefix?: boolean;
  as?: "span" | "p" | "div";
  id?: string;
};

export function EyebrowTag({
  children,
  variant = "default",
  prefix = false,
  as: Tag = "span",
  id,
}: Props) {
  const cls = [
    styles.eyebrow,
    variant === "voltage" ? styles.voltage : "",
    variant === "bone" ? styles.bone : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag id={id} className={cls}>
      {prefix && <span aria-hidden="true">→ </span>}
      {children}
    </Tag>
  );
}
