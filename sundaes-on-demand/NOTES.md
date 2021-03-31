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

# Lesson 38: Screen Query Methods

- Parts of method: `command[All]ByQueryType`

  - _command_
    - `get`: expect element to be in DOM
    - `query`: expect element _not_ to be in DOM
    - `find`: expect element to appear async
  - _[All]_
    - (exclude) expect only one match
    - (include) expect more than one match
  - _QueryType_
    - `Role` (most preferred)
    - `AltText` (images)
    - `Text` (display elements)
    - Form elements
      - `PlaceholderText`
      - `LabelText`
      - `DisplayValue`

- screen Query Reference
  - https://testing-library.com/docs/queries/about/
  - https://testing-library.com/docs/react-testing-library/cheatsheet/
  - https://testing-library.com/docs/queries/about/#priority

# Lesson 41: "Not wrapped in act(...)" Error, Async Disappearance

- React updated element after test was finished
- Don't want to follow the advice to wrap in `act(...)`
  - Testing Library already does this for us!
  - https://testing-library.com/docs/preact-testing-library/api#act
- To remedy this error:
  - Determine what changes after the test is over (async)
  - Accounting for the change in test by:
    - awaiting the change, and
    - asserting on it
  - More info: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
- waitForElementToBeRemoved

# Lesson 43 OrderEntry Server Data Introduction

- `OrderEntry` component has subcomponents:
  - Scoops `Options` - Chocolate, Vanilla, Mint Chip
    - 3x `ScoopOption` component
  - Toppings `Options` - Gummi bears, Cherries, M&Ms, Hot Fudge
    - 4x `ToppingOption` component

## Tests

- Test that option images render
- Mock Service Worker
- Mock server response for `/scoops` and `/toppings`
  - write "scoops" code together
  - "toppings" code as code quiz

# Lesson 44 Introduction to Mock Service Worker and Handlers

- Purpose:
  - intercept network calls
  - return specified responses
- Prevents network calls during tests
- Set up test conditions using server response

## Mock Service Worker Setup

- `npm install msw`
- Create handlers
- Create test server
- Make sure test server lsitens during all tests
  - reset after each test

## Mocking REST API

https://mswjs.io/docs/getting-started/mocks/rest-api

```js
// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("https://localhost:3030/scoops", (req, res, ctx) => {
    ctx.json([
      { name: "Chocolate", imagePath: "/images/chocolate.png" },
      { name: "Vanilla", imagePath: "/images/vanilla.png" },
    ]);
  }),
];
```

- Handler Type: `rest` or `graphql`
  - HTTP method to mock: `get`, `post`, etc.
    - Full URL to mock
      - Response resolver function
        - `req`: request object
        - `res`: function to create response
        - `ctx`: utility to build response
