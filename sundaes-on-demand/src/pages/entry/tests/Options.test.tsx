import { render, screen } from "@testing-library/react";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

import Options from "../Options";

describe("Options test", () => {
  test("displays image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

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
});
