import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EventForm from '@/components/custom/EventForm';
import '@testing-library/jest-dom';

describe('Event form', () => {
  it('Validates the username field', async () => {
    const user = userEvent.setup();
    render(<EventForm />);
    const submitButton = screen.getByText(/Submit/i);
    await user.click(submitButton);
    const errorMessage = screen.getByText(
      /Username must be at least 2 characters./i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
