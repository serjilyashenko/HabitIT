import { useState } from 'react';
import { MainScreen } from './MainScreen';
import { EditScreen } from './EditScreen';
import { Analytics } from './Analytics';

const MAIN = 'MAIN';
const EDIT = 'EDIT';
const ANALYTICS = 'ANALYTICS';

export function HabitWorkSpace() {
  const [spaceState, setSpace] = useState(MAIN);

  switch (spaceState) {
    case EDIT:
      return <EditScreen onDone={() => setSpace(MAIN)} />;
    case ANALYTICS:
      return <Analytics onDone={() => setSpace(MAIN)} />;
    case MAIN:
    default:
      return (
        <MainScreen
          onAnalytics={() => setSpace(ANALYTICS)}
          onEdit={() => setSpace(EDIT)}
        />
      );
  }
}
