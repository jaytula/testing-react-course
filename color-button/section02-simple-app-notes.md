# Section 2: Simple App: Color Button

## 11. Overall Course Plan

- Start with very simple React
  - focus on Testing Library syntax
- First app: not much of an app
  - changing button color, disabling button with checkbox
  - introduce: testing interactions that affect DOM, unit testing functions
- Build up to more complex functionality and tests
- Second app: design and order an ice-cream sundae
  - testing more complex user interactions, interactions between components
  - mocking server responses with Mock Service Worker
  - testing async functionality

### A note about React Explantations

- Folks come to this course at many levels
- Optional lectures explaining React syntax and decisions
- Feel free to skip!

## 12. Start Color Button App

- Clicking button changes from red to blue and then back when clicked again.

## 17. Intro to Code Quizzes

- Give you spec and hints, you write tests
- Purpose
  - Practice what you've learned
  - reinforce in memory
  - Expose areas where you have questions
    - ask in Q&A
    - Please include link to GitHub for "why is my code not working"
- Start with lots of guidance
  - build to code quizzes with very little guidance

### Test Only or Tests and Code

- Your choice:
  - Code tests only (test against pre-written code provided on GitHub)
  - https://github.com/bonnie/udemy-TESTING-LIBRARY/tree/master/code-quiz
  - Code tets and code
- I recommend coding both the tests and code
  - Dive deeper into how code and tests interact
  - Pracrtice debugging tests and code at the same time
- Option to use pre-written code for
  - those with limited time
  - help in debugging whether *code* for *tests* are the issue

# 21. Unit Testing Functions

- Functions separate from components
  - Used by several components
  - Complex logic
- Unit test if
  - Complex logic difficult to test via functional tests
  - Too many edge cases

# 24. When to Unit Tests

- When to unit test?
  - `replaceCamelWithSpaces` is pretty simple
  - could be covered by functional tests on button
- For more complicated functions, unit tests help with:
  - covering all possible edge cases
  - determining what caused functional tests to fail
- Issue with functional tests:
  - high-level makes them resistant to refactors
  - high-level makes them difficult to diagnose