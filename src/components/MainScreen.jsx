import mainScreenStyles from './MainScreen.module.css';

export function MainScreen({
  habits,
  completedHabitIds,
  onCompleteHabit,
  addHabit,
}) {
  function onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    addHabit(form.new_habit.value);
    form.reset();
  }

  return (
    <>
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
      <form className={mainScreenStyles.new_habit_form} onSubmit={onSubmit}>
        <div className={mainScreenStyles.new_habit_name_label}>
          <div
            className={mainScreenStyles.new_habit_name_label_input_container}
          >
            <input
              name="new_habit"
              className={mainScreenStyles.new_habit_name_label_input}
              placeholder="Your habit"
            />
          </div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
}
