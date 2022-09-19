export function getMonthHabitCount(history, localIsoMonth, habitId) {
  const entries = Object.entries(history);
  const habitDays = entries.filter(
    ([localIsoDate, habits]) =>
      new Date(localIsoDate).getMonth() ===
        new Date(localIsoMonth).getMonth() && habits.includes(habitId)
  );

  return habitDays.length;
}

export function getDoneHabitLocalIsoDates(history, localIsoMonth, habitId) {
  const entries = Object.entries(history);

  return entries
    .filter(
      ([localIsoDate, habits]) =>
        new Date(localIsoDate).getMonth() ===
          new Date(localIsoMonth).getMonth() && habits.includes(habitId)
    )
    .map(([localIsoDate]) => localIsoDate);
}
