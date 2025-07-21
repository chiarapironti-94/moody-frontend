import styles from './MoodEntryCard.module.css';

export default function MoodEntryCard({ entry }) {
  const date = new Date(entry.date).toLocaleDateString();
  return (
    <div className={styles.card}>
      <div className={styles.accent} style={{ backgroundColor: entry.color }} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.emoji}>
            {entry.mood === 'happy'
              ? '😊'
              : entry.mood === 'neutral'
              ? '😐'
              : '😢'}
          </span>
          <time className={styles.date}>{date}</time>
        </div>
        {entry.note && <p className={styles.note}>{entry.note}</p>}
        <div className={styles.footer}>
          <div className={styles.ratingBar}>
            <div
              className={styles.ratingFill}
              style={{ width: `${((entry.rating - 1) / 9) * 100}%` }}
            />
          </div>
          <span className={styles.ratingValue}>{entry.rating}/10</span>
        </div>
      </div>
    </div>
  );
}
