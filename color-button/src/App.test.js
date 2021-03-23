import { render, screen } from '@testing-library/react';
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
  const buttonElement = screen.getByRole('button')
  buttonElement.click();
  expect(buttonElement).toHaveStyle({
    backgroundColor: 'blue'
  })
})