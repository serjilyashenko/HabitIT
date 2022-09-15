export const getInitialState = function (isoDate) {
  return {
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
      [isoDate]: [0],
    },
  };
};
