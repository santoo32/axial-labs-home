import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher/LocaleSwitcher";
import { SITE } from "@/content/site";
import styles from "./Footer.module.css";

type Props = { locale: string };

export function Footer({ locale }: Props) {
  const t = useTranslations("footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.wordmarkWrapper} role="img" aria-label="Axial Labs">
        <svg
          viewBox="0 0 800 240"
          xmlns="http://www.w3.org/2000/svg"
          color="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <line
            x1="80" y1="40" x2="80" y2="200"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="square"
            strokeOpacity="0.4"
          />
          <text
            x="100" y="32"
            style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}
            fill="currentColor"
            fillOpacity="0.6"
          >
            → AL / WORDMARK / v1.0
          </text>
          <text
            x="400" y="140"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-display)", fontSize: "96px", fontWeight: 600, letterSpacing: "-0.02em" }}
            fill="currentColor"
          >
            AXIAL LABS
          </text>
          <text
            x="400" y="184"
            textAnchor="middle"
            style={{ fontFamily: "var(--font-mono)", fontSize: "12px", letterSpacing: "0.06em" }}
            fill="currentColor"
            fillOpacity="0.6"
          >
            ENGINEERED IDENTITY · EST. 2026 · AXIS-ALIGNED
          </text>
        </svg>
      </div>

      <div className={styles.columns}>
        <div className={styles.col}>
          <p className={styles.colEyebrow}>{t("services_heading")}</p>
          <ul>
            <li><a href={`#${SITE.anchors.services}`} className={styles.link}>{t("s_brand")}</a></li>
            <li><a href={`#${SITE.anchors.services}`} className={styles.link}>{t("s_product")}</a></li>
            <li><a href={`#${SITE.anchors.services}`} className={styles.link}>{t("s_tokens")}</a></li>
            <li><a href={`#${SITE.anchors.services}`} className={styles.link}>{t("s_automation")}</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colEyebrow}>{t("company_heading")}</p>
          <ul>
            <li><a href="#" className={styles.link}>{t("c_work")}</a></li>
            {/* <li><a href="#" className={styles.link}>{t("c_writing")}</a></li> */}
            <li><a href={`#${SITE.anchors.about}`} className={styles.link}>{t("c_about")}</a></li>
            <li><a href={`#${SITE.anchors.contact}`} className={styles.link}>{t("c_contact")}</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <p className={styles.colEyebrow}>{t("contact_heading")}</p>
          <ul>
            <li>
              <a href={`mailto:${SITE.email}`} className={styles.link}>
                {SITE.email}
              </a>
            </li>
            <li>
              <span className={styles.link}> Santa Fe, Argentina </span>
            </li>
            <li>
              <a href={SITE.social.github} className={styles.link} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/santiagoroa" className={styles.link} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.legal}>{t("legal")}</span>
        <div className={styles.bottomRight}>
          <LocaleSwitcher currentLocale={locale} />
          {process.env.NEXT_PUBLIC_VERSION && (
            <span className={styles.version}>v{process.env.NEXT_PUBLIC_VERSION}</span>
          )}
        </div>
      </div>
    </footer>
  );
}
