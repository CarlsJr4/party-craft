import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('properly renders the home page contents', () => {
    render(<Home />);
    const welcomeMessage = screen.getByText(/Welcome/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
