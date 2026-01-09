import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import * as mainScreenModule from './MainScreen';
import * as habitStateModule from '../helpers/habit-state';
import { CrushComponentMock } from '../../test/error';

vi.mock('../helpers/first-habit-state');

beforeEach(() => {
  vi.useRealTimers();
  vi.resetAllMocks(); // for mocks
  vi.restoreAllMocks(); // for spyOn-s
});

test('It is possible to complete and un-complete a habit', async () => {
  render(<App />);

  const firstHabit = screen.getByLabelText(/first(.*)habit/i);
  const secondHabit = screen.getByLabelText(/second(.*)habit/i);

  expect(firstHabit).toBeChecked();
  expect(secondHabit).not.toBeChecked();

  await userEvent.click(firstHabit);
  await userEvent.click(secondHabit);
  expect(firstHabit).not.toBeChecked();
  expect(secondHabit).toBeChecked();

  await userEvent.click(firstHabit);
  await userEvent.click(secondHabit);
  expect(firstHabit).toBeChecked();
  expect(secondHabit).not.toBeChecked();
});

test('All habits are off on the next day', () => {
  vi.useFakeTimers().setSystemTime(new Date('2022-04-10'));

  const { rerender } = render(<App />);
  userEvent.click(screen.getByLabelText(/first(.*)test(.*)habit/i));
  userEvent.click(screen.getByLabelText(/second(.*)habit/i));

  vi.useFakeTimers().setSystemTime(new Date('2022-04-11'));
  rerender(<App />);

  expect(screen.getByLabelText(/first(.*)habit/i)).not.toBeChecked();
  expect(screen.getByLabelText(/second(.*)habit/i)).not.toBeChecked();
});

test('Don`t crushes if complete on the next day', async () => {
  vi.useFakeTimers().setSystemTime(new Date('2022-04-10'));
  render(<App />);

  vi.useFakeTimers().setSystemTime(new Date('2022-04-11'));
  fireEvent.focus(window); // click browser tab

  expect(screen.getByLabelText(/first(.*)habit/i)).not.toBeChecked();

  userEvent.click(screen.getByLabelText(/first(.*)habit/i));

  await waitFor(expect(screen.getByLabelText(/first(.*)habit/i)).toBeChecked);
});

test('Shows error message if a component crush the app', async () => {
  vi.spyOn(mainScreenModule, 'MainScreen').mockImplementation(
    CrushComponentMock
  );
  vi.spyOn(console, 'error').mockImplementation(() => null);

  render(<App />);

  expect(screen.getByRole('heading')).toBeInTheDocument();
  expect(screen.getByRole('heading').innerHTML).toMatchInlineSnapshot(
    `"Oops...🐌"`
  );
  expect(console.error).toHaveBeenCalled();
});

test('MainScreen spyOn is restored', () => {
  expect(vi.isMockFunction(mainScreenModule.MainScreen)).toBeFalsy();
});

test('Shows error message if the habit-state crush the app', async () => {
  vi.spyOn(habitStateModule, 'useHabitState').mockImplementation(
    CrushComponentMock
  );
  vi.spyOn(console, 'error').mockImplementation(() => null);

  render(<App />);

  expect(screen.getByRole('heading')).toBeInTheDocument();
  expect(screen.getByRole('heading').innerHTML).toMatchInlineSnapshot(
    `"Oops...🐌"`
  );
  expect(console.error).toHaveBeenCalled();
});
