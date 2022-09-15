import { ControlsBar } from './ControlsBar';
import { useHabit } from '../helpers/habit-context';
import { getTodayForBrowsersTZ } from '../utils/date';
import { getMonthHabitCount } from '../helpers/habit-analytics';

export function Analytics({ onDone }) {
  const today = getTodayForBrowsersTZ();
  const monthAgo = new Date(today.getTime());
  monthAgo.setMonth(today.getMonth() - 1);

  const { history, habits } = useHabit();

  return (
    <>
      <ControlsBar>
        <button onClick={onDone}>Done</button>
      </ControlsBar>
      <table width="100%" role="diagram">
        <thead>
          <tr>
            <th></th>
            <th>{monthAgo.toLocaleString('default', { month: 'short' })}</th>
            <th>{today.toLocaleString('default', { month: 'short' })}</th>
          </tr>
        </thead>
        <tbody>
          {habits
            .filter((habit) => !habit.deleted)
            .map((habit) => (
              <tr key={habit.id}>
                <td>{habit.name}</td>
                <td align="right">
                  {getMonthHabitCount(history, monthAgo.getMonth(), habit.id)}
                </td>
                <td align="right">
                  {getMonthHabitCount(history, today.getMonth(), habit.id)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
