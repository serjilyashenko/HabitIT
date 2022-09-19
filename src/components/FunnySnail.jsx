import { useEffect, useRef } from 'react';
import { useHabit } from '../helpers/habit-context';
import styles from './FunnySnail.module.css';

export function FunnySnail() {
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

  return <span ref={snailRef}>🐌</span>;
}
