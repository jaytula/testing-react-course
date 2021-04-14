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

# Lesson 45 Setting up the Mock Service Worker

```js
# src/mocks/server.js

import {setupServer} from 'msw/node'
import { handlers } from './handlers'

// This configures a request mocking server with the given request
export const server = setupServer(...handlers)
```

- https://mswjs.io/docs/getting-started/integrate/node

# Lesson 46 Tests with Mock Service Worker: Scoop Options

- Will be testing when the `Options` component calls the scoops endpoint on the
  server, it takes that data and displays them as `ScoopOptions`

# Lesson 48 Code Quiz! Topping Options from Server

- Mock Service Worker mimics response from server
  - create handler
  - create server
  - update _setupTests_ to listen for requests
- `getAllByRole`
  - search for more than one match to role
- `await findAllByRole`

  - for asynchronous DOM update of elements

- Use scoops as a model
  - type out rather than copy/paste for better learning
- add handler for `/toppings` route
- Handler can return three toppings:

```
[
  { name: 'Cherries', imagePath: '/images/cherries.png' },
  { name: 'M&Ms', imagePath: '/images/m-and-ms.png'},
  { name: 'Hot fudge', 'imagePath: '/images/hot-fudge.png' },
]
```

- Write tests in `Options.test.jsx`
- `name` option can be `/topping$/i`
- Update `Options.jsx` and create `ToppingOption.jsx`

# Lesson 50 Error Server Response Planning

- Fill in that `catch` statement we left as TODO
- Display AlertBanner component if `axios` call throws error
  - instead of content from server
- Use simple `react-bootstrap` alert
  - https://react-bootstrap.github.io/components/alerts/
  - role: `alert`
- By default, handlers return non-error response
  - Override with error response for particular tests

## Jest Debugging Tools

- Jest debugging tools in this section

  - running only one test file
  - running only one test within a file

- To give us something to debug:
  - Going to write code I know won't pass

# Lesson 51 Simulating Server Error Response in Tests

# Lesson 53 Running only Selected Tests and `waitFor`

- Use `test.only('test description', () => {})` to restricting

# Lesson 54 Review: Server Error Response and Test Debugging

- Override Mock Service Worker response for individual tests (e.g. `server.resetHandlers`)
- Misleading _Unable to find role="alert"_ error
- Isolate file by typing `p` in Jest watch mode
- Isolate test withing file with `test.only` or `test.skip`
- `waitFor` for tests where `await findBy*` is not enough

# Lesson 55 Intro to Tests for Total and Subtotals

- Will be using React Context but it doesn't really matter test-wise
- There is a subtotal for Scoops section (test in `Options`)
- There is a subtotal for Topping section (test in `Options`)
- There is a grand total which is the sum of the two subtotals (test in `OrderEntry`)

# Lesson 57 OPTIONAL React Code: OrderDetails Context

- A lot of cofing, quite complicated
  - Easy to get lost in details
- Focus of course is testing
- Complicated app for realistic testing scenarios
- Feel free to set this lecture aside

- Kent C. Dodds to set up context with embedded state
- https://kentcdodds.com/blog/application-state-management-with-react

Two components will need the context:

- OrderEntry
- OrderSummary

Create context file

- `/src/contexts/OrderDetails.tsx`

# Lesson 61: Review: Scoops Subtotal with Context

- `getByText` to find total
  - `exact` option set to `false`
- number inputs
  - `await` and `findBy` (coming from server async)
  - spinbutton _role_
  - `userEvent.clear` to clear exiting text
  - `userEvent.type` to enter number
- `wrapper` option to `render` to apply context provider
- Redfine Testing Library `render` to access universally

# Lesson 62: Code Quiz! Topping Subtotal

- Write tests for topping subtotal
- Not easy! Putting a lot of concepts together here
- Tests can go in _src/pages/order/tests/totalUpdates.test.jsx_
- Look at the mockup for inputs

  - e.g `Toppings total: $4.50`
  - Checkbox for `Gummi bears`, `Cherries`, `M&Ms`, and `Hot Fudge`

- Assert on default toppings subtotal
- Find and tick one box, assert on updated subtotal
  - See _/src/mock/handlers.js_ for server response (which toppings)
  - use `await` and `find` for checkbox (async)
- Tick another box on, assert on subtotal
  - Make sure code can handle two simultanious boxes
- Tick one of the boxes **off** (click it again) and assert on subtotal
  - Make sure code can handle box checked and then un-checked

Coding to pass tests

- Would recommend using pre-written code on this one
  - no need to learn react-bootstrap unless you want
- If you choose to write code to validate that tests pass
  - Should not have to make any cchanges to _Options.jsx_
    - logic for counting items and calculating subtotal in _Options.jsx_ is already written
    - re-usable without changes for toppings
  - Call `updateItemCount`, with `1` (checkbox on) or `0` (checkbox off)
- Update _ToppingOption.jsx_ to include names and checkboxes
  - `onChange` handler
  - use checkbox from _OrderSummary.jsx_ as a model

# Lesson 64: Code Quiz! Grand Total

- Subject matter for quiz is the _Grand Total_ on `OrderEntry` page
- Should we do a "black box" test (not consider implementation)?
- For example:
  - First update scoops, then toppings
  - Should we also test updating toppings first then scoops?
  - We know from implementation that it shouldn't make a difference
  - Users should be able to do either; and we might change implementation
- Do test functions need to be `async`?
  - Yes, options still need to load from server / mock service worker
  - await both the scoop element **and** another await on the topping element
    - they're separate operations and either could finish first

## How to find element

- From mockups, grand total should be the same size as titles (`<h2>`)
  - we can search using the `heading` role
    - include the text in the `name` option
- Note: `{ exact: false }` is not an _option_ for `*byRole`
  - Either use `*byRole` and regular expression for `name` option, or
    - `screen.getByRole('heading', {name: /grand total: \$/i });`
  - `*byText` and `{ exact: false }`
    - `screen.getByText('Grand total: $', { exact: false })`

## Ignore this error

- The first test will show an error even when passing:

```
Warning: ?Can't perform a React state update on an unmounted
component. This is a no-op, but it indicates a memory lead
in your application
```

- Ignore for now; will address when we reconvene

## Coding to pass tests

- Add grand total to `OrderEntry.tsx`
- Not a huge change
  - add `<h2>` with grand total from context

# Lesson 65: "Unmounted Component" Error

## Options to remedy

- Skip auto cleanup
  - https://testing-library.com/docs/react-testing-library/setup/#skipping-auto-cleanup
  - Not possible on a test-by-test basis
  - not recommended
- Mock useEffect to bypass server call
  - Not recommended, farther from production code path
- Include in the begginning of a test that asserts on state changes
  - One that awaits state changes
    - happen on axios promise resolution
  - Don't need to include in all tests because it only needs to be tested once

## What is there is no test?

- Add awaits to the end of the test to avoid errors
- I don't love this
