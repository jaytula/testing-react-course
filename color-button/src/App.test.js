import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('button has correct initial color', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', {name: 'Change to blue'});
  expect(buttonElement).toHaveStyle({
    backgroundColor: 'red'
  })
})

// test('button has correct initial text', () => {
//   render(<App />);
//   const buttonElement = screen.getByRole('button')
//   expect(buttonElement).toBeInTheDocument();
// })

test('button turns blue when clicked', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', {name: 'Change to blue'});
  fireEvent.click(buttonElement);

  expect(buttonElement).toHaveStyle({
    backgroundColor: 'blue'
  })

  expect(buttonElement.textContent).toBe('Change to red')
  expect(buttonElement).toHaveTextContent(/change to red/i)
})