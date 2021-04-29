import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("validate scoop count value", () => {
  render(
    <ScoopOption
      name="vanilla"
      imagePath="images/vanilla.png"
      updateItemCount={jest.fn()}
    />
  );

  const vanillaInput = screen.getByRole("spinbutton", { name: /vanilla/i });
  expect(vanillaInput).not.toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(vanillaInput).not.toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");
});
