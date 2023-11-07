import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { createMocks } from 'node-mocks-http';

describe('Home', () => {
  it('properly renders the home page contents', () => {
    render(<Home />);
    const welcomeMessage = screen.getByText(/Welcome/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
