export function startOfTheDay(dirtyDate) {
  const date = new Date(dirtyDate.getTime());
  date.setHours(0, 0, 0, 0);

  return date;
}

export function startOfMonth(dirtyDate) {
  const date = startOfTheDay(dirtyDate);
  date.setDate(1);

  return date;
}

export function startOfPrevMonth(dirtyDate) {
  const date = startOfMonth(dirtyDate);
  date.setMonth(date.getMonth() - 1);

  return date;
}

export function generateStartOfTheDay() {
  return startOfTheDay(new Date());
}
