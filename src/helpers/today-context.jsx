import { createContext, useContext, useEffect, useState } from 'react';
import { convertToLocalIsoDate } from '../utils/isoDates';
import { generateStartOfTheDay } from '../utils/dateFunctions';

const TodayContext = createContext(null);

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

export function useToday() {
  const context = useContext(TodayContext);

  if (!context) {
    throw new Error('useToday must be used within a TodayProvider');
  }

  return context;
}
