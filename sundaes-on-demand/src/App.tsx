import { useState } from "react";
import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  const [orderPhase, setOrderPhase] = useState<
    "inProgress" | "review" | "complete"
  >("inProgress");

  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        {orderPhase === "inProgress" ? (
          <OrderEntry nextPhase={() => setOrderPhase("review")} />
        ) : null}
        {orderPhase === "review" ? (
          <OrderSummary nextPhase={() => setOrderPhase("complete")} />
        ) : null}
        {orderPhase === "complete" ? (
          <OrderConfirmation nextPhase={() => setOrderPhase("inProgress")} />
        ) : null}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
