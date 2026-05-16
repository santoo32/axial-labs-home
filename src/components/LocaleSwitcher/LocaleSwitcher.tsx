"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.css";

type Props = { currentLocale: string };

export function LocaleSwitcher({ currentLocale }: Props) {
  const pathname = usePathname();

  // Strip the locale prefix to get the path segment (e.g. "/en/foo" → "/foo")
  const pathWithoutLocale = routing.locales.reduce(
    (p, loc) => p.replace(new RegExp(`^/${loc}`), "") || "/",
    pathname
  );

  return (
    <div className={styles.switcher} aria-label="Language switcher">
      {routing.locales.map((locale, i) => {
        const isActive = locale === currentLocale;
        return (
          <span key={locale} className={styles.item}>
            {i > 0 && <span className={styles.sep} aria-hidden="true">·</span>}
            {isActive ? (
              <span className={[styles.link, styles.active].join(" ")} aria-current="true">
                {locale.toUpperCase()}
              </span>
            ) : (
              <Link
                href={pathWithoutLocale}
                locale={locale}
                className={styles.link}
              >
                {locale.toUpperCase()}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
