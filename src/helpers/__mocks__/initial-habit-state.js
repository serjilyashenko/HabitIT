export const getInitialState = function (isoDate) {
  return {
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
      [isoDate]: [0],
    },
  };
};
