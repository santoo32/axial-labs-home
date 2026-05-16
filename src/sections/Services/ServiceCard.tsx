import styles from "./ServiceCard.module.css";

type Props = {
  code: string;
  title: string;
  body: string;
};

export function ServiceCard({ code, title, body }: Props) {
  return (
    <article className={styles.card}>
      <span className={styles.code}>{code}</span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </article>
  );
}
