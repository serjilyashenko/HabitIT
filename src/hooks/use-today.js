import { useContext } from 'react';
import { TodayContext } from '../contexts/today-context.js';

export function useToday() {
  const context = useContext(TodayContext);

  if (!context) {
    throw new Error('useToday must be used within a TodayProvider');
  }

  return context;
}
