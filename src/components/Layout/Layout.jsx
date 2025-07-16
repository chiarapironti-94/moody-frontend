import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './../Header/Header';
import Sidebar from './../Sidebar/Sidebar';
import NewEntryModal from '../NewEntryModal/NewEntryModal';
import styles from './Layout.module.css';

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        onSave={(entry) => {
          // qui puoi chiamare il tuo servizio/API per salvare su Mongo
          console.log('Salvo entry:', entry);
        }}
      />
    </div>
  );
}
