import { useOrderDetails } from "../contexts/OrderDetails";

const OrderConfirmation: React.FC<{ nextPhase: () => void }> = ({
  nextPhase,
}) => {
  const {orderNumber} = useOrderDetails();

  return (
    <div>
      <h1>Thank You</h1>

      <p>Order Number: {orderNumber}</p>

      <button onClick={nextPhase}>Create New Order</button>
    </div>
  );
};

export default OrderConfirmation;
