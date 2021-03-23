# Section 1: Introduction

## 1. Introduction to Testing Library and Jest

React Testing Library

- Not just a library, also a philosophy (opinionited)
  - Test your software the way users actually use it
    - not internal implementation
  - Find elements by accessibility markers, not test IDs
- More philosophy later

- React Test Library
  - Provides virtual DOM for tests
- Jest
  - Test runner that
    - Find tests
    - Runs tests
    - Determines whether tests pass or fail

- Let's start with the test!
  - `npx create-react-app color-button`

## 2. Create-React-App

- npm package
- Creates React applications with...
  - Configuration
  - Webpack and Babel
  - Web server
  - Testing Library!

- We will be using `npx` with create-react-app
  - Downloads the latest version of create-react-app templates every time
  - Not dependent on when you last installed `create-react-app`
    - Never installed on your machine!
- `npx` comes with `npm` `5.2+` and higher
- If you have an oldver version of `npm` and can't upgrade:
  - Go to https://github.com/facebook/create-react-app
  - Follow link "instrucations for older npm versions"

## 3. First Test with Testing Library


```js
// App.test.js - Test that came out of the box for CRA
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByTest(/learn react/i)
  expect(linkElement).toBeInTheDocument();
})
```

# 4. Jest and Jest-DOM Assertions

```javascript
// expect([subject of assertion]).[matcher]()
expect(linkElement).toBeInTheDocument();
```

- More assertion examples
  - `expect(elemment.textContent).toBe('hello');`
  - `expect(elementsArray).toHaveLength(7);`
- jest-dom
  - comes with create-react-app
  - `src/setupTests.js` imports it before each test, make matchers available
  - DOM-based matchers e.g. `.toBeInTheDocument()`
    - examples: `toBeVisible()` or `toBeChecked()`

# 5. Jest: Watch Mode and How Tests Works

- React Testing Library helps with
  - rendering components into virtual DOM
  - searching virtual DOM
  - Interacting with virtual DOM
- Needs a test runner
  - Find tests, run them, make assertions
- Jest
  - is recommended by Testing Library
  - comes with create-react-app
- `npm test` runs an npm script that runs Jest in watch mode

## Jest Watch Mode

- Watch for changes in files since last commit
- Only run tests related to these files
- No changes? No tests
  - Type `a` to run all tests

## How does Jest Work?

- global `test` method has two arguments:
  - string description
  - test function
- Test fails if error is thrown when running function
  - assertions throw errors when expection fails
- No error means tests pass
  - Empty test passes!

# 6. TDD (Test-Driven Development)

- Write tests before writing code
  - then write code according to "spec" set by tests
- "red-green" testing
  - Tests fail before code is written

1. Write "shell" function
2. Write tests
3. Tests fail
4. Write code
5. Tests pass!

## Why TDD?

- Makes a huge difference in how it feels to write tests
  - part of the coding process, not a "chore" to do at the end
- More efficient
  - Re-run tests "for free" after change

# 7. React Testing Library Philosophy

## What does React Testing Library Do?

- Creates a virtual DOM for testing
  - and utitilities for interacting with DOM
- Allows testing without a browser

## Types of Tests

- Unit tests
  - Tests one unit of code in isolation
- Integration tests
  - How multiple units work together
- Functional tests
  - Tests a particular function of software (testing behavior)
- Acceptance / End-to-end (E2E) Tests
  - Use actual browser and server (Cypress, Selenium)
