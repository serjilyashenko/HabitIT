// Browser's TZ Today
export function getTodayForBrowsersTZ() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today;
}

// Browser's (Local) TZ Day
export function convertToLocalIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00`; // ! without Z
}

// Browser's (Local) TZ Month
export function convertToLocalIsoMonth(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${year}-${month}T00:00`; // ! without Z
}
