import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpcomingEvents from '@/app/dashboard/upcoming/page';
import '@testing-library/jest-dom';
import { events } from '@/app/mocks/handlers';

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

  // it('Renders a custom message when no events are retrieved', () => {
  //   render(<UpcomingEvents />);
  // });

  // it('Renders an error when there is an API error', () => {
  //   render(<UpcomingEvents />);
  // });
});
