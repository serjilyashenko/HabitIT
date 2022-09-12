import newHabitStyles from './NewHabit.module.css';

export function NewHabit({ onAdd }) {
  function onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    onAdd(form.new_habit.value);
    form.reset();
  }

  return (
    <form className={newHabitStyles.new_habit_form} onSubmit={onSubmit}>
      <div className={newHabitStyles.new_habit_name_label}>
        <div className={newHabitStyles.new_habit_name_label_input_container}>
          <input
            name="new_habit"
            className={newHabitStyles.new_habit_name_label_input}
            placeholder="Your habit"
            required
          />
        </div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
