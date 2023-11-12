import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpcomingEvents from '@/app/dashboard/upcoming/page';
import '@testing-library/jest-dom';
import { events } from '@/app/mocks/handlers';
import { server } from '@/app/mocks/server';
import { HttpResponse, http } from 'msw';

describe('Event data retrieval', () => {
  // Note: forEach is currently not supported in Vitest, so we use for...of
  it('Correctly renders API data on the screen', async () => {
    render(<UpcomingEvents />);
    for (const event of events) {
      expect(await screen.findByText(event.title)).toBeInTheDocument();
      expect(await screen.findByText(event.body)).toBeInTheDocument();
      expect(await screen.findByText(event.date)).toBeInTheDocument();
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
});
