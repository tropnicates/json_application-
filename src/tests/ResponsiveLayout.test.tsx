// tests/ResponsiveLayout.test.tsx
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

test('renders responsive layout', () => {
  render(<HomePage />);
  const formTitle = screen.getByText(/Project Requirements Survey/i);
  expect(formTitle).toBeInTheDocument();
});
