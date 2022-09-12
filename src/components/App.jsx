import { useState } from 'react';
import { useHabitState } from '../hooks/habit-state';
import { getToday } from '../utils/date';
import { MainScreen } from './MainScreen';
import { EditScreen } from './EditScreen';
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
          <MainScreen
            habits={habits}
            completedHabitIds={completedHabitIds}
            onCompleteHabit={onCompleteHabit}
            onEdit={() => setIsEditing(true)}
            addHabit={onAddHabit}
          />
        ) : (
          <EditScreen
            habits={habits}
            onUpdateHabit={onUpdateHabit}
            onDone={() => setIsEditing(false)}
          />
        )}
      </main>
    </div>
  );
}
