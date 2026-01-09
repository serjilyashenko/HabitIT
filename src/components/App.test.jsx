import { render, screen, fireEvent } from '@testing-library/react';
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

function setup() {
  const user = userEvent.setup();
  return {
    user,
    ...render(<App />),
  };
}

test('It is possible to complete and un-complete a habit', async () => {
  const { user } = setup();

  const firstHabit = screen.getByLabelText(/first(.*)habit/i);
  const secondHabit = screen.getByLabelText(/second(.*)habit/i);

  expect(firstHabit).toBeChecked();
  expect(secondHabit).not.toBeChecked();

  await user.click(firstHabit);
  await user.click(secondHabit);
  expect(firstHabit).not.toBeChecked();
  expect(secondHabit).toBeChecked();

  await user.click(firstHabit);
  await user.click(secondHabit);
  expect(firstHabit).toBeChecked();
  expect(secondHabit).not.toBeChecked();
});

test('All habits are off on the next day', async () => {
  vi.setSystemTime(new Date('2022-04-10'));

  const { user } = setup();
  await user.click(screen.getByLabelText(/first(.*)test(.*)habit/i));
  await user.click(screen.getByLabelText(/second(.*)habit/i));

  vi.setSystemTime(new Date('2022-04-11'));
  await fireEvent.focus(window);

  expect(screen.getByLabelText(/first(.*)habit/i)).not.toBeChecked();
  expect(screen.getByLabelText(/second(.*)habit/i)).not.toBeChecked();
});

test('Don`t crushes if complete on the next day', async () => {
  vi.setSystemTime(new Date('2022-04-10'));

  const { user } = setup();

  expect(screen.getByLabelText(/first(.*)habit/i)).toBeChecked();
  vi.setSystemTime(new Date('2022-04-11'));
  await fireEvent.focus(window);

  await user.click(screen.getByLabelText(/first(.*)habit/i));

  expect(screen.getByLabelText(/first(.*)habit/i)).toBeChecked();
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
