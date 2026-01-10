import { useRef } from 'react';
import { useHabit } from '../hooks/use-habit.js';
import { readJsonFile } from '../helpers/file/read-json-file.js';

export function RestoreFromBackup() {
  const { onRestoreFromBackup } = useHabit();
  const fileInput = useRef();

  function onRestoreClick() {
    if (
      confirm(
        '⚠️ Current data will be erased!\nPlease make a backup before proceeding'
      )
    ) {
      fileInput?.current?.click();
    }
  }

  async function onRestoreConfirm(event) {
    const file = event?.target?.files?.[0];
    if (!file) {
      alert('Something went wrong!');
      fileInput?.current?.clear();
      return;
    }
    try {
      const state = await readJsonFile(file);
      onRestoreFromBackup(state);
      alert('Restored successfully!');
    } catch (error) {
      console.error('>>', error);
      alert(error.message);
    }
  }

  return (
    <>
      <button onClick={onRestoreClick}>Restore</button>
      <input
        ref={fileInput}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={onRestoreConfirm}
      />
    </>
  );
}
