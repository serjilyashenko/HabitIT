import { useState } from 'react';
import { useHabitState } from '../hooks/habit-state';
import { getToday } from '../utils/date';
import { MainScreen } from './MainScreen';
import { EditScreen } from './EditScreen';
import appStyles from './App.module.css';

export default function App() {
  const {
    habits,
    error,
    completedHabitIds,
    onCompleteHabit,
    onAddHabit,
    onUpdateHabit,
  } = useHabitState();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={appStyles.app}>
      <header className={appStyles.app_header}>
        <h1>HabitIt🐌</h1>
        <time>{new Intl.DateTimeFormat().format(getToday())}</time>
      </header>
      <main className={appStyles.habit_list}>
        {error && <div>Error: Something Went Wrong</div>}

        {!error && (
          <>
            <div className={appStyles.controls_bar}>
              <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Done' : 'Edit'}
              </button>
            </div>
            {!isEditing ? (
              <MainScreen
                habits={habits}
                completedHabitIds={completedHabitIds}
                onCompleteHabit={onCompleteHabit}
                addHabit={onAddHabit}
              />
            ) : (
              <EditScreen habits={habits} onUpdateHabit={onUpdateHabit} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
