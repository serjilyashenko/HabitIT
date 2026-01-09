import { useEffect, useState } from 'react';
import { TodayContext } from '../contexts/today-context.js';
import { convertToLocalIsoDate } from '../utils/isoDates';
import { generateStartOfTheDay } from '../utils/dateFunctions';

export function TodayProvider({ children }) {
  const [today, setToday] = useState(generateStartOfTheDay());

  useEffect(() => {
    function checkToday() {
      setToday((prev) => {
        const newToday = generateStartOfTheDay();
        if (convertToLocalIsoDate(newToday) !== convertToLocalIsoDate(prev)) {
          return newToday;
        } else {
          return prev;
        }
      });
    }

    window.addEventListener('focus', checkToday);

    return () => window.removeEventListener('focus', checkToday);
  }, []);

  return (
    <TodayContext.Provider value={today}>{children}</TodayContext.Provider>
  );
}
