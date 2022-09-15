import { ControlsBar } from './ControlsBar';

export function Analytics({ onDone }) {
  return (
    <>
      <ControlsBar>
        <button onClick={onDone}>Done</button>
      </ControlsBar>
      <h1>Hello Analytics</h1>
    </>
  );
}
