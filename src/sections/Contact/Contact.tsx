import { useTranslations } from "next-intl";
import { SectionFrame } from "@/components/SectionFrame/SectionFrame";
import { EyebrowTag } from "@/components/EyebrowTag/EyebrowTag";
import { SITE } from "@/content/site";
import { ContactForm } from "./ContactForm";
import { Footer } from "./Footer";
import styles from "./Contact.module.css";

type Props = { locale: string };

export function Contact({ locale }: Props) {
  const t = useTranslations("contact");

  return (
    <SectionFrame index={4} total={5} id="contact">
      <div className={styles.split}>
        <div className={styles.left}>
          <EyebrowTag as="p">{t("eyebrow")}</EyebrowTag>
          <h2 id="contact-heading" className={styles.heading}>
            {t("heading")}
          </h2>
          <a href={`mailto:${SITE.email}`} className={styles.emailLink}>
            {t("email_label")}
          </a>
        </div>

        <div className={styles.right}>
          <ContactForm locale={locale} />
        </div>
      </div>

      <Footer locale={locale} />
    </SectionFrame>
  );
}
