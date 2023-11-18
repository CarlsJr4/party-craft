import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AuthForm from '../AuthForm';

const setup = () => {
  render(<AuthForm />);

  const user = userEvent.setup();

  const loginButton = screen.getByText('Login');
  const fields = {
    eventNameField: screen.getByLabelText('Email:'),
    eventDescField: screen.getByLabelText('Password:'),
  };
  vi.mock('next/navigation', () => ({
    useRouter() {
      return {
        prefetch: () => null,
      };
    },
  }));

  return {
    loginButton,
    user,
    ...fields,
  };
};

const messages = {
  invalidEmail: 'Invalid email',
  invalidPassword: 'Password must be at least 6 characters long.',
};

describe('Email auth form', () => {
  it('Displays errors when empty form is submitted', async () => {
    const { loginButton, user } = setup();

    await user.click(loginButton);

    const errors = [messages.invalidEmail, messages.invalidPassword];

    for (const error of errors) {
      const element = await screen.findByText(error);
      expect(element).toBeInTheDocument();
    }
  });
});
