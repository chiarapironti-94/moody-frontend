import { useQuery } from '@apollo/client';
import { GET_MOOD_ENTRIES } from '../../graphql/queries';
import MoodEntryCard from '../MoodEntryCard/MoodEntryCard';
import styles from './MainArea.module.css';

export default function MainArea() {
  const { data, loading, error } = useQuery(GET_MOOD_ENTRIES);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  const entries = data?.moodEntries || [];

  return (
    <main className={styles.mainArea}>
      {entries.length === 0 ? (
        <p>Nessuna entry al momento.</p>
      ) : (
        entries.map((entry) => <MoodEntryCard key={entry._id} entry={entry} />)
      )}
    </main>
  );
}
