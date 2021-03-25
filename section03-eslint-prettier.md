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
import { useEffect } from "react";
import { useEffect } from "react";
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

## 27. ESLint for Testing Library and Jest-DOM

```shell
# Install ESLint plugin for testing-library and jest-dom
npm i eslint-plugin-testing-library eslint-plugin-jest-dom
```

- Plug-ins extend ESLint
- Testing Library and jest-dom ESLint plugins
  - Enforce best practices
- https://github.com/testing-library/eslint-plugin-testing-library
- https://github.com/testing-library/eslint-plugin-jest-dom

- My preferred rules and plug-ins
- https://github.com/bonnie/bonniedotdev/blob/master/client/.eslintrc.json

## 28. Configure ESLint in VSCode

- Create `.vscode/settings.json` in project folder

```json
{
  "eslint.options": {
    "configFile": ".eslintrc.json"
  },
  "eslint.validate": ["javascript", "javascriptreact"],
  "[javascript, javascriptreact]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  }
}
```

- https://code.visualstudio.com/docs/getstarted/settings#_settings-file-locations
- Add `.eslintcache` to `.gitignore`

## 29. Configure Prettier in VSCode

- Install VSCode Prettier extension
- In `settings.json`, set property:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## 30. Review: ESLint and Prettier

- ESLint
  - `npm install eslint-plugin-testing-library eslint-plugin-jest-dom`
  - Remove `eslintConfig` from `package.json`
  - Create `.eslintrc.json` and add standard config
  - Install ESlint extension for VSCode
  - Create `.vscode/settings.json` and add standard config
  - Add `.eslintcache` and `.vscode` to `.gitignore`
- Prettier
  - Add settings to `.vscode/settings.json`
  - Install Prettier on VSCode
