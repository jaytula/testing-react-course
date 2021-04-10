import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { pricePerItem } from "../constants";

export const OrderDetails = createContext<{
  totals: TotalsType;
  updateItemCount: (
    itemName: string,
    newItemCount: string,
    optionType: "scoops" | "toppings"
  ) => void;
  scoops: Map<string, number>;
  toppings: Map<string, number>;
} | null>(null);

// create custom hook to check whether we're inside a provider
export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw Error("useOrderDetails must be used within an OrderDetailsProvider");
  }

  return context;
}

type OptionCountsType = {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
};

type TotalsType = {
  scoops: number;
  toppings: number;
  grandTotal: number;
};

export const OrderDetailsProvider: React.FC = (props) => {
  const [optionCounts, setOptionCounts] = useState<OptionCountsType>({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });
  const [totals, setTotals] = useState<TotalsType>({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const scoopsSubtotal =
      Object.values(optionCounts.scoops).reduce((acc, curr) => acc + curr, 0) *
      pricePerItem.scoops;
    const toppingsSubtotal =
      Object.values(optionCounts.toppings).reduce(
        (acc, curr) => acc + curr,
        0
      ) * pricePerItem.toppings;
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      scoops: scoopsSubtotal,
      toppings: toppingsSubtotal,
      grandTotal,
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    const updateItemCount = (
      itemName: string,
      newItemCount: string,
      optionType: "scoops" | "toppings"
    ) => {
      const newOptionCounts = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };
    // getter: object containing option coutns for scoops and toppings, subtotal, total
    // setter: updateOptionCount
    return { ...optionCounts, totals, updateItemCount };
  }, [optionCounts, totals]);
  return (
    <OrderDetails.Provider value={value} {...props}>
      {props.children}
    </OrderDetails.Provider>
  );
};
