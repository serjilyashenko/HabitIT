import { useEffect, useMemo, useReducer } from 'react';
import { useToday } from './today-context';
import { convertToLocalIsoDate, getLocalIsoToday } from '../utils/date';
import { getMemoState, setMemoState } from './memo/memo';
import { getFirstState } from './first-habit-state';

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
      const localIsoToday = getLocalIsoToday();
      const completed = state.history[localIsoToday] || [];
      const newCompleted = completed.includes(action.id)
        ? completed.filter((id) => id !== action.id)
        : [...completed, action.id];

      return {
        ...state,
        history: {
          ...state.history,
          [localIsoToday]: newCompleted,
        },
      };
    }
  }
}

export function useHabitState() {
  const today = useToday();
  const localIsoToday = convertToLocalIsoDate(today);

  const initialState = useMemo(() => {
    return getMemoState() || getFirstState(localIsoToday);
  }, [localIsoToday]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { habits, history } = state;
  const completedHabitIds = history?.[localIsoToday] || [];

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
    history,
    completedHabitIds,
    onAddHabit,
    onUpdateHabit,
    onCompleteHabit,
  };
}
