import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";

type Props = {
  optionType: "scoops" | "toppings";
};
const Options: React.FC<Props> = ({ optionType }) => {
  const [items, setItems] = useState<{ name: string; imagePath: string }[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        setError(true);
      });
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

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
        : items.map((item) => (
            <ToppingOption
              key={item.name}
              name={item.name}
              imagePath={item.imagePath}
            />
          ))}
    </Row>
  );
};

export default Options;
