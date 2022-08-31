import editScreenStyles from './EditScreen.module.css';
import classNames from 'classnames';

export function EditScreen({ habits, onUpdateHabit }) {
  function onDelete(id) {
    onUpdateHabit(id, { deleted: true });
  }

  function onRestore(id) {
    onUpdateHabit(id, { deleted: false });
  }

  return (
    <>
      <ul>
        {habits
          .filter(({ deleted }) => !deleted)
          .map((habit) => (
            <li
              className={editScreenStyles.habit_item_container}
              key={habit.id}
            >
              <div className={editScreenStyles.habit_item_content}>
                {/* By default Safari doesn't support buttons' foucs */}
                <div
                  className={editScreenStyles.select_button_wrapper}
                  tabIndex={1}
                >
                  <button
                    className={classNames(
                      editScreenStyles.select_button,
                      editScreenStyles.select_button__alert
                    )}
                  >
                    –
                  </button>
                </div>
                {habit.name}
              </div>
              <div className={editScreenStyles.delete_submit}>
                <button
                  className={editScreenStyles.alert_button}
                  onClick={() => onDelete(habit.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      <h6>Deleted:</h6>
      <ul>
        {habits
          .filter(({ deleted }) => deleted)
          .map((habit) => (
            <li
              key={habit.id}
              className={editScreenStyles.habit_item_container}
            >
              <div className={editScreenStyles.habit_item_content}>
                <button
                  className={editScreenStyles.select_button}
                  onClick={() => onRestore(habit.id)}
                >
                  +
                </button>
                {habit.name}
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
