import { convertToLocalIsoDate } from '../utils/date';

export function getMonthHabitCount(history, localIsoMonth, habitId) {
  const entries = Object.entries(history);
  const habitDays = entries.filter(
    ([isoString, habits]) =>
      new Date(isoString).getMonth() === new Date(localIsoMonth).getMonth() &&
      habits.includes(habitId)
  );

  return habitDays.length;
}

export function getDoneHabitLocalIsoDates(history, localIsoMonth, habitId) {
  const entries = Object.entries(history);

  return entries
    .filter(
      ([isoString, habits]) =>
        new Date(isoString).getMonth() === new Date(localIsoMonth).getMonth() &&
        habits.includes(habitId)
    )
    .map(([isoString]) => convertToLocalIsoDate(new Date(isoString))); // TODO: get rid of convertToLocalIsoDate when migrate history to localIsoMonth
}
