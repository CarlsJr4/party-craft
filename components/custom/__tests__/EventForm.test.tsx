import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Toaster } from '@/components/ui/toaster';
import EventForm from '@/components/custom/EventForm';
import { vi } from 'vitest';
import DashboardWrapper from '../DashboardWrapper'; // We use this wrapper to give context to the tests
import { server } from '@/app/mocks/server';
import { http, HttpResponse } from 'msw';

const setup = () => {
  const mockDialogClose = vi.fn();
  render(
    <DashboardWrapper>
      <EventForm setDialogOpenState={mockDialogClose} />
      <Toaster />
    </DashboardWrapper>
  );

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

  it('Displays an error toast if there is a server error when submitting a valid form', async () => {
    server.use(
      http.post('http://localhost:3000/api/events', () => {
        return HttpResponse.json([], { status: 500 });
      })
    );
    await submitValidForm();
    const failureMessage = await screen.findByText('Uh oh!');
    expect(failureMessage).toBeInTheDocument();
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

  it('Keeps the form values filled after a success submission with server error', async () => {
    server.use(
      http.post('http://localhost:3000/api/events', () => {
        return HttpResponse.json([], { status: 500 });
      })
    );
    await submitValidForm();
    const eventnameField = screen.getByLabelText('Event name');
    expect(eventnameField).toHaveValue('Ice skating with friends');
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
