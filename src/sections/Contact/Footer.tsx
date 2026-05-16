import { useTranslations } from "next-intl";
import { Logo } from "@/components/Logo/Logo";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { SITE } from "@/content/site";
import styles from "./Footer.module.css";

type Props = { locale: string };

export function Footer({ locale }: Props) {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Logo variant="wordmark" width={240} />
      </div>

      <div className={styles.bottom}>
        <nav className={styles.links} aria-label="Footer navigation">
          <a href={`#${SITE.anchors.services}`} className={styles.link}>
            {t("nav_services")}
          </a>
          <a href={`#${SITE.anchors.about}`} className={styles.link}>
            {t("nav_about")}
          </a>
          <a href={`#${SITE.anchors.contact}`} className={styles.link}>
            {t("nav_contact")}
          </a>
        </nav>

        <div className={styles.social}>
          <a
            href={SITE.social.x}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            X / Twitter
          </a>
          <a
            href={SITE.social.github}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>

        <div className={styles.meta}>
          <span className={styles.legal}>{t("legal")}</span>
          <LocaleSwitcher currentLocale={locale} />
          {process.env.NEXT_PUBLIC_VERSION && (
            <span className={styles.version}>v{process.env.NEXT_PUBLIC_VERSION}</span>
          )}
        </div>
      </div>
    </footer>
  );
}
