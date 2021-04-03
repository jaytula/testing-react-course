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
        setItems(res.data);
      })
      .catch((err) => {
        console.log("Houston we got a problem");
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
