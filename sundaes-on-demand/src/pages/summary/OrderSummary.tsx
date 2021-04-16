import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";
import SummaryForm from "./SummaryForm";

const OrderSummary: React.FC<{ nextPhase: () => void }> = ({ nextPhase }) => {
  const {
    totals: { grandTotal, scoops, toppings },
  } = useOrderDetails();
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops total: {formatCurrency(scoops)}</h2>
      <h2>Toppings total: {formatCurrency(toppings)}</h2>
      <h2>Grand total: {formatCurrency(grandTotal)}</h2>

      <SummaryForm nextPhase={nextPhase} />
    </div>
  );
};

export default OrderSummary;
