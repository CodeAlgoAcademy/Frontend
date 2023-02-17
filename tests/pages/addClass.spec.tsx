import AddClass from '@/pages/teachers/addClass';
import {fireEvent,render,screen} from '@testing-library/react';
import React from 'react';

it('should have a title - home',() => {
  render(<AddClass />);
  const title = screen.getByText(/home/i);
  expect(title).toBeInTheDocument();
});

test('modal workflow',() => {
  render(<AddClass />);
  const addClassModal = screen.getByTestId('addClassModal');
  const modalController = screen.getByTestId('open-modal');
  fireEvent.click(modalController);
  expect(addClassModal).toBeVisible();
});
