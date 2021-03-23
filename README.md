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