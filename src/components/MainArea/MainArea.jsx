import { useQuery, useMutation } from '@apollo/client';
import { GET_MOOD_ENTRIES } from '../../graphql/queries';
import { DELETE_MOOD_ENTRY } from '../../graphql/mutations';
import MoodEntryCard from '../MoodEntryCard/MoodEntryCard';
import styles from './MainArea.module.css';

export default function MainArea() {
  const { data, loading, error, refetch } = useQuery(GET_MOOD_ENTRIES);

  const [deleteEntry, { loading: deleting }] = useMutation(DELETE_MOOD_ENTRY, {
    onCompleted: () => {
      refetch();
    },
    onError: (err) => {
      console.error('Delete failed', err);
    },
  });

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  const entries = data?.moodEntries || [];

  return (
    <main className={styles.mainArea}>
      {entries.length === 0 ? (
        <p>Nessuna entry al momento.</p>
      ) : (
        entries.map((entry) => (
          <MoodEntryCard
            key={entry._id}
            entry={entry}
            onDelete={() => deleteEntry({ variables: { id: entry._id } })}
            deleting={deleting}
          />
        ))
      )}
    </main>
  );
}
