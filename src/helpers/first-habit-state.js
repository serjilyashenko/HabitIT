import { actualStorageVersion } from './memo/version';

export const getFirstState = function (localIsoDate) {
  return {
    v: actualStorageVersion,
    habits: [
      {
        id: 0,
        name: 'Your first habit',
        deleted: false,
      },
      {
        id: 1,
        name: 'Your second habit',
        deleted: false,
      },
      {
        id: 3,
        name: 'Deleted habit',
        deleted: true,
      },
    ],
    history: {
      ['2022-09-15T00:00']: [0, 1], // Without Z !
      [localIsoDate]: [0], // "2022-09-19T00:00" - Without Z !
    },
  };
};
