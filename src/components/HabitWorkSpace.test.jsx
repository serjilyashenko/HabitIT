import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HabitProvider } from '../helpers/habit-context';
import { HabitWorkSpace } from './HabitWorkSpace';
import { TodayProvider } from '../helpers/today-context';

vi.mock('../helpers/first-habit-state');

beforeEach(() => {
  vi.spyOn(localStorage.__proto__, 'getItem').mockImplementation(() => null);
});

afterEach(() => {
  vi.resetAllMocks(); // for mocks
  vi.restoreAllMocks(); // for spyOn-s
});

function setup() {
  const user = userEvent.setup();
  return {
    user,
    ...render(<HabitWorkSpace />, {
      wrapper: ({ children }) => (
        <TodayProvider>
          <HabitProvider>{children}</HabitProvider>
        </TodayProvider>
      ),
    }),
  };
}

test('It shows habit checklist by default', () => {
  setup();

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
  const { user } = setup();

  const editButton = screen.getByRole('button', { name: /edit/i });
  await user.click(editButton);

  const doneButton = screen.getByRole('button', { name: /done/i });
  expect(editButton).not.toBeInTheDocument();
  expect(doneButton).toBeInTheDocument();

  const deleteSecondHabitButton = within(
    screen.getByText(/second(.*)habit/i).parentNode
  ).getByLabelText('delete');
  await user.click(deleteSecondHabitButton);

  await user.click(doneButton);
  expect(screen.getByLabelText(/first(.*)habit/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/first(.*)habit/i)).toHaveAttribute(
    'type',
    'checkbox'
  );
  expect(screen.queryByLabelText(/second(.*)habit/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/delete(.*)habit/i)).not.toBeInTheDocument();
});

test('Analytics mode switch', async () => {
  const { user } = setup();

  const analyticsButton = screen.getByRole('button', { name: /analytics/i });
  await user.click(analyticsButton);

  const doneButton = screen.getByRole('button', { name: /done/i });
  expect(analyticsButton).not.toBeInTheDocument();
  expect(doneButton).toBeInTheDocument();
  expect(screen.queryAllByRole('table')).toHaveLength(2 * 2);

  await user.click(doneButton);
  expect(screen.getByLabelText(/first(.*)habit/i)).toBeInTheDocument();
  expect(screen.queryByLabelText(/second(.*)habit/i)).toBeInTheDocument();
});
