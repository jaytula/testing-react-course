import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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

  test("popover responds to hover", async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover appears on mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disappears when we mouse out
    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
  });
});
