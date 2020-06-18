import React from 'react';
import { render } from '@testing-library/react';
import MainModule from '.';

test('renders learn react link', () => {
  const { getByText } = render(<MainModule />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
