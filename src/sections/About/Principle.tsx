import styles from "./Principle.module.css";

type Props = {
  number: number;
  text: string;
};

export function Principle({ number, text }: Props) {
  return (
    <li className={styles.principle}>
      <span className={styles.number}>{String(number).padStart(2, "0")}</span>
      <p className={styles.text}>{text}</p>
    </li>
  );
}
