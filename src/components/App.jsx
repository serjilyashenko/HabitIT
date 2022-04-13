import { useReducer, useEffect, useState } from "react";
import { getMemoState, setMemoState } from "../utils/memo";
import { getToday } from "../utils/date";
import appStyles from "./App.module.css";

const getInitialState = function (isoDate) {
  return {
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
      const completed = state.history[getToday().toISOString()] || [];
      const newCompleted = completed.includes(action.id)
        ? completed.filter((id) => id !== action.id)
        : [...completed, action.id];

      return {
        ...state,
        history: {
          ...state.history,
          [getToday().toISOString()]: newCompleted,
        },
      };
  }
}

export default function App() {
  const todayIso = getToday().toISOString();
  // TODO: move to AppState abstraction
  const [state, dispatch] = useReducer(
    reducer,
    getMemoState() || getInitialState(todayIso)
  );
  const { habits, history, error } = state;
  const completedHabitIds = history[todayIso] || [];

  // TODO: move to AppState abstraction
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

  // TODO: implement EditMode
  // const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={appStyles.app}>
      <header className={appStyles.app_header}>
        <h1>HabbitIt</h1>
        <p>{new Intl.DateTimeFormat().format(getToday())}</p>
      </header>
      <main className={appStyles.habit_list}>
        {/*TODO: implement EditMode*/}
        {/*<button>Edit</button>*/}
        {error ? (
          <div>Error: Something Went Wrong</div>
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
      </main>
    </div>
  );
}
