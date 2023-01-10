import React from 'react';
import { ScheduleBox } from '../../components';
import { describe, expect } from '@jest/globals';
import { render, cleanup } from '@testing-library/react';

describe('The schedule box component', () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const fullDate = new Date();
  const date = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  const scheduleItems = [
    {
      id: 1,
      time: '9:30 am',
      item: 'tell class about guest speaker',
    },
    {
      id: 2,
      time: '11:15 am',
      item: 'reminder about presentation',
    },
  ];
  it('renders dom elements correctly', () => {
    const { getByTestId } = render(<ScheduleBox />);
    const scheduleBox = getByTestId('schedule-box-heading');
    expect(scheduleBox.textContent).toContain(`Schedule - ${`${months[month]} ${date}, ${year}`}`);
  });
});
