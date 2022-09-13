import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import * as MainScreenModule from './MainScreen';
import { CrushComponentMock } from '../../test/error';

afterEach(() => {
  jest.useRealTimers();
  jest.resetAllMocks(); // for mocks
  jest.restoreAllMocks(); // for spyOn-s
});

test('All habits are off on the next day', () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-04-10'));

  const { rerender } = render(<App />);
  userEvent.click(screen.getByLabelText(/first(.*)habit/i));
  userEvent.click(screen.getByLabelText(/second(.*)habit/i));

  jest.useFakeTimers().setSystemTime(new Date('2022-04-11'));
  rerender(<App />);

  expect(screen.getByLabelText(/first(.*)habit/i)).not.toBeChecked();
  expect(screen.getByLabelText(/second(.*)habit/i)).not.toBeChecked();
});

test('Don`t crushes if complete on the next day', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-04-10'));
  const { rerender } = render(<App />);

  jest.useFakeTimers().setSystemTime(new Date('2022-04-11'));
  rerender(<App />);

  expect(screen.getByLabelText(/first(.*)habit/i)).not.toBeChecked();

  userEvent.click(screen.getByLabelText(/first(.*)habit/i));

  await waitFor(expect(screen.getByLabelText(/first(.*)habit/i)).toBeChecked);
});

test('Shows error message if the app crushes', async () => {
  jest
    .spyOn(MainScreenModule, 'MainScreen')
    .mockImplementation(CrushComponentMock);
  jest.spyOn(console, 'error').mockImplementation(() => null);

  render(<App />);

  expect(screen.getByRole('heading')).toBeInTheDocument();
  expect(screen.getByRole('heading').innerHTML).toMatchInlineSnapshot(
    `"Oops...🐌"`
  );
  expect(console.error).toHaveBeenCalled();
});

test('MainScreen spyOn is restored', () => {
  expect(jest.isMockFunction(MainScreenModule.MainScreen)).toBeFalsy();
});
