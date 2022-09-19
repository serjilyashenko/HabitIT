import { actualStorageVersion } from './version';
import { convertToLocalIsoDate } from '../../utils/date';

function migrateToV2(state) {
  const historyEntriesV2 = Object.entries(state.history).map(
    ([isoString, data]) => [convertToLocalIsoDate(new Date(isoString)), data]
  );

  return { ...state, v: 2, history: Object.fromEntries(historyEntriesV2) };
}

export function migrate(state) {
  let result = { ...state, v: state.v || 1 };

  if (result.v < 2) {
    result = migrateToV2(result);
  }
  // if (state.v < 3) {
  //   result = migrateToV3(result);
  // }

  if (result.v !== actualStorageVersion) {
    throw new Error('>> Migrations fail');
  }

  return result;
}
