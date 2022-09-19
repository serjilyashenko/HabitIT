import { createContext, useContext, useEffect, useState } from 'react';
import { convertToLocalIsoDate, getStartOfTheDay } from '../utils/date';

const TodayContext = createContext(null);

export function TodayProvider({ children }) {
  const [today, setToday] = useState(getStartOfTheDay());

  useEffect(() => {
    function checkToday() {
      setToday((prev) => {
        const newToday = getStartOfTheDay();
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
