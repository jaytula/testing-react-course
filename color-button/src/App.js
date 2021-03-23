import "./App.css";
import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [buttonText, setButtonText] = useState("Change to blue");
  const [checked, setChecked] = useState(false);

  const nextColor = buttonColor === "red" ? "blue" : "red";

  const onClick = (event) => {
    setButtonText(`Change to ${buttonColor}`);
    setButtonColor(nextColor);
  };

  return (
    <div className="App">
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
