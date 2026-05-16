import { useTranslations } from "next-intl";
import { SectionFrame } from "@/components/SectionFrame/SectionFrame";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";
import { PRINCIPLE_KEYS } from "@/content/principles";
import { Principle } from "./Principle";
import styles from "./About.module.css";

export function About() {
  const t = useTranslations("about");

  return (
    <SectionFrame index={2} total={4} id="about">
      <EyebrowTag as="p">{t("eyebrow")}</EyebrowTag>
      <h2 id="about-heading" className={styles.heading}>
        {t("heading")}
      </h2>

      <div className={styles.columns}>
        <div className={styles.narrative}>
          <blockquote className={styles.pullQuote}>{t("pull_quote")}</blockquote>
          <p className={styles.body}>{t("body")}</p>
        </div>

        <div className={styles.principles}>
          <EyebrowTag as="p">{t("principles_eyebrow")}</EyebrowTag>
          <ol className={styles.principleList}>
            {PRINCIPLE_KEYS.map((key, i) => (
              <Principle key={key} number={i + 1} text={t(key)} />
            ))}
          </ol>
        </div>
      </div>
    </SectionFrame>
  );
}
