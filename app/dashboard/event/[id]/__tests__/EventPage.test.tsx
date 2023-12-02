import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventPage from '../page';
import { events } from '@/app/mocks/handlers';
import { format, parseJSON } from 'date-fns';
import Layout from '@/app/dashboard/layout';
import { server } from '@/app/mocks/server';
import { HttpResponse, http } from 'msw';

describe('Specific event page', () => {
  it('Renders event page for the correct event', async () => {
    const mockEvent = events[0];
    const { id, title, date, body } = mockEvent;

    // Params in a NextJS route is always a string
    render(
      <Layout>
        <EventPage params={{ id: id }} />
      </Layout>
    );
    expect(await screen.findByText(title)).toBeInTheDocument();
    expect(
      await screen.findByText(format(parseJSON(date), 'PPP'))
    ).toBeInTheDocument();
    expect(await screen.findByText(body)).toBeInTheDocument();
  });

  it('Renders fallback text for a missing event', async () => {
    server.use(
      http.get('http://localhost:3000/api/events/12345', () => {
        return HttpResponse.json(null, { status: 200 });
      })
    );

    render(
      <Layout>
        <EventPage params={{ id: '12345' }} />
      </Layout>
    );
    expect(
      await screen.findByText('This event does not exist or has been deleted.')
    ).toBeInTheDocument();
  });
});
