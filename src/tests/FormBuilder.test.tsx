// tests/FormBuilder.test.tsx
import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

test('renders form preview', () => {
  render(<HomePage />);
  expect(screen.getByText(/Project Requirements Survey/i)).toBeInTheDocument();
});
