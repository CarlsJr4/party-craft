import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventForm from '@/components/custom/EventForm';
import '@testing-library/jest-dom';

const setup = () => {
  const utils = render(<EventForm />);
  const submitButton = screen.getByText(/Submit/i);
  const user = userEvent.setup();

  return {
    submitButton,
    user,
    ...utils,
  };
};

describe('Event form validation', () => {
  it('Displays errors when an empty username is submitted', async () => {
    const { submitButton, user } = setup();
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      /Username must be at least 2 characters./i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Displays errors when a one-letter username is submitted', async () => {
    const { submitButton, user } = setup();
    const usernameField = screen.getByLabelText('Username');
    expect(usernameField).toBeInTheDocument();
    await user.click(usernameField);
    await user.keyboard('a');
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      /Username must be at least 2 characters./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
