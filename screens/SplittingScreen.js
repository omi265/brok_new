import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import Dropdown from "../components/Dropdown";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../Firebase";
import { onValue, ref, update } from "firebase/database";
import dbData from "../components/dbData";

let data = {};

export default function SplittingScreen({ navigation }) {
  const [savings, setSavings] = useState(null);
  const [expense, setExpense] = useState(null);
  const [luxury, setLuxury] = useState(null);

  useLayoutEffect(() => {
    // setName(route.params.name);
    data = dbData();

    if (data.split.savings != 0) {
      navigation.navigate("AddExpense");
    }
  }, []);

  const pressHandler = () => {
    let total = 0;
    let temp_savings = savings;
    let temp_expense = expense;
    let temp_luxury = luxury;

    temp_savings = parseFloat(temp_savings.replace("%", ""));
    temp_expense = parseFloat(temp_expense.replace("%", ""));
    temp_luxury = parseFloat(temp_luxury.replace("%", ""));

    total = temp_savings + temp_expense + temp_luxury;
    console.log(total);

    let data = {};
    const userDetails = ref(db, "users/" + auth.currentUser.uid);
    onValue(userDetails, (snapshot) => {
      data = snapshot.val();
    });
    if (data.split.savings != 0) {
      Alert.alert("Oops !", "Your Splits already exist", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
      navigation.navigate("AddExpense");
    } else if (savings == 0 || expense == 0 || luxury == 0) {
      Alert.alert("Oops !", "Your Splits cannot be 0", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    } else if (total != 100) {
      Alert.alert("Oops !", "Your Splits total should be 100%", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    } else {
      console.log(expense);
      const updates = {};

      updates["users/" + auth.currentUser.uid + "/split/savings"] =
        temp_savings;

      updates["users/" + auth.currentUser.uid + "/split/expense"] =
        temp_expense;

      updates["users/" + auth.currentUser.uid + "/split/luxury"] = temp_luxury;
      update(ref(db), updates).then(() => {
        console.log("Ho gaya");
        navigation.navigate("AddExpense");
      });
    }
    // convert();
  };

  return (
    <SafeAreaView className="bg-purple-600 flex-1">
      <StatusBar style="light" />

      <Header />
      <View className="justify-center flex-1 mb-40 pl-4 flex mt-40">
        <Text className="font-bold text-purple-300 text-6xl p-4">
          Define Your
        </Text>
        <Text className="font-bold text-5xl text-white pl-4 pb-12">Splits</Text>
        <View className="flex-row items-center justify-evenly mr-4">
          <Dropdown setValue={setSavings} name={"Save"} />
          <Dropdown setValue={setExpense} name={"Spend"} />
          <Dropdown setValue={setLuxury} name={"Luxury"} />
        </View>
      </View>
      <View className="items-end p-10">
        <TouchableOpacity onPress={() => pressHandler()}>
          <Ionicons name="arrow-forward" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
