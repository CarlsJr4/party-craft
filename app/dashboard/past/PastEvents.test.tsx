import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Layout from '@/app/dashboard/layout';
import '@testing-library/jest-dom';
import { events } from '@/app/mocks/handlers';
import PastEvents from '@/app/dashboard/past/page';

const setup = () => {
  render(
    <Layout>
      <PastEvents />
    </Layout>
  );

  const user = userEvent.setup();

  return {
    user,
  };
};

describe('Event data retrieval', () => {
  it('Only displays events that are in the past', async () => {
    setup();
    const pastEvent = await screen.findByText(events[2].title); // This is a placeholder past event
    const futureEvent = screen.queryByText(events[0].title); // This is a placeholder future event
    expect(pastEvent).toBeInTheDocument();
    expect(futureEvent).not.toBeInTheDocument();
  });

  // it only displays past events that the user has signed up for
});
