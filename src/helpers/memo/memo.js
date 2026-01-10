import {
  actualStorageVersion,
  localStorageKey,
  constructLocalStorageKey,
  veryFirstStorageVersion,
} from './version';
import { migrate } from './migrations';
import { downloadBlob } from '../persistence/download-blob.js';
import { shareFile } from '../persistence/share-file.js';

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

export async function backupMemoState() {
  const memoState = localStorage.getItem(localStorageKey);
  const fileName = 'habit-backup.json';
  const blob = new Blob([memoState], { type: 'application/json' });

  if (navigator?.share) {
    try {
      await shareFile(new File([blob], fileName));
    } catch (e) {
      if (e.name !== 'AbortError') {
        downloadBlob(blob, fileName);
      }
    }
  } else {
    downloadBlob(blob, fileName);
  }
}
