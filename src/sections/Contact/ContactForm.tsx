"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { contactSchema } from "@/lib/contact-schema";
import type { ContactPayload } from "@/lib/contact-schema";
import { Button } from "@/components/Button/Button";
import styles from "./ContactForm.module.css";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

type Props = { locale: string };

export function ContactForm({ locale }: Props) {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      project: String(fd.get("project") ?? ""),
      message: String(fd.get("message") ?? ""),
      _hp: String(fd.get("_hp") ?? ""),
    };

    const result = contactSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactPayload;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch(`/${locale}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      method="POST"
      action={`/${locale}/api/contact`}
      noValidate
    >
      {/* Honeypot — invisible to humans, traps bots that fill all fields */}
      <input
        name="_hp"
        type="text"
        tabIndex={-1}
        className={styles.honeypot}
        aria-hidden="true"
        autoComplete="off"
      />

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-name">
          {t("name_label")}
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          className={[styles.input, errors.name ? styles.inputError : ""].filter(Boolean).join(" ")}
          placeholder={t("name_placeholder")}
          autoComplete="name"
          aria-describedby={errors.name ? "cf-name-error" : undefined}
          aria-invalid={errors.name ? true : undefined}
        />
        {errors.name && (
          <span id="cf-name-error" className={styles.errorText} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-email">
          {t("email_label")}
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          className={[styles.input, errors.email ? styles.inputError : ""].filter(Boolean).join(" ")}
          placeholder={t("email_placeholder")}
          autoComplete="email"
          aria-describedby={errors.email ? "cf-email-error" : undefined}
          aria-invalid={errors.email ? true : undefined}
        />
        {errors.email && (
          <span id="cf-email-error" className={styles.errorText} role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-project">
          {t("project_label")}
        </label>
        <select
          id="cf-project"
          name="project"
          className={[styles.select, errors.project ? styles.inputError : ""].filter(Boolean).join(" ")}
          defaultValue=""
          aria-describedby={errors.project ? "cf-project-error" : undefined}
          aria-invalid={errors.project ? true : undefined}
        >
          <option value="" disabled>
            —
          </option>
          <option value="brand">{t("project_brand")}</option>
          <option value="software">{t("project_software")}</option>
          <option value="both">{t("project_both")}</option>
          <option value="other">{t("project_other")}</option>
        </select>
        {errors.project && (
          <span id="cf-project-error" className={styles.errorText} role="alert">
            {errors.project}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cf-message">
          {t("message_label")}
        </label>
        <textarea
          id="cf-message"
          name="message"
          className={[styles.textarea, errors.message ? styles.inputError : ""].filter(Boolean).join(" ")}
          placeholder={t("message_placeholder")}
          rows={5}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          aria-invalid={errors.message ? true : undefined}
        />
        {errors.message && (
          <span id="cf-message-error" className={styles.errorText} role="alert">
            {errors.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={status === "loading" || status === "success"}
      >
        {status === "loading" ? "…" : `${t("submit")} →`}
      </Button>

      <div aria-live="polite" className={styles.statusMessage}>
        {status === "success" && (
          <span className={styles.successText}>{t("success")}</span>
        )}
        {status === "error" && (
          <span className={styles.errorMsg}>{t("error")}</span>
        )}
      </div>
    </form>
  );
}
