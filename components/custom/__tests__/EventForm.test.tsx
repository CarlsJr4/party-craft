import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Toaster } from '@/components/ui/toaster';
import EventForm from '@/components/custom/EventForm';
import { vi } from 'vitest';

const setup = () => {
  const mockDialogClose = vi.fn();
  render(<EventForm setDialogOpenState={mockDialogClose} />);
  render(<Toaster />);

  const user = userEvent.setup();

  const submitButton = screen.getByText('Submit');
  const fields = {
    eventNameField: screen.getByLabelText('Event name'),
    eventDescField: screen.getByLabelText('Event description'),
    eventDateField: screen.getByLabelText('Event date'),
  };

  return {
    submitButton,
    user,
    ...fields,
  };
};

const messages = {
  errEventNameRequired: 'Event name must be at least 3 characters.',
  errEventDescRequired: 'Event description cannot be blank.',
  errDateRequired: 'Please pick a date.',
  eventCreated: 'Event created!',
};

const submitValidForm = async () => {
  // NOTE: submitValidForm may cause double-render issues if setup and submitValidForm are run in the same block
  const { user, eventNameField, eventDescField, eventDateField, submitButton } =
    setup();
  await user.click(eventNameField);
  await user.keyboard('Ice skating with friends');
  await user.click(eventDescField);
  await user.keyboard('Meet up at the mall and go to the ice skating rink');
  await user.click(eventDateField);
  await user.keyboard('{Enter}'); // Simulates selecting the next day in the calendar component
  await user.click(submitButton);
};

describe('Isolated event form validation', () => {
  it('Displays errors when empty form is submitted', async () => {
    const { submitButton, user } = setup();

    await user.click(submitButton);

    const errors = [
      messages.errEventNameRequired,
      messages.errEventDescRequired,
      messages.errDateRequired,
    ];

    for (const error of errors) {
      const element = await screen.findByText(error);
      expect(element).toBeInTheDocument();
    }
  });

  it('Displays errors when a one-letter event name is submitted', async () => {
    const { submitButton, user, eventNameField } = setup();
    await user.click(eventNameField);
    await user.keyboard('a');
    await user.click(submitButton);
    const errorMessage = screen.getByText(messages.errEventNameRequired);
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('Isolated eventForm submission', () => {
  it('Displays failure state when a form is submitted with errors', async () => {
    const { submitButton, user } = setup();
    await user.click(submitButton);
    const successMessage = screen.queryByText(messages.eventCreated);
    expect(successMessage).not.toBeInTheDocument();
  });

  it('Displays success toast when a form is submitted without errors', async () => {
    await submitValidForm();
    const successMessage = await screen.findByText('Event created!');
    expect(successMessage).toBeInTheDocument();
  });

  it('Keeps the form values filled after an usuccessful submission', async () => {
    const { submitButton, user, eventNameField } = setup();
    await user.click(eventNameField);
    await user.keyboard('a');
    await user.click(submitButton);
    const errorMessage = screen.getByText(messages.errEventNameRequired);
    expect(eventNameField).toHaveValue('a');
    expect(errorMessage).toBeInTheDocument();
  });

  it('Resets the form after a successful submission', async () => {
    submitValidForm();

    const eventNameField = screen.getByLabelText('Event name');
    const eventDescField = screen.getByLabelText('Event description');
    const eventDateField = screen.getByLabelText('Event date');

    const fields = [eventNameField, eventDescField, eventDateField];

    for (const field of fields) {
      expect(field).not.toHaveValue();
    }
  });
});
