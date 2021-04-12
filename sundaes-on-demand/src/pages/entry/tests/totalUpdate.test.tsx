import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  // make sure total starts out 0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = (await screen.findByRole("spinbutton", {
    name: "Vanilla",
  })) as HTMLInputElement;

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = (await screen.findByRole("spinbutton", {
    name: "Chocolate",
  })) as HTMLInputElement;
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test.only("update topping subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = (await screen.findByRole("checkbox", {
    name: "Cherries",
  })) as HTMLInputElement;

  const mmsCheckbox = (await screen.findByRole("checkbox", {
    name: "M&Ms",
  })) as HTMLInputElement;

  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  userEvent.click(mmsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  userEvent.click(mmsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});
