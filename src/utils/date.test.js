import { getLocalIsoToday } from './date';

beforeEach(() => {
  jest.useRealTimers();
});

test('getLocalIsoToday returns correct local iso string without TZ tire (without Z)', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-09-15T08:12:30.153Z'));

  const localIsoToday = getLocalIsoToday();

  expect(localIsoToday).toBe('2022-09-15T00:00');
});
