import "./App.css";
import { useRef } from "react";

function App() {
  const buttonRef = useRef();

  const onClick = (event) => {
    const previousColor = event.target.style.backgroundColor;
    event.target.style.backgroundColor =
      event.target.style.backgroundColor === "red" ? "blue" : "red";
    event.target.textContent = `Change to ${previousColor}`
  };
  return (
    <div className="App">
      <button
        ref={buttonRef}
        style={{ backgroundColor: "red" }}
        onClick={onClick}
      >
        Change to blue
      </button>
    </div>
  );
}

export default App;
