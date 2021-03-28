import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    userEvent.click(agreeCheckbox);
    expect(agreeCheckbox).toBeChecked();
    expect(submitOrderButton).toBeEnabled();

    userEvent.click(agreeCheckbox);
    expect(agreeCheckbox).not.toBeChecked();
    expect(submitOrderButton).toBeDisabled();
  });

  test("popover responds to hover", () => {
    render(<SummaryForm />);

    // popover starts out hidden

    // popover appears on mouseover of checkbox label

    // popover disappears when we mouse out
  });
});
