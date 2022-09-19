import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HabitProvider } from '../helpers/habit-context';
import { HabitWorkSpace } from './HabitWorkSpace';

jest.mock('../helpers/first-habit-state');

beforeEach(() => {
  jest.spyOn(localStorage.__proto__, 'getItem').mockImplementation(() => null);
});

afterEach(() => {
  jest.resetAllMocks(); // for mocks
  jest.restoreAllMocks(); // for spyOn-s
});

test('It shows habit checklist by default', () => {
  render(<HabitWorkSpace />, { wrapper: HabitProvider });

  expect(
    screen.queryByRole('button', { name: /done/i })
  ).not.toBeInTheDocument();
  expect(screen.getByLabelText(/first(.*)habit/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/first(.*)habit/i)).toHaveAttribute(
    'type',
    'checkbox'
  );
  expect(screen.getByLabelText(/second(.*)habit/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/second(.*)habit/i)).toHaveAttribute(
    'type',
    'checkbox'
  );
  expect(screen.queryByLabelText(/delete(.*)habit/i)).not.toBeInTheDocument();
});

test('Edit mode delete success', async () => {
  render(<HabitWorkSpace />, { wrapper: HabitProvider });

  const editButton = screen.getByRole('button', { name: /edit/i });
  await userEvent.click(editButton);

  const doneButton = screen.getByRole('button', { name: /done/i });
  expect(editButton).not.toBeInTheDocument();
  expect(doneButton).toBeInTheDocument();

  const deleteSecondHabitButton = within(
    screen.getByText(/second(.*)habit/i).parentNode
  ).getByLabelText('delete');
  await userEvent.click(deleteSecondHabitButton);

  await userEvent.click(doneButton);
  expect(screen.getByLabelText(/first(.*)habit/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/first(.*)habit/i)).toHaveAttribute(
    'type',
    'checkbox'
  );
  expect(screen.queryByLabelText(/second(.*)habit/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/delete(.*)habit/i)).not.toBeInTheDocument();
});

test('Analytics mode switch', async () => {
  render(<HabitWorkSpace />, { wrapper: HabitProvider });

  const analyticsButton = screen.getByRole('button', { name: /analytics/i });
  await userEvent.click(analyticsButton);

  const doneButton = screen.getByRole('button', { name: /done/i });
  expect(analyticsButton).not.toBeInTheDocument();
  expect(doneButton).toBeInTheDocument();
  expect(screen.queryAllByRole('table')).toHaveLength(2 * 2);

  await userEvent.click(doneButton);
  expect(screen.getByLabelText(/first(.*)habit/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/second(.*)habit/i)).toBeInTheDocument();
});
