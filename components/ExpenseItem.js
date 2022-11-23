import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function ExpenseItem({ item, deleteHandler }) {
  return (
    <View className="flex-row ml-8 justify-between p-2">
      <Text className="text-white font-bold text-lg">{item.title}</Text>
      <Text className="text-white font-bold text-lg"> Rs {item.value}</Text>
      <Text className="text-white font-bold text-lg">{item.from}</Text>
      <TouchableOpacity onPress={() => deleteHandler(item.key)}>
        <Entypo name="circle-with-cross" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
