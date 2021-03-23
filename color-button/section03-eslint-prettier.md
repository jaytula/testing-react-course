# Section 3: ESLint and Testing Library, plus Prettier

## 26. ESLint and Prettier

- Popular linter for JavaScript
  - Linter: analyzes static text and marks syntax that breaks rules
  - Static: analyze code as written, not what happens when code is run
- Linting keeps code style consistent
  - especially for multi-eng projects
- Also catches errors in code
  - using variable before defining
  - importing from nonexisting file
  - etc

- Formatters (like prettier) automatically format code (indents, spacing)
  - example: spaces around curly braces

```javascript
import {useEffect} from 'react';
import { useEffect } from 'react'
```

- Linters address format and style
  - example: preferred assertion method

```javascript
expect(checkbox).toHaveAttribute(checked);
expect(checkbox).toBeChecked();
```

### ESLint Plugins

- Plug-ins extend ESLint
- Testing Library and jest-dom ESLint plugins
  - Enforce best practices
- More info:
  - https://github.com/testing-library/eslint-plugin-testing-library
  - https://github.com/testing-library/eslint-plugin-jest-dom

