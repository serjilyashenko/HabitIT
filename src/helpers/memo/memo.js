import {
  actualStorageVersion,
  localStorageKey,
  constructLocalStorageKey,
  veryFirstStorageVersion,
} from './version';
import { migrate } from './migrations';

export function getMemoState() {
  for (let v = actualStorageVersion; v >= veryFirstStorageVersion; v--) {
    const localStorageKey = constructLocalStorageKey(v);
    const memoStateString = localStorage.getItem(localStorageKey);
    const memoState = JSON.parse(memoStateString); // explicitly don't use try..catch to allow ErrorBoundary to do its job

    if (memoState) {
      return migrate(memoState);
    }
  }
  return null;
}

export function setMemoState(state) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

export function backupMemoState() {
  const memoState = localStorage.getItem(localStorageKey);
  const blob = new Blob([memoState], { type: 'text/plain' });

  if (navigator?.share) {
    navigator.share({
      files: [new File([blob], 'habit-backup.txt')],
    });
  } else {
    const link = document.createElement('a');

    link.download = 'habit-backup.txt';
    link.href = URL.createObjectURL(blob);
    link.click();
  }
}
