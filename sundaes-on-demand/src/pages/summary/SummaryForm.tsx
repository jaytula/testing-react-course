import { useState } from "react";

const SummaryForm = () => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div>
      <h1>Summary Form</h1>

      <input
        type="checkbox"
        id="agree-checkbox"
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
      />
      <label htmlFor="agree-checkbox">
        I agree to <a href="#">Terms and Conditions</a>
      </label>

      <button disabled={!checked}>Confirm order</button>
    </div>
  );
};
export default SummaryForm;
