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

test('checkbox enables button', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: /change to/i})
  const checkbox = screen.getByRole('checkbox', {name: /disable button/i});

  // Test initial 
  expect(colorButton).toBeEnabled()
  expect(colorButton).toHaveTextContent(/change to blue/i)
  expect(checkbox).not.toBeChecked()

  fireEvent.click(checkbox)
  // Test checkbox checked
  expect(checkbox).toBeChecked()
  expect(colorButton).toBeDisabled()

  fireEvent.click(checkbox)
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
})