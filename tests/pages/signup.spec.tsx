import SignUp from '@/pages/signup';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

it('should have a go to login button', () => {
  render(<SignUp />);
  const linkElement = screen.getByTestId(/sign-in/i);
  expect(linkElement).toBeInTheDocument();
});

it('should have a form element', () => {
  render(<SignUp />);
  const form = screen.getByRole('form');
  expect(form).toBeInTheDocument();
});

it('should have a terms and conditions button', () => {
  render(<SignUp />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
});
