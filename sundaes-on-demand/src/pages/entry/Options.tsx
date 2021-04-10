import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";

import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { useOrderDetails } from "../../contexts/OrderDetails";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

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
