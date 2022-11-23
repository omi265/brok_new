import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import AddExpenseDrop from "../components/AddExpenseDrop";
import { child, onValue, push, ref, update } from "firebase/database";
import { auth, db } from "../Firebase";
import ExpenseItem from "../components/ExpenseItem";

export default function AddExpense({ navigation }) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [place, setPlace] = useState("");
  const [spends, setSpends] = useState([]);
  const [count, setCount] = useState(false);

  let data = {};

  const updateSpend = (title, value, from, key) => {
    setSpends((prevSpends) => {
      console.log(prevSpends);
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
    const userDetails = ref(
      db,
      "users/" + auth.currentUser.uid + "/spendList/" + key
    );
    onValue(userDetails, (snapshot) => {
      data = snapshot.val();
    });
    console.log(data.title);
    const updates = {};
    updates["users/" + auth.currentUser.uid + "/spendList/" + key] = null;
    update(ref(db), updates);
    setCount[false];
    setSpends((prevSpends) => {
      return prevSpends.filter((item) => item.key != key);
    });
  };

  useEffect(() => {
    // setName(route.params.name);
    const userDetails = ref(db, "users/" + auth.currentUser.uid);
    onValue(userDetails, (snapshot) => {
      data = snapshot.val();

      console.log(data.spendList);
      //
    });
    if (count == false) {
      console.log("AA GAYA");
      for (let i in data.spendList) {
        console.log(data.spendList[i].title);
        updateSpend(
          data.spendList[i].title,
          data.spendList[i].value,
          data.spendList[i].from,
          data.spendList[i].key
        );
      }
    }

    setCount(true);
    console.log(count);
  }, [count]);

  const pressHandler = () => {
    console.log(spends);
    console.log(count);

    console.log("Added");
    let data = {};
    const userDetails = ref(db, "users/" + auth.currentUser.uid);
    onValue(userDetails, (snapshot) => {
      data = snapshot.val();
    });
    // console.log(data.name);

    const newExpenseKey = push(
      child(ref(db), "users/" + auth.currentUser.uid + "/spendList")
    ).key;
    console.log(newExpenseKey);

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

      updates["users/" + auth.currentUser.uid + "/spendList/" + newExpenseKey] =
        newExpense;

      update(ref(db), updates).then(() => {
        console.log("Ho gaya");
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
            <TouchableOpacity onPress={pressHandler}>
              <Ionicons name="add-circle" size={45} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="flex-1">
        <View className="flex-row ml-4 mb-2">
          <Text className="font-bold text-white text-3xl p-2 ml-4">Recent</Text>
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
    </SafeAreaView>
  );
}
