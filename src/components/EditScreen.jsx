import editScreenStyles from "./EditScreen.module.css";

export function EditScreen({ habits }) {
  return (
    <ul>
      {habits.map((habit) => (
        <li className={editScreenStyles.habit_item} key={habit.id}>
          {habit.name}
        </li>
      ))}
    </ul>
  );
}
