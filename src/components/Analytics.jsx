import { ControlsBar } from './ControlsBar';
import { useHabit } from '../helpers/habit-context';
import { convertToLocalIsoMonth, getTodayForBrowsersTZ } from '../utils/date';
import {
  getDoneHabitLocalIsoDates,
  getMonthHabitCount,
} from '../helpers/habit-analytics';
import Calendar from './Calendar';
import styles from './Analytics.module.css';

export function Analytics({ onDone }) {
  const today = getTodayForBrowsersTZ();
  const monthAgo = new Date(today.getTime());
  monthAgo.setMonth(today.getMonth() - 1);
  const currentLocalIsoMonth = convertToLocalIsoMonth(today);
  const currentMonthName = today.toLocaleString('default', { month: 'short' });
  const previousLocalIsoMonth = convertToLocalIsoMonth(monthAgo);
  const previousMonthName = monthAgo.toLocaleString('default', {
    month: 'short',
  });

  const { history, habits } = useHabit();

  return (
    <>
      <ControlsBar>
        <button onClick={onDone}>Done</button>
      </ControlsBar>
      {habits
        .filter((habit) => !habit.deleted)
        .map((habit) => (
          <section key={habit.id} className={styles.habit_section}>
            <h3>{habit.name}</h3>
            <div className={styles.calendar_block}>
              <figure className={styles.calendar_figure}>
                <figcaption>
                  {previousMonthName}:{' '}
                  <strong>
                    {getMonthHabitCount(
                      history,
                      previousLocalIsoMonth,
                      habit.id
                    )}
                  </strong>
                </figcaption>
                <Calendar
                  localIsoMonth={previousLocalIsoMonth}
                  doneLocalIsoDates={getDoneHabitLocalIsoDates(
                    history,
                    previousLocalIsoMonth,
                    habit.id
                  )}
                />
              </figure>
              <figure className={styles.calendar_figure}>
                <figcaption>
                  {currentMonthName}:{' '}
                  <strong>
                    {getMonthHabitCount(
                      history,
                      currentLocalIsoMonth,
                      habit.id
                    )}
                  </strong>
                </figcaption>
                <Calendar
                  localIsoMonth={currentLocalIsoMonth}
                  doneLocalIsoDates={getDoneHabitLocalIsoDates(
                    history,
                    currentLocalIsoMonth,
                    habit.id
                  )}
                  legendRight
                />
              </figure>
            </div>
          </section>
        ))}
    </>
  );
}
