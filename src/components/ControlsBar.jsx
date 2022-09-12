import controlsBarStyle from './ControlsBar.module.css';

export function ControlsBar({ children }) {
  return <div className={controlsBarStyle.controls_bar}>{children}</div>;
}
