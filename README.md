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