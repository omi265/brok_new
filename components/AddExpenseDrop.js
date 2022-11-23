import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

export default function AddExpenseDrop({ setValue, name }) {
  const data = [
    { key: "10", value: "Savings" },
    { key: "20", value: "Expense" },
    { key: "30", value: "Luxury" },
  ];

  return (
    <SelectList
      setSelected={(val) => setValue(val)}
      data={data}
      save="value"
      search={false}
      placeholder={name}
      boxStyles={{
        backgroundColor: "#FFFF",
        // width: 25,
      }}
      dropdownStyles={{
        backgroundColor: "#FFFF",
      }}
      inputStyles={{
        color: "#8e24aa",
        fontWeight: "bold",
      }}
      dropdownTextStyles={{
        color: "#8e24aa",
        fontWeight: "bold",
      }}
    />
  );
}
