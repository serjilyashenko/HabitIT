import { useEffect, useRef } from 'react';
import { getTodayForBrowsersTZ } from '../utils/date';
import { useHabit } from '../helpers/habit-context';
import styles from './Header.module.css';

export function Header() {
  const today = getTodayForBrowsersTZ();
  const { history } = useHabit();
  const isFirstRender = useRef(true);
  const snailRef = useRef(null);

  useEffect(() => {
    if (!isFirstRender.current && snailRef.current) {
      snailRef.current.classList.add(styles.snail__jump);

      Promise.all(
        snailRef.current
          .getAnimations({ subtree: true })
          .map((animation) => animation.finished)
      ).then(() => snailRef.current.classList.remove(styles.snail__jump));
    }

    isFirstRender.current = false;
  }, [history]);

  return (
    <header className={styles.header}>
      <h1>
        HabitIt
        <span ref={snailRef}>🐌</span>
      </h1>
      <time dateTime={today.toISOString().split('T')[0]}>
        {new Intl.DateTimeFormat().format(today)}
      </time>
    </header>
  );
}
