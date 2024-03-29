import { ControlsBar } from './ControlsBar';
import { useToday } from '../helpers/today-context';
import { useHabit } from '../helpers/habit-context';
import { convertToLocalIsoMonth } from '../utils/isoDates';
import { backupMemoState } from '../helpers/memo/memo';
import {
  getDoneHabitLocalIsoDates,
  getMonthHabitCount,
} from '../helpers/habit-analytics';
import Calendar from './Calendar';
import styles from './Analytics.module.css';
import { startOfPrevMonth } from '../utils/dateFunctions';

export function Analytics({ onDone }) {
  const today = useToday();
  const startOfPreviousMonth = startOfPrevMonth(today);

  const currentLocalIsoMonth = convertToLocalIsoMonth(today);
  const currentMonthName = today.toLocaleString('default', { month: 'short' });

  const previousLocalIsoMonth = convertToLocalIsoMonth(startOfPreviousMonth);
  const previousMonthName = startOfPreviousMonth.toLocaleString('default', {
    month: 'short',
  });

  const { history, habits } = useHabit();

  return (
    <>
      <ControlsBar>
        <button onClick={backupMemoState}>Backup</button>
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
