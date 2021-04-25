import { useEffect, useState } from "react";

const OrderConfirmation: React.FC<{ nextPhase: () => void }> = ({
  nextPhase,
}) => {
  const [orderNumber, setOrderNumber] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:3030/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        setOrderNumber(data.orderNumber);
      });
  }, []);

  if (!orderNumber) return <div>Loading</div>;

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Thank You</h1>

      <p>Your order number is {orderNumber}</p>

      <button onClick={nextPhase}>Create New Order</button>
    </div>
  );
};

export default OrderConfirmation;
