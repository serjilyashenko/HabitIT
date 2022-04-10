import { useReducer, useEffect } from "react";
import { getMemoState, setMemoState } from "../utils/memo";
import appStyles from "./App.module.css";

const now = new Date();
now.setHours(0, 0, 0, 0);
const isoDate = now.toISOString();
const dateFormatted = new Intl.DateTimeFormat().format(now);

const initialState = getMemoState() || {
  habits: [
    {
      id: 0,
      name: "Your first habit",
      deleted: false,
    },
    {
      id: 1,
      name: "Your second habit",
      deleted: false,
    },
    {
      id: 3,
      name: "Deleted habit",
      deleted: true,
    },
  ],
  history: {
    [isoDate]: [0],
  },
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_HABIT":
      return {
        ...state,
        habits: [
          ...state.habits,
          {
            id: action.id,
            name: action.name,
            deleted: false,
          },
        ],
      };
    case "HABIT_COMPLETE":
      const completed = state.history[isoDate];
      const newCompleted = completed.includes(action.id)
        ? completed.filter((id) => id !== action.id)
        : [...completed, action.id];

      return {
        ...state,
        history: {
          ...state.history,
          [isoDate]: newCompleted,
        },
      };
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { habits, history, error } = state;
  const completedHabitIds = history[isoDate] || [];

  useEffect(() => {
    setMemoState(state);
  }, [state]);

  function onAddSubmit(e) {
    e.preventDefault();
    const newId = Math.max(...habits.map((habit) => Number(habit.id))) + 1;
    dispatch({ type: "ADD_HABIT", id: newId, name: e.target.new_habit.value });
  }

  function onCompleteHabit(habitId) {
    dispatch({ type: "HABIT_COMPLETE", id: habitId });
  }

  return (
    <div className={appStyles.app}>
      <header className={appStyles.app_header}>
        <h1>HabbitIt</h1>
        <p>{dateFormatted}</p>
      </header>
      <main className={appStyles.habit_list}>
        <form className={appStyles.new_habit_form} onSubmit={onAddSubmit}>
          <label className={appStyles.new_habit_name_label}>
            <input
              autoFocus
              name="new_habit"
              className={appStyles.new_habit_name_label_input}
              placeholder="Your habit"
            />
            <button type="submit">Add</button>
          </label>
        </form>
        {error ? (
          <div>Error</div>
        ) : (
          <ul className={appStyles.habits}>
            {habits
              .filter(({ deleted }) => !deleted)
              .map(({ id, name }) => (
                <li className={appStyles.habit_item} key={id}>
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
        )}
      </main>
    </div>
  );
}