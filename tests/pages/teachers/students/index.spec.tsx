import Students from '@/pages/teachers/students';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';

it('should have a search box', () => {
  render(<Students />);
  const searchBox: HTMLInputElement = screen.getByTestId(/searchbox/i);
  fireEvent.change(searchBox, { target: { value: 'CodeAlgo' } });
  expect(searchBox.value).toBe('CodeAlgo');
});
