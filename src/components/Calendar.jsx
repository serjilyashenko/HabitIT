import classNames from 'classnames';
import {
  convertToLocalIsoDate,
  convertToLocalIsoMonth,
} from '../utils/isoDates';
import styles from './Calendar.module.css';

export default function Calendar({
  localIsoMonth,
  doneLocalIsoDates,
  legendRight,
}) {
  const dateCounter = new Date(localIsoMonth);
  dateCounter.setDate(1);
  let dayEntities = [];
  let isFuture = false;

  while (convertToLocalIsoMonth(dateCounter) === localIsoMonth) {
    const date = new Date(dateCounter.getTime());
    const localIsoDate = convertToLocalIsoDate(date);
    const isToday = date.toDateString() === new Date().toDateString();
    dayEntities.push({
      day: date.getDate(),
      localIsoDate,
      weekday: date.getDay() || 7, // [mon, tue, wed, thu, fri, sat, sun] : [1, 2, 3, 4, 5, 6, 0] -> [1, 2, 3, 4, 5, 6, 7]
      isToday,
      isDone: doneLocalIsoDates.includes(localIsoDate),
      isFuture,
    });
    if (isToday) {
      isFuture = true;
    }
    dateCounter.setDate(dateCounter.getDate() + 1);
  }

  const labelElements = ['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((it, index) => (
    <div
      key={it + index}
      role="rowheader"
      className={classNames(styles.day, styles.day__header)}
    >
      {it}
    </div>
  ));

  return (
    <div className={styles.calendar} role="table">
      {!legendRight && labelElements}
      {dayEntities.map(
        ({ localIsoDate, day, weekday, isToday, isDone, isFuture }, index) => (
          <div
            key={day}
            role="cell"
            className={classNames(styles.day, {
              [styles.day__today]: isToday,
              [styles.day__done]: isDone,
              [styles.day__disabled]: isFuture,
            })}
            style={{
              gridRowStart: index === 0 ? weekday : 'unset',
            }}
          >
            <time dateTime={localIsoDate}>{day}</time>
          </div>
        )
      )}
      {legendRight && labelElements}
    </div>
  );
}
