import { useState } from 'react';
import { MainScreen } from './MainScreen';
import { EditScreen } from './EditScreen';

export function HabitList() {
  const [isEditing, setIsEditing] = useState(false);

  return !isEditing ? (
    <MainScreen onEdit={() => setIsEditing(true)} />
  ) : (
    <EditScreen onDone={() => setIsEditing(false)} />
  );
}
