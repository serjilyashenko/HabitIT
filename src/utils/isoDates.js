import { generateStartOfTheDay } from './dateFunctions';

// Local (despite TZ!) Day
export function convertToLocalIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00`; // ! without Z
}

// Local (despite TZ!) TZ Month
export function convertToLocalIsoMonth(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${year}-${month}T00:00`; // ! without Z
}

// Local (despite TZ!) Today
export function getLocalIsoToday() {
  const startOfTheDay = generateStartOfTheDay();
  return convertToLocalIsoDate(startOfTheDay);
}
