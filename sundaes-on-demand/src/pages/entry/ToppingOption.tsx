import { Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";

interface Props {
  name: string;
  imagePath: string;
  updateItemCount: (name: string, count: string) => void;
}

const ToppingOption: React.FC<Props> = ({
  name,
  imagePath,
  updateItemCount,
}) => {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    updateItemCount(name, event.target.checked ? "1" : "0");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form>
        <Form.Group controlId={`toppings-${name}`}>
          <Form.Check
            type="checkbox"
            defaultChecked={false}
            onChange={onChangeHandler}
            label={name}
          ></Form.Check>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default ToppingOption;
