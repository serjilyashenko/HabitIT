import { useToday } from '../helpers/today-context';
import { convertToLocalIsoDate } from '../utils/date';
import { FunnySnail } from './FunnySnail';
import styles from './Header.module.css';

export function Header() {
  const today = useToday();

  return (
    <header className={styles.header}>
      <h1>
        HabitIt
        <FunnySnail />
      </h1>
      <time dateTime={convertToLocalIsoDate(today).split('T')[0]}>
        {new Intl.DateTimeFormat().format(today)}
      </time>
    </header>
  );
}
