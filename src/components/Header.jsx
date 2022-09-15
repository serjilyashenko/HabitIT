import { getTodayForBrowsersTZ } from '../utils/date';
import headerStyles from './Header.module.css';

export function Header() {
  const today = getTodayForBrowsersTZ();
  return (
    <header className={headerStyles.header}>
      <h1>HabitIt🐌</h1>
      <time dateTime={today.toISOString().split('T')[0]}>
        {new Intl.DateTimeFormat().format(today)}
      </time>
    </header>
  );
}
