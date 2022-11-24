import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { auth, db } from "../Firebase";
import {
  getDatabase,
  ref,
  onValue,
  update,
  get,
  child,
} from "firebase/database";
import dbData from "../components/dbData";

let data = {};
let savings = 0;

export default function HomeScreen({ navigation, route }) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, "users/" + auth.currentUser.uid)).then((snapshot) => {
      console.log(snapshot.val());
      data = snapshot.val();
      setName(data.name);
      if (data.budget != 0) {
        navigation.navigate("Split");
      }
    });
    // const userDetails = ref(db, "users/" + auth.currentUser.uid);
    // onValue(userDetails, (snapshot) => {
    //   const data = snapshot.val();
    //   setName(data.name);
    //   if (data.budget != 0) {
    //     navigation.navigate("Split");
    //   }
    // });
    // console.log(data);
  }, [data]);

  const pressHandler = () => {
    let data = {};
    data = dbData();
    // console.log(data);

    if (data.budget != 0) {
      Alert.alert("Oops !", "Your Budget already exists", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
      navigation.navigate("Split");
    } else if (budget == 0) {
      Alert.alert("Oops !", "Your Budget cannot be 0", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    } else {
      const updates = {};
      updates["users/" + auth.currentUser.uid + "/budget"] = budget;
      update(ref(db), updates).then(() => {
        console.log("Ho gaya");
        navigation.navigate("Split", {
          savings: data.split.savings,
        });
      });
    }
  };

  return (
    <SafeAreaView className="bg-purple-600 flex-1">
      <StatusBar style="light" />
      <Header />
      <View className="justify-center flex-1 pl-4 flex">
        <Text className="font-bold text-purple-300 text-6xl p-4">
          Hey {name},
        </Text>
        <Text className="font-bold text-5xl text-white pl-4 pb-12">
          What is your Budget ?
        </Text>
        <View className="flex-row items-center">
          <View className="bg-white w-1/2 p-4 rounded-2xl ml-4">
            <TextInput
              placeholder="Budget"
              keyboardType="numeric"
              onChangeText={(val) => setBudget(val)}
            />
          </View>
        </View>
      </View>
      <View className="items-end p-10">
        <TouchableOpacity onPress={pressHandler}>
          <Ionicons name="arrow-forward" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    marginTop: StatusBar.currentHeight,
  },
});
