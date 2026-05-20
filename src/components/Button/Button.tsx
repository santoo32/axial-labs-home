import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost";

type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

type AsLink = BaseProps & { href: string; type?: never };
type AsButton = BaseProps & { href?: never; type?: "button" | "submit" | "reset" };

type Props = AsLink | AsButton;

export function Button({ variant = "primary", children, className, disabled, ...rest }: Props) {
  const cls = [styles.btn, variant === "primary" ? styles.primary : styles.ghost, className ?? ""]
    .filter(Boolean)
    .join(" ");

  if ("href" in rest && rest.href !== undefined) {
    return (
      <a
        href={rest.href}
        className={cls}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={(rest as AsButton).type ?? "button"} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}
