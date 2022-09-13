import { useState } from 'react';
import { useHabitState } from '../hooks/habit-state';
import { MainScreen } from './MainScreen';
import { EditScreen } from './EditScreen';
import { NewHabit } from './NewHabit';
import { ErrorBoundary } from './ErrorBoundary';
import { ReactComponent as GitHubIcon } from '../assets/github.svg';
import appStyles from './App.module.css';
import { Header } from './Header';

export function App() {
  const {
    habits,
    completedHabitIds,
    onCompleteHabit,
    onAddHabit,
    onUpdateHabit,
  } = useHabitState();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ErrorBoundary>
      <Header />
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
    </ErrorBoundary>
  );
}
