import { useOrderDetails } from "../contexts/OrderDetails";

const OrderConfirmation: React.FC<{ nextPhase: () => void }> = ({
  nextPhase,
}) => {
  const {orderNumber} = useOrderDetails();

  if(!orderNumber) return <div>Loading</div>

  return (
    <div style={{ textAlign: 'center'}}>
      <h1>Thank You</h1>

      <p>Your order number is {orderNumber}</p>

      <button onClick={nextPhase}>Create New Order</button>
    </div>
  );
};

export default OrderConfirmation;
