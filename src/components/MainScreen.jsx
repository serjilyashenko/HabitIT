import { useState } from 'react';
import { ControlsBar } from './ControlsBar';
import mainScreenStyles from './MainScreen.module.css';
import { useHabit } from '../helpers/habit-context';

export function MainScreen({ onEdit }) {
  const { habits, completedHabitIds, onCompleteHabit, onUpdateHabit } =
    useHabit();
  const [isRename, setIsRename] = useState(false);

  return (
    <>
      <ControlsBar>
        {isRename ? (
          <button onClick={() => setIsRename(false)}>Done</button>
        ) : (
          <>
            <button onClick={() => setIsRename(true)}>Rename</button>
            <button onClick={onEdit}>Edit</button>
          </>
        )}
      </ControlsBar>
      <ul className={mainScreenStyles.habits}>
        {habits
          .filter(({ deleted }) => !deleted)
          .map(({ id, name }, index) => (
            <li key={id}>
              <label className={mainScreenStyles.habit_item}>
                <input
                  checked={completedHabitIds.includes(id)}
                  type="checkbox"
                  onChange={() => onCompleteHabit(id)}
                />
                {isRename ? (
                  <input
                    autoFocus={index === 0}
                    className={mainScreenStyles.habit_item__rename}
                    value={name}
                    onChange={(e) =>
                      onUpdateHabit(id, { name: e.target.value })
                    }
                  />
                ) : (
                  name
                )}
              </label>
            </li>
          ))}
      </ul>
    </>
  );
}
