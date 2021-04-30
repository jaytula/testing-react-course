import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";

interface Props {
  name: string;
  imagePath: string;
  updateItemCount: (name: string, count: string) => void;
}

const ScoopOption: React.FC<Props> = ({ name, imagePath, updateItemCount }) => {
  const [value, setValue] = useState<string>("0");

  const checkValidity = (value: string) => {
    const currentValue = parseFloat(value);
   return currentValue >= 0 &&
      currentValue <= 10 &&
      Math.floor(currentValue) === currentValue;
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    if(checkValidity(event.target.value)) updateItemCount(name, event.target.value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            isInvalid={!checkValidity(value)}
            value={value}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
