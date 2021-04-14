import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";
import Options from "./Options";

const OrderEntry = () => {
  const {
    totals: { grandTotal },
  } = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: ${formatCurrency(grandTotal)}</h2>
    </div>
  );
};

export default OrderEntry;
