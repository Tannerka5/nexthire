import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/applications', label: 'Applications', end: false },
  { to: '/priorities', label: 'Priorities', end: false },
];

export function NavBar() {
  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <NavLink to="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">N</span>
          NextHire
        </NavLink>
        <nav className={styles.links}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
