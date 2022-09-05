import { useEffect, useMemo, useReducer } from 'react';
import { getToday } from '../utils/date';
import { getMemoState, setMemoState } from '../utils/memo';

export const getInitialState = function (isoDate) {
  return {
    habits: [
      {
        id: 0,
        name: 'Your first habit',
        deleted: false,
      },
      {
        id: 1,
        name: 'Your second habit',
        deleted: false,
      },
      {
        id: 3,
        name: 'Deleted habit',
        deleted: true,
      },
    ],
    history: {
      [isoDate]: [0],
    },
    error: null,
  };
};

export function reducer(state, action) {
  switch (action.type) {
    case 'ADD_HABIT': {
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
    }
    case 'UPDATE_HABIT': {
      return {
        ...state,
        habits: state.habits.map((habit) => {
          if (action.id === habit.id) {
            return {
              ...habit,
              ...action.override,
            };
          }
          return habit;
        }),
      };
    }
    case 'HABIT_COMPLETE': {
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
}

export function useHabitState() {
  const todayIso = getToday().toISOString();

  const initialState = useMemo(() => {
    return getMemoState() || getInitialState(todayIso);
  }, [todayIso]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { habits, history, error } = state;
  const completedHabitIds = history?.[todayIso] || [];

  useEffect(() => {
    if (initialState !== state) {
      setMemoState(state);
    }
  }, [state]);

  function onAddHabit(title) {
    dispatch({ type: 'ADD_HABIT', name: title });
  }

  function onUpdateHabit(habitId, override) {
    dispatch({ type: 'UPDATE_HABIT', id: habitId, override });
  }

  function onCompleteHabit(habitId) {
    dispatch({ type: 'HABIT_COMPLETE', id: habitId });
  }

  return {
    habits,
    error,
    completedHabitIds,
    onAddHabit,
    onUpdateHabit,
    onCompleteHabit,
  };
}
