import PrivacyPolicy from '@/pages/privacyPolicy';
import { render, screen } from '@testing-library/react';
import React from 'react';

it('should have two buttons', () => {
  render(<PrivacyPolicy />);
  const buttons = screen.getAllByRole('button');
  expect(buttons[0].textContent).toBe(/accept/i);
  expect(buttons[1].textContent).toBe(/reject/i);
});
