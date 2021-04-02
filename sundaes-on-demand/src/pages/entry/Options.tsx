import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import Row from "react-bootstrap/Row";

type Props = {
  optionType: "scoops" | "toppings";
};
const Options: React.FC<Props> = ({ optionType }) => {
  const [items, setItems] = useState<{ name: string; imagePath: string }[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        console.log(res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [optionType]);

  return (
    <Row>
      {optionType === "scoops"
        ? items.map((item) => (
            <ScoopOption
              key={item.name}
              name={item.name}
              imagePath={item.imagePath}
            />
          ))
        : null}
    </Row>
  );
};

export default Options;
