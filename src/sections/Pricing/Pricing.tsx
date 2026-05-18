import { useTranslations } from "next-intl";
import { SectionFrame } from "@/components/SectionFrame/SectionFrame";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";
import { Button } from "@/components/Button/Button";
import { SITE } from "@/content/site";
import styles from "./Pricing.module.css";

export function Pricing() {
  const t = useTranslations("pricing");

  const studioFeatures = [
    t("studio_f1"),
    t("studio_f2"),
    t("studio_f3"),
    t("studio_f4"),
  ];
  const osFeatures = [t("os_f1"), t("os_f2"), t("os_f3"), t("os_f4")];
  const foundryFeatures = [
    t("foundry_f1"),
    t("foundry_f2"),
    t("foundry_f3"),
    t("foundry_f4"),
  ];
  const hourlyIncludes = [
    t("hourly_i1"),
    t("hourly_i2"),
    t("hourly_i3"),
    t("hourly_i4"),
    t("hourly_i5"),
  ];

  return (
    <SectionFrame index={2} total={5} id="pricing">
      <EyebrowTag as="p" id="pricing-heading">{t("eyebrow")}</EyebrowTag>

      {/* Hourly rate card */}
      <article className={styles.hourlyCard} aria-label={t("hourly_title")}>
        <div className={styles.hourlyRate}>
          <p className={styles.hourlyEyebrow}>{t("hourly_eyebrow")}</p>
          <h3 className={styles.hourlyTitle}>{t("hourly_title")}</h3>
          <div
            className={styles.priceLockup}
            aria-label={`$${t("hourly_price")} per hour`}
          >
            <span className={styles.priceCurrency} aria-hidden="true">$</span>
            <span className={styles.priceAmount} aria-hidden="true">{t("hourly_price")}</span>
            <span className={styles.priceUnit} aria-hidden="true">/hr</span>
          </div>
          <span className={styles.hourlyQualifier}>{t("hourly_qualifier")}</span>
        </div>

        <div className={styles.hourlyIncludes}>
          <span className={styles.colLabel}>{t("hourly_includes")}</span>
          <ul className={styles.hourlyBullets}>
            {hourlyIncludes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={styles.hourlyAction}>
          <p className={styles.hourlyNote}>
            <strong>{t("hourly_note_strong")}</strong>{" "}
            {t("hourly_note_body")}
          </p>
          <Button variant="primary" href={`#${SITE.anchors.contact}`}>
            {t("hourly_cta")} →
          </Button>
        </div>
      </article>

      {/* Divider */}
      <div className={styles.divider} role="separator">
        <span className={styles.dividerLabel}>{t("divider_label")}</span>
      </div>

      <div className={styles.grid}>
        {/* Studio */}
        <article className={styles.card}>
          <p className={styles.tier}>{t("studio_tier")}</p>
          <h3 className={styles.subtitle}>{t("studio_subtitle")}</h3>
          <p className={styles.price}>{t("studio_price")}</p>
          <ul className={styles.features}>
            {studioFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Button variant="primary" href={`#${SITE.anchors.contact}`} className={styles.cta}>
            {t("studio_cta")} →
          </Button>
        </article>

        {/* OS Starter — signature tier */}
        <article className={`${styles.card} ${styles.cardSignature}`}>
          <p className={`${styles.tier} ${styles.tierVoltage}`}>{t("os_tier")}</p>
          <h3 className={styles.subtitle}>{t("os_subtitle")}</h3>
          <p className={styles.price}>{t("os_price")}</p>
          <ul className={styles.features}>
            {osFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Button variant="primary" href={`#${SITE.anchors.contact}`} className={styles.cta}>
            {t("os_cta")} →
          </Button>
        </article>

        {/* Foundry */}
        <article className={styles.card}>
          <p className={styles.tier}>{t("foundry_tier")}</p>
          <h3 className={styles.subtitle}>{t("foundry_subtitle")}</h3>
          <p className={styles.price}>{t("foundry_price")}</p>
          <ul className={styles.features}>
            {foundryFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Button variant="ghost" href={SITE.social.github} className={styles.cta}>
            {t("foundry_cta")} →
          </Button>
        </article>
      </div>
    </SectionFrame>
  );
}
