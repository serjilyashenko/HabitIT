import classNames from 'classnames';
import circleButtonStyles from './CircleButton.module.css';

export default function CircleButton({ positive, negative, onClick }) {
  return (
    <div
      role="button"
      tabIndex={1}
      onClick={onClick}
      className={classNames(circleButtonStyles.circle_button, {
        [circleButtonStyles.circle_button__positive]: positive,
        [circleButtonStyles.circle_button__negative]: negative,
      })}
    ></div>
  );
}
