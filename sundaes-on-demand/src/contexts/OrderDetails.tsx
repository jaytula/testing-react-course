import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
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
  resetOrder: () => void;
  orderNumber: number;
  setOrderNumber: Dispatch<SetStateAction<number>>;
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
  const [orderNumber, setOrderNumber] = useState<number>(0);

  const resetOrder = () => {
    setOptionCounts({
      scoops: new Map<string, number>(),
      toppings: new Map<string, number>(),
    });
  };

  useEffect(() => {
    const scoopsSubtotal =
      [...optionCounts.scoops.values()].reduce((acc, curr) => acc + curr, 0) *
      pricePerItem.scoops;
    const toppingsSubtotal =
      [...optionCounts.toppings.values()].reduce((acc, curr) => acc + curr, 0) *
      pricePerItem.toppings;
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

      const optionCountsMap = newOptionCounts[optionType];
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionCounts(newOptionCounts);
    };
    // getter: object containing option coutns for scoops and toppings, subtotal, total
    // setter: updateOptionCount
    return {
      ...optionCounts,
      totals,
      updateItemCount,
      resetOrder,
      setOrderNumber,
      orderNumber,
    };
  }, [optionCounts, totals, orderNumber, setOrderNumber]);
  return (
    <OrderDetails.Provider value={value} {...props}>
      {props.children}
    </OrderDetails.Provider>
  );
};
