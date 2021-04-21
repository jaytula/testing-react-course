import React, { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

const SummaryForm: React.FC<{ nextPhase?: () => void }> = ({ nextPhase }) => {
  const { resetOrder, setOrderNumber } = useOrderDetails();
  const [checked, setChecked] = useState<boolean>(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to{" "}
      {false ? (
        <OverlayTrigger placement="right" overlay={popover}>
          <span style={{ color: "blue" }}>Terms and Conditions</span>
        </OverlayTrigger>
      ) : (
        "Terms and conditions"
      )}
    </span>
  );

  const onSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    resetOrder();

    const response = await fetch("http://localhost:3030/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setOrderNumber(data.orderNumber);

    if (nextPhase) nextPhase();
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!checked}>
        Confirm order
      </Button>
    </Form>
  );
};
export default SummaryForm;
