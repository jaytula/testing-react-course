import "./App.css";
import { useState } from "react";

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [buttonText, setButtonText] = useState('Change to blue');
  const [checked, setChecked] = useState(false)

  const nextColor = buttonColor === 'red' ? 'blue' : 'red';

  const onClick = (event) => {
    setButtonText(`Change to ${buttonColor}`)
    setButtonColor(nextColor);
  };

  return (
    <div className="App">
      <button
        style={{ backgroundColor: buttonColor }}
        onClick={onClick}
        disabled={checked}
      >
        {buttonText}
      </button>
      <div>
        <label htmlFor="checkbox-disabler">Disable Button</label>
        <input type="checkbox" checked={checked} onChange={() => setChecked(prev => !prev)} id="checkbox-disabler" />
      </div>
    </div>
  );
}

export default App;
