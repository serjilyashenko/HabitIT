import { getLocalIsoToday, getStartOfTheDay } from '../utils/date';
import { FunnySnail } from './FunnySnail';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <h1>
        HabitIt
        <FunnySnail />
      </h1>
      <time dateTime={getLocalIsoToday()}>
        {new Intl.DateTimeFormat().format(getStartOfTheDay())}
      </time>
    </header>
  );
}
