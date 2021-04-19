import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";
import SummaryForm from "./SummaryForm";

const OrderSummary: React.FC<{ nextPhase: () => void }> = ({ nextPhase }) => {
  const { totals, scoops, toppings } = useOrderDetails();

  return (
    <div>
      <h1>Order Summary</h1>
      <ul>
        {[...scoops.entries()].map(([key, value]) => (
          <li key={key}>
            {value} {key}
          </li>
        ))}
      </ul>

      <ul>
        {[...toppings.entries()].map(([key, value]) => (
          <li key={key}>
            {key}
          </li>
        ))}
      </ul>
      <h2>Scoops total: {formatCurrency(totals.scoops)}</h2>
      <h2>Toppings total: {formatCurrency(totals.toppings)}</h2>
      <h2>Grand total: {formatCurrency(totals.grandTotal)}</h2>

      <SummaryForm nextPhase={nextPhase} />
    </div>
  );
};

export default OrderSummary;
