import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";
import Options from "./Options";

const OrderEntry: React.FC<{ nextPhase: () => void }> = ({ nextPhase }) => {
  const {
    totals: { grandTotal },
  } = useOrderDetails();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {formatCurrency(grandTotal)}</h2>

      <button onClick={nextPhase}>Order Now</button>
    </div>
  );
};

export default OrderEntry;
