import styles from "./ServiceCard.module.css";

type Props = {
  code: string;
  title: string;
  body: string;
};

export function ServiceCard({ code, title, body }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.code}>{code}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
      </div>
      <div className={styles.footer}>
        <span className={styles.arrow} aria-hidden="true">→</span>
      </div>
    </article>
  );
}
