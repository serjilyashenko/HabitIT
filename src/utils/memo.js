import { localStorageKey } from '../const';

export function getMemoState() {
  const memoState = localStorage.getItem(localStorageKey);
  return JSON.parse(memoState);
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
