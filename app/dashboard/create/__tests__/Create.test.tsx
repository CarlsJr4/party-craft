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
  it('Displays errors when empty fields are submitted', async () => {
    const { submitButton, user } = setup();
    await user.click(submitButton);
    const errEventDescRequired = screen.getByText(
      /Event description cannot be blank./i
    );
    const errDateRequired = screen.getByText(/Please pick a date./i);
    const errors = [errEventDescRequired, errDateRequired];
    errors.forEach(error => {
      expect(error).toBeInTheDocument();
    });
  });

  it('Displays errors when a one-letter event name is submitted', async () => {
    const { submitButton, user } = setup();
    const usernameField = screen.getByLabelText('Event name');
    expect(usernameField).toBeInTheDocument();
    await user.click(usernameField);
    await user.keyboard('a');
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      /Event name must be at least 3 characters./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('Form submission', () => {
  it('Displays success state when a form is submitted without errors', async () => {
    const { submitButton, user } = setup();
    // Submit all the form fields
    const successMessage = screen.getByText(/Event created!/i);
    await user.click(submitButton);
    expect(successMessage).toBeInTheDocument();
  });
});
