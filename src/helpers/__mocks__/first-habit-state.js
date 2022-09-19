import { actualStorageVersion } from '../memo/version';

export const getFirstState = function (localIsoDate) {
  return {
    v: actualStorageVersion,
    habits: [
      {
        id: 0,
        name: 'First Test habit',
        deleted: false,
      },
      {
        id: 1,
        name: 'Second Test habit',
        deleted: false,
      },
      {
        id: 3,
        name: 'Deleted Test habit',
        deleted: true,
      },
    ],
    history: {
      ['2022-09-15T00:00']: [0, 1],
      [localIsoDate]: [0], // "2022-09-19T00:00" - Without Z !
    },
  };
};
