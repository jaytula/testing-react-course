import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatter } from "../../utils";
import Options from "./Options";

const OrderEntry = () => {
  const {
    totals: { grandTotal },
  } = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: ${formatter.format(grandTotal)}</h2>
    </div>
  );
};

export default OrderEntry;
