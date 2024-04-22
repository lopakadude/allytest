'use client'
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Пожалуйста, авторизуйтесь</h1>
      <button
      onClick={() => window.location.href = '/login'} className={styles.main__submit}>логин</button>
    </main>
  );
}
