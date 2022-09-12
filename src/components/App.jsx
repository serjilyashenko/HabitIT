import { useState } from 'react';
import { useHabitState } from '../hooks/habit-state';
import { getToday } from '../utils/date';
import { MainScreen } from './MainScreen';
import { EditScreen } from './EditScreen';
import { NewHabit } from './NewHabit';
import { ReactComponent as GitHubIcon } from '../assets/github.svg';
import appStyles from './App.module.css';

export default function App() {
  const {
    habits,
    completedHabitIds,
    onCompleteHabit,
    onAddHabit,
    onUpdateHabit,
  } = useHabitState();
  const [isEditing, setIsEditing] = useState(false);
  const today = getToday();

  return (
    <div className={appStyles.app}>
      <header className={appStyles.app_header}>
        <h1>HabitIt🐌</h1>
        <time dateTime={today.toISOString().split('T')[0]}>
          {new Intl.DateTimeFormat().format(today)}
        </time>
      </header>
      <main className={appStyles.habit_list}>
        {!isEditing ? (
          <>
            <MainScreen
              habits={habits}
              completedHabitIds={completedHabitIds}
              onCompleteHabit={onCompleteHabit}
              onUpdateHabit={onUpdateHabit}
              onEdit={() => setIsEditing(true)}
            />
            <NewHabit onAdd={onAddHabit} />
          </>
        ) : (
          <EditScreen
            habits={habits}
            onUpdateHabit={onUpdateHabit}
            onDone={() => setIsEditing(false)}
          />
        )}
      </main>
      <footer className={appStyles.footer}>
        <a
          href="https://github.com/serjilyashenko/HabitIT"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon className={appStyles.logo} />
        </a>
      </footer>
    </div>
  );
}
