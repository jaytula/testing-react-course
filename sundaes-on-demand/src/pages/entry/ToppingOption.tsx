import Col from "react-bootstrap/Col";

interface Props {
  name: string;
  imagePath: string;
  updateItemCount: (name: string, count: string) => void;
}

const ToppingOption: React.FC<Props> = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030${imagePath}`}
        alt={`${name} topping`}
      />
    </Col>
  );
};

export default ToppingOption;