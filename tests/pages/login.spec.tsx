import Login from '@/pages/login';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

it('should have a go to sign up button', () => {
  render(<Login />);
  const linkElement = screen.getByTestId('go-to-signup');
  expect(linkElement.textContent).toBe(/create an account/i);
});

it('should have ta form element', () => {
  render(<Login />);
  const formElement = screen.getAllByRole('form');
  expect(formElement).toBeInTheDocument();
});

it('should have a input fields', () => {
  render(<Login />);
  const inputElement: HTMLInputElement = screen.getByPlaceholderText(/enter email*/i);
  fireEvent.change(inputElement, { target: { value: 'codealgo@gmail.com' } });
  expect(inputElement.value).toBe(/codealgo@gmail.com/i);
});
