import { ControlsBar } from './ControlsBar';
import { NewHabit } from './NewHabit';
import mainScreenStyles from './MainScreen.module.css';

export function MainScreen({
  habits,
  completedHabitIds,
  onCompleteHabit,
  onEdit,
  addHabit,
}) {
  return (
    <>
      <ControlsBar>
        <button onClick={onEdit}>Edit</button>
      </ControlsBar>
      <ul className={mainScreenStyles.habits}>
        {habits
          .filter(({ deleted }) => !deleted)
          .map(({ id, name }) => (
            <li key={id}>
              <label className={mainScreenStyles.habit_item}>
                <input
                  checked={completedHabitIds.includes(id)}
                  type="checkbox"
                  onChange={() => onCompleteHabit(id)}
                />
                {name}
              </label>
            </li>
          ))}
      </ul>
      <NewHabit onAdd={addHabit} />
    </>
  );
}
