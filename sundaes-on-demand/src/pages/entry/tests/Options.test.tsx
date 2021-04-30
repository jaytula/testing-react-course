import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from '@testing-library/user-event';

import Options from "../Options";

const getScoopsTotal = async () => screen.findByText(/scoops total/i);
const getScoopsTotalHtml = async () => {
  const element = await getScoopsTotal();
  return element.innerHTML;
}

describe("Options test", () => {
  test("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    // find images
    const scoopImages = (await screen.findAllByRole("img", {
      name: /scoop$/i,
    })) as HTMLImageElement[];
    expect(scoopImages).toHaveLength(2);

    // confirm alt text
    const altText = scoopImages.map((element) => element.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
  });

  test("display image for each topping option from server", async () => {
    render(<Options optionType="toppings" />, {
      wrapper: OrderDetailsProvider,
    });

    // find images
    const toppingImages = (await screen.findAllByRole("img", {
      name: /topping$/i,
    })) as HTMLImageElement[];
    expect(toppingImages.length).toBe(3);

    const altText = toppingImages.map((el) => el.alt);
    expect(altText).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
    ]);
  });

  test.only('scoop subtotal does not update when input invalid', async () => {
    render(<Options optionType="scoops" />)
    
    const initialScoopsTotal = await getScoopsTotalHtml();

    expect(initialScoopsTotal).toMatch('$0.00');

    const vanillaInput = await screen.findByRole('spinbutton', {name: /vanilla/i})
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    const twoScoopsTotal = await getScoopsTotalHtml();
    expect(initialScoopsTotal).not.toBe(twoScoopsTotal);
    expect(twoScoopsTotal).toMatch('$4.00');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "11");
    const elevenScoopsTotal = await getScoopsTotalHtml();
    expect(twoScoopsTotal).not.toBe(elevenScoopsTotal); 
    expect(twoScoopsTotal).toMatch('$4.00');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "8");
    const eightScoopsTotal = await getScoopsTotalHtml();
    expect(eightScoopsTotal).not.toBe(elevenScoopsTotal)
    expect(eightScoopsTotal).toMatch('$16.00');

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "-1");
    const minusOneTotal = await getScoopsTotalHtml();
    expect(minusOneTotal).toBe(eightScoopsTotal);
    expect(minusOneTotal).toMatch('$16.00');
  })
});
