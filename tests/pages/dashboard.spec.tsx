import React from 'react';
import Dashboard from '../../pages/teachers';
import {describe,expect} from '@jest/globals';
import {render} from '@testing-library/react';

describe('The dashboard page',() => {
  it('renders dom elements correctly',() => {
    const {getByTestId} = render(<Dashboard />);
    const dashbordPage = getByTestId('dashboard-heading');
    expect(dashbordPage.textContent).toContain('Today at a Glance');
  });
});
