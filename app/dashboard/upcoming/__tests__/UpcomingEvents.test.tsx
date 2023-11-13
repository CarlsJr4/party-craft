import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Layout from '@/app/dashboard/layout';
import '@testing-library/jest-dom';
import { events } from '@/app/mocks/handlers';
import { server } from '@/app/mocks/server';
import { HttpResponse, http } from 'msw';
import { format } from 'date-fns';
import { Toaster } from '@/components/ui/toaster';
import UpcomingEvents from '@/app/dashboard/upcoming/page';
import EventForm from '@/components/custom/EventForm';
import DashNav from '@/components/custom/Dashnav';

describe('Event data retrieval', () => {
  // Note: forEach is currently not supported in Vitest, so we use for...of
  it('Correctly renders API data on the screen', async () => {
    render(<UpcomingEvents />);
    for (const event of events) {
      expect(await screen.findByText(event.title)).toBeInTheDocument();
      expect(await screen.findByText(event.body)).toBeInTheDocument();
      expect(
        await screen.findByText(format(event.date, 'PPP'))
      ).toBeInTheDocument();
    }
  });

  // it('Renders a loader while the API is loading', () => {
  //   render(<UpcomingEvents />);
  // });

  it('Renders a custom message when no events are retrieved', async () => {
    server.use(
      http.get('http://localhost:3000/api/upcomingevents', () => {
        return HttpResponse.json([], { status: 200 });
      })
    );
    render(<UpcomingEvents />);
    expect(
      await screen.findByText('You have no upcoming events')
    ).toBeInTheDocument();
  });

  it('Renders an error when there is an API error', async () => {
    server.use(
      http.get('http://localhost:3000/api/upcomingevents', () => {
        return HttpResponse.error();
      })
    );
    render(<UpcomingEvents />);
    expect(await screen.findByText('Uh oh!')).toBeInTheDocument();
    expect(
      await screen.queryByText('You have no upcoming events')
    ).not.toBeInTheDocument();
  });
});

describe('Event creation', () => {
  it('Closes the create dialog after successful submission', async () => {
    render(
      <Layout>
        <UpcomingEvents />
      </Layout>
    );
    const user = userEvent.setup();
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
});

describe('Event deletion', () => {
  it('Removes an event from the UI when deleted', async () => {
    render(<UpcomingEvents />);
    const deleteButton = await screen.findAllByText('Delete');
    await userEvent.click(deleteButton[0]);
    const confirmButton = await screen.findByText('Continue');
    await userEvent.click(confirmButton);
    const deletedEvent = screen.queryByText('Ice skating with friends');
    expect(deletedEvent).not.toBeInTheDocument();
  });
});

describe('Event editing', () => {
  const { title, date, body } = events[0];
  const openEditDialog = async () => {
    render(<UpcomingEvents />);
    const editButton = await screen.findAllByText('Edit Event');
    await userEvent.click(editButton[0]);
  };

  it('Displays the pre-filled placeholder text', async () => {
    await openEditDialog();
    const eventnameField = screen.getByLabelText('Event name');
    const eventdescField = screen.getByLabelText('Event description');
    const eventdateField = screen.getByLabelText('Event date');

    expect(eventnameField).toHaveValue(title);
    expect(eventdescField).toHaveValue(body);
    expect(eventdateField).toHaveTextContent(format(date, 'PPP')); // We use textcontent instead of value because the date field is a button, not an input
  });

  it('Displays confirmation toast after successful edit', async () => {
    await openEditDialog();
    render(<Toaster />);
    const submitButton = await screen.findByText('Save');
    await userEvent.click(submitButton);
    const successMessage = await screen.findByText(
      /Your changes have been saved./i
    );
    const successMessageCreate = await screen.queryByText(/'Event created!'/i);
    expect(successMessage).toBeInTheDocument();
    expect(successMessageCreate).not.toBeInTheDocument(); // 2 assertions because there are 2 different toast messages depending on the situation
  });

  it('Closes dialog after a successful edit', async () => {
    await openEditDialog();
    const submitButton = await screen.findByText('Save');
    const dialogDesc = await screen.queryByText(
      'Make changes to your event here.'
    );
    await userEvent.click(submitButton);
    expect(dialogDesc).not.toBeInTheDocument();
  });

  it('Displays confirmation toast after successful edit', async () => {
    await openEditDialog();
    render(<Toaster />);
    const submitButton = await screen.findByText('Save');
    await userEvent.click(submitButton);
    const successMessage = await screen.findByText(
      /Your changes have been saved./i
    );
    expect(successMessage).toBeInTheDocument();
  });

  it('Keeps the dialog open if there are form errors', async () => {
    await openEditDialog();
    const submitButton = await screen.findByText('Save');
    await userEvent.keyboard('{Delete}');
    await userEvent.click(submitButton);
    const eventnameError = await screen.findByText(
      'Event name must be at least 3 characters.'
    );
    const successMessage = await screen.queryByText(
      /Your changes have been saved./i
    );
    expect(successMessage).not.toBeInTheDocument();
    expect(eventnameError).toBeInTheDocument();
  });

  it('Updates event card if fields are validated successfully', async () => {
    await openEditDialog();
    await userEvent.keyboard('Painting classes with friends');
    await userEvent.keyboard('{Tab}');
    await userEvent.keyboard('Test');

    const eventdateField = screen.getByLabelText('Event date');
    // Select current day using keyboard
    await userEvent.keyboard('{Tab}');
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
