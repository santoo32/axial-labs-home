import { useTranslations } from "next-intl";
import { SectionFrame } from "@/components/SectionFrame/SectionFrame";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";
import { ALL_SERVICE_IDS } from "@/content/services";
import { ServiceCard } from "./ServiceCard";
import styles from "./Services.module.css";

export function Services() {
  const t = useTranslations("services");

  return (
    <SectionFrame index={1} total={5} id="services">
      <EyebrowTag as="p">{t("eyebrow")}</EyebrowTag>
      <h2 id="services-heading" className={styles.heading}>
        {t("heading")}
      </h2>

      <div className={styles.cards}>
        {ALL_SERVICE_IDS.map((id) => (
          <ServiceCard
            key={id}
            code={t(`${id}.code`)}
            title={t(`${id}.title`)}
            body={t(`${id}.body`)}
          />
        ))}
      </div>
    </SectionFrame>
  );
}
