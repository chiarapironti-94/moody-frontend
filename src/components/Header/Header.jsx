import { Link, useLocation } from 'react-router-dom';
import ThemeSelector from './../ThemeSelector/ThemeSelector';
import styles from './Header.module.css';

const titles = {
  '/': 'Dashboard',
  '/entries': 'Entries',
  '/stats': 'Stats',
  '/settings': 'Settings',
};

export default function Header() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? 'Mood Diary';

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        {/* <Link to="/">Ricerca</Link>
        <Link to="/entries">Notifiche</Link>
        <Link to="/stats">Tema</Link>
        <Link to="/settings">Profilo</Link> */}
        <ThemeSelector />
      </div>
    </header>
  );
}
