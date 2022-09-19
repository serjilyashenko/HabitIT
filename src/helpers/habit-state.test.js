import { renderHook, act } from '@testing-library/react';
import { useHabitState } from './habit-state';

beforeEach(() => {
  jest.useRealTimers();
});

test('Initial state is calculated correctly', () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-09-17T08:12:30.153Z'));

  const { result } = renderHook(() => useHabitState());

  expect(result.current.completedHabitIds).toEqual([0]);
  expect(result.current.history).toMatchInlineSnapshot(`
    {
      "2022-09-15T00:00": [
        0,
        1,
      ],
      "2022-09-17T00:00": [
        0,
      ],
    }
  `);
});

test('Complete action applies to current day correctly', () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-09-17T08:12:30.153Z'));

  const { result } = renderHook(() => useHabitState());

  act(() => {
    result.current.onCompleteHabit(1);
  });

  expect(result.current.completedHabitIds).toEqual([0, 1]);
  expect(result.current.history).toMatchInlineSnapshot(`
    {
      "2022-09-15T00:00": [
        0,
        1,
      ],
      "2022-09-17T00:00": [
        0,
        1,
      ],
    }
  `);
});
