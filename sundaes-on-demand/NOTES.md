# Section 4: Sundaes On Demamand: Form Review and Popover

## Lesson 31: Intro to Sundaes on Demand

- Choose ice cream flavors and toppings and submit order
- Flavors and toppings come from server
- order is sent to server
- order number is sent back from the server

### Backdrop to Test

- more complex user interaction
  - multiple form entry, moving through order phases
- mouseover popup
  - test that element disappears from DOM
- simulating server response
  - mock service worker
- async app updates
  - awaiting DOM changes
- global state via context

### Spoiler Alert

- We will not be testing context implementation
  - only interested in testing behavior as seen by user!
- Tests no different if we used Redux, Mobx, etc
- Only difference is the test _setup_
  - make sure component is wrapped in context
  - ensure functionality
  - avoid errors

### Order Entry Mock-up

- Three main pages
  - Order Entry - Scoops, Toppings, Subtotal per section, Grand Total, Order Sundae button
  - Order Summary - Summary of Scoops, Toppings and Grand Total, Confirm order button
  - Order Confirmation - Order number, Create new order button

### Order Phase State (App-level)

- App-level states
  - `inProgress`: Order Entry page
  - `review`: Order Summary page
  - `completed`: Order Confirmation page

### Server

- Download from course repo
  - https://github.com/bonnie/udemy-TESTING-LIBRARY/tree/master/sundae-server
  - Follow instructions in _README.md_ to install
- RESTful API, runs on port 3030
- For flavors / toppings, just sends static info
  - In a real app, sould come from db
- For order, simply generates random order number
- Server not needed for functional react app testing!

  - use mock-service-worker to mock responses from server
  - server for spec, manual acceptance testing

## Lesson 33: React Bootstrap Setup

- course will use react-bootstrap
  - you can use any styling you want, or none
- `npm install react-bootstrap bootstrap`
- Copy under _Browser Globals_ here: https://react-bootstrap.github.io/getting-started/introduction/ and
  add to `index.html`

## Lesson 34: Code Organization and Introduction to SummaryForm

### Order Summary Component

- "I agree to Terms and Conditions" checkbox
- "Confirm order" button
- PopOver for Terms and Conditions

- Test and code checkbox /button
  - Sound familiar?
- Test and code Terms & Conditions "popover"

  - syntax to test that element is no longer on page

- Later:
  - test and code summary test
  - test and code button functionality

### Code Organization

- Organize components by pages
  - `test` directory for each page
  - Jest will find and run any files that end in _.test.js_
- `src/pages/summary`
  - `OrderSummary.jsx`
  - `SummaryForm.jsx`
- `src/pages/summary/test`
  - `SummaryForm.test.jsx`

## Lesson 35: Code Quiz! Checkbox enables button

- Write tests to ensure that
  - Checkbox is unchecked by default
  - Checking checkbox enables button
  - Unchecking checkbox again disables button
- A chance to set up your own test from scatch
  - Use tests from last section as a model
  - Render the `<SummaryForm />` component
- Find checkbox and button using `{name}` option
  - Use mockup for "name" option values
- Check that tests fail! Red part of red-green testing

- Use what you remember and/or reference material
  - https://testing-library.com/docs/react-testing-library/cheatsheet
  - https://github.com/testing-library/jest-dom

# Lesson 37: React Bootstrap Popover and Testing Library userEvent

- Test "Terms & Conditions" Popover
- Will be using React Bootstrap `Popover`: https://react-bootstrap.github.io/components/overlays/#popovers
- `userEvent` more appropriate
- Install `npm install @testing-library/user-event @testing-library/dom -D`
- Recommended to use `userEvent` over `fireEvent`
