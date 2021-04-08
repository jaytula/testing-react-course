import { Form, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";

interface Props {
  name: string;
  imagePath: string;
  updateItemCount: (name: string, count: string) => void;
}

const ScoopOption: React.FC<Props> = ({ name, imagePath, updateItemCount }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    updateItemCount(name, event.target.value);
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
        tyle={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
