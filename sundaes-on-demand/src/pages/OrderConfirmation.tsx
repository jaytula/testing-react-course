const OrderConfirmation: React.FC<{ nextPhase: () => void }> = ({
  nextPhase,
}) => {
  return (
    <div>
      <h1>Order Confirmation</h1>

      <p>Order Number: 422</p>

      <button onClick={nextPhase}>Create New Order</button>
    </div>
  );
};

export default OrderConfirmation;
