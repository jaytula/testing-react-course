import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

const findTextGrandTotal = async () => screen.findByText(/grand total/i);
const findTextScoopsTotal = async () => screen.findByText(/scoops total/i);
const findTextToppingsTotal = async () => screen.findByText(/toppings total/i);

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  expect(await findTextGrandTotal()).toHaveTextContent("0.00");
  expect(await findTextScoopsTotal()).toHaveTextContent("0.00");
  expect(await findTextToppingsTotal()).toHaveTextContent("0.00");

  // add ice cream scoops and toppings
  const mintChipScoop = await screen.findByRole("spinbutton", {
    name: /mint chip/i,
  });
  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: /hot fudge/i,
  });

  userEvent.clear(mintChipScoop);
  userEvent.type(mintChipScoop, "2");
  expect(await findTextScoopsTotal()).toHaveTextContent("4.00");

  userEvent.click(hotFudgeCheckbox);
  expect(await findTextToppingsTotal()).toHaveTextContent("1.50");
  expect(await findTextGrandTotal()).toHaveTextContent("5.50");

  // find and click order button
  const orderButton = screen.getByRole("button", {
    name: /order now/i,
  });

  userEvent.click(orderButton);

  // check summary information based on order
  screen.getByRole("heading", {
    name: /order summary/i,
  });

  expect(await findTextScoopsTotal()).toHaveTextContent("4.00");
  expect(await findTextToppingsTotal()).toHaveTextContent("1.50");
  expect(await findTextGrandTotal()).toHaveTextContent("5.50");

  // accept terms and conditions and click button to confirm order
  const agreeCheckbox = screen.getByRole("checkbox", { name: /i agree to/i });
  userEvent.click(agreeCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  await screen.findByRole("heading", { name: "Order Confirmation" });

  const orderNumberText = screen.getByText(/order number/i);
  expect(orderNumberText).toHaveTextContent("587");

  // click "new order" button on confirmation page
  const createNewOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(createNewOrderButton);

  // check that scoops and toppings subtotals have been reset
  expect(await findTextGrandTotal()).toHaveTextContent("0.00");
  expect(await findTextScoopsTotal()).toHaveTextContent("0.00");
  expect(await findTextToppingsTotal()).toHaveTextContent("0.00");

  // do we need to await anything to avoid test errors?
});
