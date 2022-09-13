import { HabitProvider } from '../helpers/habit-context';
import { ErrorBoundary } from './ErrorBoundary';
import { Header } from './Header';
import { HabitList } from './HabitList';
import { Footer } from './Footer';
import appStyles from './App.module.css';

export function App() {
  return (
    <ErrorBoundary>
      <Header />
      <main className={appStyles.habit_list}>
        <HabitProvider>
          <HabitList />
        </HabitProvider>
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
