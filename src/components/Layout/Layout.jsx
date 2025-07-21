import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Header from './../Header/Header';
import Sidebar from './../Sidebar/Sidebar';
import NewEntryModal from '../NewEntryModal/NewEntryModal';
import { CREATE_MOOD_ENTRY } from '../../graphql/mutations';
import { GET_MOOD_ENTRIES } from '../../graphql/queries';
import styles from './Layout.module.css';

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSave(entry) {
    try {
      await createMoodEntry({
        variables: {
          mood: entry.mood,
          rating: entry.rating,
          color: entry.color,
          note: entry.note || null,
        },
      });
      setIsModalOpen(false);
    } catch (e) {
      console.error('Error saving entry:', e);
      // optionally surface e.message in your UI
    }
  }

  const [createMoodEntry, { loading, error }] = useMutation(CREATE_MOOD_ENTRY, {
    refetchQueries: [{ query: GET_MOOD_ENTRIES }],
    awaitRefetchQueries: true,
  });

  return (
    <div className={styles.container}>
      <Header />
      <Sidebar onNewEntry={() => setIsModalOpen(true)} />
      {/* Outlet renderizza qui la pagina corrente */}
      <main className={styles.main}>
        <Outlet />
      </main>

      <NewEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
