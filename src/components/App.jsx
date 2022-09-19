import { ErrorBoundary } from './ErrorBoundary';
import { TodayProvider } from '../helpers/today-context';
import { HabitProvider } from '../helpers/habit-context';
import { Header } from './Header';
import { HabitWorkSpace } from './HabitWorkSpace';
import { Footer } from './Footer';
import appStyles from './App.module.css';

export function App() {
  return (
    <ErrorBoundary>
      <TodayProvider>
        <HabitProvider>
          <Header />
          <main className={appStyles.habit_work_space}>
            <HabitWorkSpace />
          </main>
        </HabitProvider>
      </TodayProvider>
      <Footer />
    </ErrorBoundary>
  );
}
