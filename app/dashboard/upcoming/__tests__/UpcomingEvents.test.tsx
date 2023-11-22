import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Layout from '@/app/dashboard/layout';
import '@testing-library/jest-dom';
import { events } from '@/app/mocks/handlers';
import { server } from '@/app/mocks/server';
import { HttpResponse, http } from 'msw';
import { format } from 'date-fns';
import UpcomingEvents from '@/app/dashboard/upcoming/page';

const setup = () => {
  render(
    <Layout>
      <UpcomingEvents />
    </Layout>
  );

  const user = userEvent.setup();

  return {
    user,
  };
};

const messages = {
  errEventNameRequired: 'Event name must be at least 3 characters.',
  errEventDescRequired: 'Event description cannot be blank.',
  errDateRequired: 'Please pick a date.',
  eventCreated: 'Event created!',
  eventSaved: 'Your changes have been saved.',
};

const openEditDialog = async () => {
  const editButton = await screen.findAllByText('Edit Event');
  await userEvent.click(editButton[0]);

  const fields = {
    eventNameField: screen.getByLabelText('Event name'),
    eventDescField: screen.getByLabelText('Event description'),
    eventDateField: screen.getByLabelText('Event date'),
  };

  return fields;
};

describe('Event data retrieval', () => {
  // Note: forEach is currently not supported in Vitest, so we use for...of
  it('Correctly renders API data on the screen', async () => {
    setup();
    for (const event of events) {
      if (new Date() < new Date(event.date)) {
        expect(await screen.findByText(event.title)).toBeInTheDocument();
        expect(await screen.findByText(event.body)).toBeInTheDocument();
        expect(
          await screen.findByText(format(parseJSON(event.date), 'PPP'))
        ).toBeInTheDocument();
      }
    }
  });

  // it('Renders a loader while the API is loading', () => {
  //   render(<UpcomingEvents />);
  // });

  it('Renders a custom message when no events are retrieved', async () => {
    server.use(
      http.get('http://localhost:3000/api/events', () => {
        return HttpResponse.json([], { status: 200 });
      })
    );
    setup();
    expect(
      await screen.findByText('You have no upcoming events')
    ).toBeInTheDocument();
  });

  it('Renders an error when there is an API error', async () => {
    server.use(
      http.get('http://localhost:3000/api/events', () => {
        return HttpResponse.error();
      })
    );
    setup();
    expect(await screen.findByText('Uh oh!')).toBeInTheDocument();
    expect(
      await screen.queryByText('You have no upcoming events')
    ).not.toBeInTheDocument();
  });
});

describe('Event creation', () => {
  it('Closes the create dialog after successful submission', async () => {
    // We use a different render here because the create event button exists in the DashNav component in the dashboard layout file
    const { user } = setup();
    const createButton = screen.getByText('Create New +');
    await user.click(createButton);

    const submitButton = screen.getByText(/Submit/i);
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

    expect(eventnameField).not.toBeInTheDocument(); // Simulates form dialog close
  });

  it('Adds a new event card after successful submission', async () => {
    const { user } = setup();
    const createButton = screen.getByText('Create New +');
    await user.click(createButton);

    const submitButton = screen.getByText(/Submit/i);
    // Submit all the form fields
    const eventnameField = screen.getByLabelText('Event name');
    const eventdescField = screen.getByLabelText('Event description');
    const eventdateField = screen.getByLabelText('Event date');

    await user.click(eventnameField);
    await user.keyboard('KBBQ with friends');
    await user.click(eventdescField);
    await user.keyboard('Meet up KBBQ and eat lots of it');
    await user.click(eventdateField);
    await user.keyboard('{Enter}'); // Simulates selecting the next day in the calendar component
    await user.click(submitButton);

    expect(await screen.findByText('KBBQ with friends')).toBeInTheDocument();
    expect(
      await screen.findByText('Meet up KBBQ and eat lots of it')
    ).toBeInTheDocument();
  });
});

describe('Event deletion', () => {
  it('Removes an event from the UI when deleted', async () => {
    const { user } = setup();
    const deleteButton = await screen.findAllByText('Delete');
    await user.click(deleteButton[0]);
    const confirmButton = await screen.findByText('Continue');
    await user.click(confirmButton);
    const deletedEvent = screen.queryByText('Ice skating with friends');
    expect(deletedEvent).not.toBeInTheDocument();
  });

  it('Displays event name in the delete dialog', async () => {
    const { user } = setup();
    const deleteButton = await screen.findAllByText('Delete');
    await user.click(deleteButton[0]);
    const eventName = await screen.findAllByText(events[0].title);
    expect(eventName.length).toBe(2); // Expect length of 2 because it shows up once in the dialog and once in the background.
  });
});

describe('Event editing', () => {
  it('Displays the pre-filled placeholder text', async () => {
    setup();
    const { eventDateField, eventNameField, eventDescField } =
      await openEditDialog();

    const { title, date, body } = events[0];
    expect(eventNameField).toHaveValue(title);
    expect(eventDescField).toHaveValue(body);
    expect(eventDateField).toHaveTextContent(format(date, 'PPP')); // We use textcontent instead of value because the date field is a button, not an input
  });

  it('Displays confirmation toast after successful edit', async () => {
    setup();
    await openEditDialog();
    const submitButton = await screen.findByText('Save');
    await userEvent.click(submitButton);
    const successMessage = await screen.findByText(messages.eventSaved);
    const successMessageCreate = await screen.queryByText(
      messages.eventCreated
    );
    expect(successMessage).toBeInTheDocument();
    expect(successMessageCreate).not.toBeInTheDocument(); // 2 assertions because there are 2 different toast messages depending on the situation
  });

  it('Closes dialog after a successful edit', async () => {
    setup();
    await openEditDialog();
    const submitButton = await screen.findByText('Save');
    const dialogDesc = await screen.queryByText(
      'Make changes to your event here.'
    );
    await userEvent.click(submitButton);
    expect(dialogDesc).not.toBeInTheDocument();
  });

  it('Displays confirmation toast after successful edit', async () => {
    setup();
    await openEditDialog();
    const submitButton = await screen.findByText('Save');
    await userEvent.click(submitButton);
    const successMessage = await screen.findByText(messages.eventSaved);
    expect(successMessage).toBeInTheDocument();
  });

  it('Keeps the dialog open if there are form errors', async () => {
    setup();
    await openEditDialog();
    const submitButton = await screen.findByText('Save');
    await userEvent.keyboard('{Delete}');
    await userEvent.click(submitButton);
    const eventnameError = await screen.findByText(
      messages.errEventNameRequired
    );
    expect(eventnameError).toBeInTheDocument();
  });

  it('Displays an error toast if there is a server error while updating', async () => {
    server.use(
      http.put(`http://localhost:3000/api/events/${events[0].id}`, () => {
        return HttpResponse.error();
      })
    );
    setup();
    await openEditDialog();
    const submitButton = await screen.findByText('Save');
    await userEvent.click(submitButton);
    expect(await screen.findByText('Uh oh!')).toBeInTheDocument();
  });

  it('Updates event card if fields are validated successfully', async () => {
    setup();
    await openEditDialog();
    await userEvent.keyboard('Painting classes with friends');
    await userEvent.tab();
    await userEvent.keyboard('Test');

    const eventdateField = screen.getByLabelText('Event date');
    // Select current day using keyboard
    await userEvent.tab();
    await userEvent.keyboard('{ }');
    await userEvent.keyboard('{ }');
    //

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    expect(eventdateField).toHaveTextContent(format(tomorrow, 'PPP')); // We use textcontent instead of value because the date field is a button, not an input

    const submitButton = await screen.findByText('Save');
    await userEvent.click(submitButton);
    const newCardTitle = await screen.findByText(
      'Painting classes with friends'
    );
    const newCardDesc = await screen.findByText('Test');
    const newDate = await screen.findByText(format(tomorrow, 'PPP'));

    expect(newCardTitle).toBeInTheDocument();
    expect(newCardDesc).toBeInTheDocument();
    expect(newDate).toBeInTheDocument();
  });
});
