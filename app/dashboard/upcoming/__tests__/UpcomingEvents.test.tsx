import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpcomingEvents from '@/app/dashboard/upcoming/page';
import '@testing-library/jest-dom';
import { events } from '@/app/mocks/handlers';
import { server } from '@/app/mocks/server';
import { HttpResponse, http } from 'msw';
import { format } from 'date-fns';

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

    it('Displays confirmation toast after edit', async () => {
      await openEditDialog();
      const submitButton = await screen.findByText('Submit');
      await userEvent.click(submitButton);
      const successMessage = await screen.getByText(/Event created!/i);
      expect(successMessage).toBeInTheDocument();
    });
    // it('Prevents edit save if there are form errors', () => {});
    // it('Updates event card if fields are validated successfully', () => {});
  });
});
