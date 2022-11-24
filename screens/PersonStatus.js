import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";

let data = {};

export default function PersonStatus({ navigation, route }) {
  return (
    <SafeAreaView className="bg-purple-600 flex-1">
      <StatusBar style="light" />
      <Header />
      <View className="justify-center flex-1 pl-4 flex">
        <Text className="font-bold text-purple-300 text-6xl p-4">Totals</Text>
        <View className="flex-row items-center justify-evenly">
          <View className="flex-col items-center">
            <Text className="font-bold text-white text-3xl p-4">Budget</Text>
            <Text className="font-bold text-purple-300 text-4xl p-4">
              {route.params.budget}
            </Text>
          </View>
          <View className="flex-col items-center">
            <Text className="font-bold text-white text-3xl p-4">Remaining</Text>
            <Text className="font-bold text-purple-300 text-4xl p-4">
              {route.params.savings +
                route.params.expense +
                route.params.luxury}
            </Text>
          </View>
        </View>
        <></>
        <Text className="font-bold text-purple-300 text-6xl p-4 mt-20">
          Splits
        </Text>
        <View className="flex-row items-center justify-evenly mr-4">
          <View className="flex-col items-center">
            <Text className="font-bold text-white text-2xl p-4">Savings</Text>
            <Text className="font-bold text-purple-300 text-3xl p-4">
              {route.params.savings}
            </Text>
          </View>
          <View className="flex-col items-center">
            <Text className="font-bold text-white text-2xl p-4">Expenses</Text>
            <Text className="font-bold text-purple-300 text-3xl p-4">
              {route.params.expense}
            </Text>
          </View>
          <View className="flex-col items-center">
            <Text className="font-bold text-white text-2xl p-4">Luxury</Text>
            <Text className="font-bold text-purple-300 text-3xl p-4">
              {route.params.luxury}
            </Text>
          </View>
        </View>
      </View>
      <View className="items-start p-10">
        <TouchableOpacity onPress={() => navigation.navigate("AddExpense")}>
          <Ionicons name="arrow-back" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
