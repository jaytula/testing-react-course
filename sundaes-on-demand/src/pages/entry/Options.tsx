import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatter } from "../../utils";

type Props = {
  optionType: "scoops" | "toppings";
};
const Options: React.FC<Props> = ({ optionType }) => {
  const { updateItemCount, totals } = useOrderDetails();
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

  const title = optionType[0].toUpperCase() + optionType.slice(1);

  return (
    <Fragment>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total: {formatter.format(totals[optionType])}
      </p>
      <Row>
        {optionType === "scoops"
          ? items.map((item) => (
              <ScoopOption
                key={item.name}
                name={item.name}
                imagePath={item.imagePath}
                updateItemCount={(name: string, count: string) => {
                  updateItemCount(name, count, "scoops");
                }}
              />
            ))
          : items.map((item) => (
              <ToppingOption
                key={item.name}
                name={item.name}
                imagePath={item.imagePath}
                updateItemCount={(name: string, count: string) => {
                  updateItemCount(name, count, "toppings");
                }}
              />
            ))}
      </Row>
    </Fragment>
  );
};

export default Options;
