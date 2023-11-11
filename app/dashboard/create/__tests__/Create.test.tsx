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
    const errEventNameRequired = screen.getByText(
      /Event name must be at least 3 characters./i
    );
    const errEventDescRequired = screen.getByText(
      /Event description cannot be blank./i
    );
    const errDateRequired = screen.getByText(/Please pick a date./i);
    const errors = [
      errEventNameRequired,
      errEventDescRequired,
      errDateRequired,
    ];
    errors.forEach(error => {
      expect(error).toBeInTheDocument();
    });
  });

  it('Displays errors when a one-letter event name is submitted', async () => {
    const { submitButton, user } = setup();
    const eventnameField = screen.getByLabelText('Event name');
    expect(eventnameField).toBeInTheDocument();
    await user.click(eventnameField);
    await user.keyboard('a');
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      /Event name must be at least 3 characters./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('Form submission', () => {
  it('Displays failure state when a form is submitted with errors', async () => {
    const { submitButton, user } = setup();
    await user.click(submitButton);
    const successMessage = screen.queryByText(/Event created!/i);
    expect(successMessage).not.toBeInTheDocument();
  });

  it('Displays success state when a form is submitted without errors', async () => {
    const { submitButton, user } = setup();
    // Submit all the form fields
    const eventnameField = screen.getByLabelText('Event name');
    const eventdescField = screen.getByLabelText('Event description');
    const eventdateField = screen.getByLabelText('Event date');
    await user.click(eventnameField);
    await user.keyboard('Ice skating with friends');
    await user.click(eventdescField);
    await user.keyboard('Meet up at the mall and go to the ice skating rink');
    await user.click(eventdateField);
    await user.keyboard('{Enter}'); // Simulates selecting the next day in the calendar component
    await user.click(submitButton);
    const successMessage = await screen.findByText('Event created!');
    expect(successMessage).toBeInTheDocument();
  });
});
