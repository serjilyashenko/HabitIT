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
            <li className={mainScreenStyles.habit_item} key={id}>
              <label>
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
        <label className={mainScreenStyles.new_habit_name_label}>
          <input
            name="new_habit"
            className={mainScreenStyles.new_habit_name_label_input}
            placeholder="Your habit"
          />
          <button type="submit">Add</button>
        </label>
      </form>
    </>
  );
}
