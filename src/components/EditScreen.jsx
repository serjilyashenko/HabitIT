import { useHabit } from '../helpers/habit-context';
import CircleButton from './CircleButton';
import { ControlsBar } from './ControlsBar';
import { NewHabit } from './NewHabit';
import editScreenStyles from './EditScreen.module.css';

export function EditScreen({ onDone }) {
  const { habits, onUpdateHabit } = useHabit();

  const activeHabits = habits.filter(({ deleted }) => !deleted);
  const deletedHabits = habits.filter(({ deleted }) => deleted);

  function onDelete(id) {
    onUpdateHabit(id, { deleted: true });
  }

  function onRestore(id) {
    onUpdateHabit(id, { deleted: false });
  }

  return (
    <>
      <ControlsBar>
        <button onClick={onDone}>Done</button>
      </ControlsBar>
      <ul>
        {activeHabits.map((habit) => (
          <li key={habit.id} className={editScreenStyles.habit_item_container}>
            <div className={editScreenStyles.habit_item_content}>
              {/* By default Safari doesn't support buttons' focus */}
              <div
                className={editScreenStyles.select_button_wrapper}
                tabIndex={1}
              >
                <CircleButton negative />
              </div>
              {habit.name}
            </div>
            <div className={editScreenStyles.delete_submit}>
              <button
                className={editScreenStyles.alert_button}
                onClick={() => onDelete(habit.id)}
                aria-label="delete"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <NewHabit />

      <h6>Deleted:</h6>
      <ul>
        {deletedHabits.map((habit) => (
          <li key={habit.id} className={editScreenStyles.habit_item_container}>
            <div className={editScreenStyles.habit_item_content}>
              <CircleButton positive onClick={() => onRestore(habit.id)} />
              {habit.name}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
