import { HabitProvider } from '../helpers/habit-context';
import { ErrorBoundary } from './ErrorBoundary';
import { Header } from './Header';
import { HabitWorkSpace } from './HabitWorkSpace';
import { Footer } from './Footer';
import appStyles from './App.module.css';

export function App() {
  return (
    <ErrorBoundary>
      <HabitProvider>
        <Header />
        <main className={appStyles.habit_work_space}>
          <HabitWorkSpace />
        </main>
        <Footer />
      </HabitProvider>
    </ErrorBoundary>
  );
}
