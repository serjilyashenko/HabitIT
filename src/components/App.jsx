import { useReducer, useEffect, useState, useMemo } from "react";
import { getMemoState, setMemoState } from "../utils/memo";
import { getToday } from "../utils/date";
import { MainScreen } from "./MainScreen";
import { EditScreen } from "./EditScreen";
import appStyles from "./App.module.css";

const getInitialState = function (isoDate) {
  // This is to try to track mobile safari clear localStorage problem
  localStorage.setItem("initialization-date", isoDate);

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
      const newId =
        Math.max(...state.habits.map((habit) => Number(habit.id))) + 1;
      return {
        ...state,
        habits: [
          ...state.habits,
          {
            id: newId,
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

  const initialState = useMemo(() => {
    return getMemoState() || getInitialState(todayIso);
  }, [todayIso]);

  // TODO: move to AppState abstraction
  const [state, dispatch] = useReducer(reducer, initialState);
  const { habits, history, error } = state;
  const completedHabitIds = history?.[todayIso] || [];

  // TODO: move to AppState abstraction
  useEffect(() => {
    if (initialState !== state) {
      setMemoState(state);
    }
  }, [state]);

  function addHabit(title) {
    dispatch({ type: "ADD_HABIT", name: title });
  }

  function onCompleteHabit(habitId) {
    dispatch({ type: "HABIT_COMPLETE", id: habitId });
  }

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={appStyles.app}>
      <header className={appStyles.app_header}>
        <h1>HabbitIt</h1>
        <p>{new Intl.DateTimeFormat().format(getToday())}</p>
      </header>
      <main className={appStyles.habit_list}>
        {error ? (
          <div>Error: Something Went Wrong</div>
        ) : (
          <>
            <div className={appStyles.controls_bar}>
              <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "❌" : "📝"}
              </button>
            </div>
            {!isEditing ? (
              <MainScreen
                habits={habits}
                completedHabitIds={completedHabitIds}
                onCompleteHabit={onCompleteHabit}
                addHabit={addHabit}
              />
            ) : (
              <EditScreen />
            )}
          </>
        )}
      </main>
    </div>
  );
}
