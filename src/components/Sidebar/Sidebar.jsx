import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar({ onNewEntry }) {
  return (
    <aside className={styles.sidebar}>
      <button className={styles.addBtn} onClick={onNewEntry}>
        + New Entry
      </button>
      <ul className={styles.menu}>
        <li>
          <Link to="/">
            <span>🏠</span> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/entries">
            <span>📝</span> Entries
          </Link>
        </li>
        <li>
          <Link to="/stats">
            <span>📊</span> Stats
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <span>⚙️</span> Settings
          </Link>
        </li>
      </ul>
    </aside>
  );
}
