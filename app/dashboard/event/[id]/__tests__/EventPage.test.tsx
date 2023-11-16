import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventPage from '../page';
import { events } from '@/app/mocks/handlers';
import { format } from 'date-fns';
import Layout from '@/app/dashboard/layout';

describe('Home', () => {
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
    expect(await screen.findByText(format(date, 'PPP'))).toBeInTheDocument();
    expect(await screen.findByText(body)).toBeInTheDocument();
  });
});
