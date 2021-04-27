import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";
import Options from "./Options";

const OrderEntry: React.FC<{ nextPhase: () => void }> = ({ nextPhase }) => {
  const {
    scoops,
    totals: { grandTotal },
  } = useOrderDetails();

  const scoopCount = [...scoops.entries()].reduce((acc, curr) => acc + curr[1], 0)
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand Total: {formatCurrency(grandTotal)}</h2>

      <button onClick={nextPhase} disabled={scoopCount === 0}>Order Sundae</button>
    </div>
  );
};

export default OrderEntry;
