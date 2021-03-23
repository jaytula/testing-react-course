import "./App.css";
import { useState } from "react";

const INITIAL_COLOR = 'MediumVioletRed';
const ALT_COLOR = 'MidnightBlue';

function App() {
  const [buttonColor, setButtonColor] = useState(INITIAL_COLOR);
  const [buttonText, setButtonText] = useState("Change to Midnight Blue");
  const [checked, setChecked] = useState(false);

  const nextColor = buttonColor === INITIAL_COLOR ? ALT_COLOR : INITIAL_COLOR;

  const onClick = (event) => {
    setButtonText(`Change to ${replaceCamelWithSpaces(buttonColor)}`);
    setButtonColor(nextColor);
  };

  return (
    <div className="App" style={{color: 'white'}}>
      <button
        style={{ backgroundColor: checked ? 'gray' : buttonColor }}
        onClick={onClick}
        disabled={checked}
      >
        {buttonText}
      </button>
      <div>
        <label htmlFor="checkbox-disabler">Disable Button</label>
        <input
          type="checkbox"
          aria-checked={checked}
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
          id="checkbox-disabler"
        />
      </div>
    </div>
  );
}

export const replaceCamelWithSpaces = colorName => {
  const result = []
  colorName.split('').reverse().forEach((letter) => {
    result.push(letter);
    if(letter.match(/[A-Z]/)) result.push(' ');
  })
  return result.reverse().join('').trim()
}

export default App;
