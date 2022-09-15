export function getMonthHabitCount(history, month, habitId) {
  const entries = Object.entries(history);
  const habitDays = entries.filter(([isoString, habits]) => {
    return new Date(isoString).getMonth() === month && habits.includes(habitId);
  });

  return habitDays.length;
}
