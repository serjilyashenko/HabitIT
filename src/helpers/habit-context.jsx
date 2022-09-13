import { createContext, useContext } from 'react';
import { useHabitState } from './habit-state';

const HabitContext = createContext(null);

export function HabitProvider({ children }) {
  const habitState = useHabitState();

  return (
    <HabitContext.Provider value={habitState}>{children}</HabitContext.Provider>
  );
}

export function useHabit() {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error('useHabit must be used within a HabitProvider');
  }

  return context;
}
