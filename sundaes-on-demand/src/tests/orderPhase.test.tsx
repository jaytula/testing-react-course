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
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole('spinbutton', {name: 'Chocolate'});
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: 'Cherries',
  });
  userEvent.click(cherriesCheckbox);

  expect(await findTextScoopsTotal()).toHaveTextContent("6.00");
  expect(await findTextToppingsTotal()).toHaveTextContent("1.50");
  expect(await findTextGrandTotal()).toHaveTextContent("7.50");

  // find and click order button
  const orderButton = screen.getByRole("button", {
    name: /order sundae/i,
  });

  userEvent.click(orderButton);

  // check summary information based on order
  screen.getByRole("heading", {
    name: 'Order Summary',
  });

  expect(await findTextScoopsTotal()).toHaveTextContent("6.00");
  expect(await findTextToppingsTotal()).toHaveTextContent("1.50");
  expect(await findTextGrandTotal()).toHaveTextContent("7.50");

  // check summary option items
  screen.getByText('1 Vanilla');
  screen.getByText('2 Chocolate');
  screen.getByText('Cherries');

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", { name: /i agree to/i });
  userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // confirm order number on confirmation page
  await screen.findByRole("heading", { name: /thank you/i });

  const orderNumberText = screen.getByText(/order number/i);
  expect(orderNumberText).toHaveTextContent("587");

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  expect(await findTextGrandTotal()).toHaveTextContent("0.00");
  expect(await findTextScoopsTotal()).toHaveTextContent("0.00");
  expect(await findTextToppingsTotal()).toHaveTextContent("0.00");

  // do we need to await anything to avoid test errors?
});
