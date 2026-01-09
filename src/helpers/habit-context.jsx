import { useHabitState } from './habit-state';
import { HabitContext } from '../contexts/habit-context.js';

export function HabitProvider({ children }) {
  const habitState = useHabitState();

  return (
    <HabitContext.Provider value={habitState}>{children}</HabitContext.Provider>
  );
}
