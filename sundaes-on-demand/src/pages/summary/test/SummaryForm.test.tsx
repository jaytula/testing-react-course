import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("SummaryForm", () => {
  test("checkbox enables button", () => {
    render(<SummaryForm />);

    const agreeCheckbox = screen.getByRole("checkbox", { name: /I agree to/i });
    const submitOrderButton = screen.getByRole("button", {
      name: "Confirm order",
    });

    expect(agreeCheckbox).not.toBeChecked();
    expect(submitOrderButton).toBeDisabled();

    fireEvent.click(agreeCheckbox);
    expect(agreeCheckbox).toBeChecked();
    expect(submitOrderButton).toBeEnabled();

    fireEvent.click(agreeCheckbox);
    expect(agreeCheckbox).not.toBeChecked();
    expect(submitOrderButton).toBeDisabled();
  });
});
