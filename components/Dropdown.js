import React, { useState } from "react";
import { Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function Dropdown({ setValue, name }) {
  const data = [
    { key: "10", value: "10%" },
    { key: "20", value: "20%" },
    { key: "30", value: "30%" },
    { key: "40", value: "40%" },
    { key: "50", value: "50%" },
    { key: "60", value: "60%" },
    { key: "70", value: "70%" },
    { key: "80", value: "80%" },
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
