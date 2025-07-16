import styles from './MainArea.module.css';

export default function MainArea({ children }) {
  return <main className={styles.mainArea}>{children}</main>;
}
