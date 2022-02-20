import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders probando react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/probando/i);
  expect(linkElement).toBeInTheDocument();
});
