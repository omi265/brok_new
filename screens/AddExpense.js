import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import AddExpenseDrop from "../components/AddExpenseDrop";
import { child, get, onValue, push, ref, update } from "firebase/database";
import { auth, db } from "../Firebase";
import ExpenseItem from "../components/ExpenseItem";
import dbData from "../components/dbData";

export default function AddExpense({ navigation }) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [place, setPlace] = useState("");
  const [spends, setSpends] = useState([]);
  const [count, setCount] = useState(false);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  let data = dbData();

  const updateSpend = (title, value, from, key) => {
    setSpends((prevSpends) => {
      // console.log(prevSpends);
      return [
        {
          title: title,
          value: value,
          from: from,
          key: key,
        },
        ...prevSpends,
      ];
    });
  };

  const deleteHandler = (key) => {
    console.log(key);
    // data = dbData();
    console.log(data.spendList[key].from);
    let from = data.spendList[key].from;
    let val = data.spendList[key].value;

    const updates = {};
    const addUpdates = {};

    let temp_spent = parseFloat(data.spent) - parseFloat(val);
    addUpdates["users/" + auth.currentUser.uid + "/spent"] = temp_spent;

    if (from == "Savings") {
      let temp_savings = parseFloat(data.split.savings) + parseFloat(val);
      console.log(temp_savings);
      addUpdates["users/" + auth.currentUser.uid + "/split/savings"] =
        temp_savings;
    } else if (from == "Expense") {
      let temp_expense = parseFloat(data.split.expense) + parseFloat(val);
      console.log(temp_expense);
      addUpdates["users/" + auth.currentUser.uid + "/split/expense"] =
        temp_expense;
    } else if (from == "Luxury") {
      let temp_luxury = parseFloat(data.split.luxury) + parseFloat(val);
      console.log(temp_luxury);
      addUpdates["users/" + auth.currentUser.uid + "/split/luxury"] =
        temp_luxury;
    }
    update(ref(db), addUpdates).then();

    // const updates = {};
    updates["users/" + auth.currentUser.uid + "/spendList/" + key] = null;
    update(ref(db), updates);
    setCount[false];
    setSpends((prevSpends) => {
      return prevSpends.filter((item) => item.key != key);
    });
  };

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, "users/" + auth.currentUser.uid)).then((snapshot) => {
      console.log(snapshot.val());
      data = snapshot.val();
      if (count == false) {
        for (let i in data.spendList) {
          updateSpend(
            data.spendList[i].title,
            data.spendList[i].value,
            data.spendList[i].from,
            data.spendList[i].key
          );
        }
      }

      setCount(true);
    });

    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsVisible(true);
      // console.log(keyboardIsVisible);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsVisible(false);
      // console.log(keyboardIsVisible);
    });
  }, [count]);

  const addHandler = () => {
    const newExpenseKey = push(
      child(ref(db), "users/" + auth.currentUser.uid + "/spendList")
    ).key;

    const newExpense = {
      key: newExpenseKey,
      title: title,
      value: value,
      from: place,
    };

    if (title == "" || value == 0 || place == "") {
      Alert.alert("Oops !", "Fields Cannot be empty", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    } else {
      const updates = {};
      if (place == "Savings") {
        let temp_savings = parseFloat(data.split.savings - value);
        updates["users/" + auth.currentUser.uid + "/split/savings"] =
          temp_savings;
        console.log(temp_savings);
      } else if (place == "Expense") {
        let temp_expense = parseFloat(data.split.expense - value);
        updates["users/" + auth.currentUser.uid + "/split/expense"] =
          temp_expense;
      } else if (place == "Luxury") {
        let temp_luxury = parseFloat(data.split.luxury - value);
        updates["users/" + auth.currentUser.uid + "/split/luxury"] =
          temp_luxury;
      }

      let temp_spent = parseInt(data.spent) + parseInt(value);

      updates["users/" + auth.currentUser.uid + "/spendList/" + newExpenseKey] =
        newExpense;
      updates["users/" + auth.currentUser.uid + "/spent"] = temp_spent;

      update(ref(db), updates).then(() => {
        updateSpend(title, value, place, newExpenseKey);
      });
    }
  };

  return (
    <SafeAreaView className="flex bg-purple-600 flex-1">
      <StatusBar style="light" />

      <Header />
      <View className="justify-center flex-1 pl-4 flex">
        <Text className="font-bold text-purple-300 text-6xl p-4">Add your</Text>
        <Text className="font-bold text-5xl text-white pl-4 pb-12">
          Expense
        </Text>
        <View className="flex-row items-center">
          <View className="bg-white w-1/2 p-4 rounded-2xl ml-4">
            <TextInput
              placeholder="What ?"
              onChangeText={(val) => setTitle(val)}
            />
          </View>

          <View className="bg-white w-1/3 p-4 rounded-2xl ml-4">
            <TextInput
              placeholder="How much ?"
              keyboardType="numeric"
              onChangeText={(val) => setValue(val)}
            />
          </View>
        </View>
        <View className="flex-row mt-4 items-center justify-between">
          <View className="ml-4 w-1/3">
            <AddExpenseDrop setValue={setPlace} name={"From ?"} />
          </View>
          <View className="mr-12">
            <TouchableOpacity onPress={addHandler}>
              <Ionicons name="add-circle" size={45} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {!keyboardIsVisible && (
        <View className="flex-1 mt-6">
          <View className="flex-row ml-4 mb-2">
            <Text className="font-bold text-white text-3xl p-2 ml-4">
              Recent
            </Text>
            <Text className="font-bold text-purple-300 text-3xl p-2 ">
              Expenses
            </Text>
          </View>

          <FlatList
            className="m-3"
            data={spends}
            renderItem={({ item }) => (
              <ExpenseItem item={item} deleteHandler={deleteHandler} />
            )}
            keyExtractor={(item) => item.key}
          />
        </View>
      )}
      <View className="items-end p-8">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => {
            navigation.navigate("Person", {
              budget: data.budget,
              savings: data.split.savings,
              expense: data.split.expense,
              luxury: data.split.luxury,
            });
          }}
        >
          <Text className="font-bold text-purple-300 text-xl p-2 ">
            Overview
          </Text>
          <Ionicons name="arrow-forward" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
