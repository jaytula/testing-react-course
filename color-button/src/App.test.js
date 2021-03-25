import { render, screen, fireEvent } from '@testing-library/react';
import App, {replaceCamelWithSpaces} from './App';

test('button has correct initial color', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', {name: /change to/i});
  expect(buttonElement).toHaveStyle({
    backgroundColor: 'MediumVioletRed'
  })
})

// test('button has correct initial text', () => {
//   render(<App />);
//   const buttonElement = screen.getByRole('button')
//   expect(buttonElement).toBeInTheDocument();
// })

test('button turns blue when clicked', () => {
  render(<App />);
  const buttonElement = screen.getByRole('button', {name: /change to/i});

  fireEvent.click(buttonElement);

  expect(buttonElement).toHaveStyle({
    backgroundColor: 'Midnight Blue'
  })

  // expect(buttonElement.textContent).toBe('Change to Medium Violet Red')
  expect(buttonElement).toHaveTextContent(/change to medium violet red/i)
})

test('checkbox enables button', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: /change to/i})
  const checkbox = screen.getByRole('checkbox', {name: /disable button/i});

  // Test initial 
  expect(colorButton).toBeEnabled()
  expect(colorButton).toHaveTextContent(/change to midnight blue/i)
  expect(checkbox).not.toBeChecked()

  fireEvent.click(checkbox)
  // Test checkbox checked
  expect(checkbox).toBeChecked()
  expect(colorButton).toBeDisabled()

  fireEvent.click(checkbox)
  expect(checkbox).not.toBeChecked();
  expect(colorButton).toBeEnabled();
})

test('button gray when disabled', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: /change to/i});
  const checkbox = screen.getByRole('checkbox', {name: /disable button/i})

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'})

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: 'MediumVioletRed'})

})

test('disable button after clicking it', () => {
  render(<App />);
  const colorButton = screen.getByRole('button', {name: /change to/i});
  const checkbox = screen.getByRole('checkbox', {name: /disable button/i})

  fireEvent.click(colorButton);
  fireEvent.click(checkbox)
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'})

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: 'MidnightBlue'})
})

// MediumVioletRed => Medium Violet Red
// MidnightBlue -> Midnight Blue

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  });
  
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
