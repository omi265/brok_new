import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../Firebase";
import { StatusBar } from "expo-status-bar";
import { ref, set } from "firebase/database";

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((authUser) => {
    //   if (authUser) {
    //     console.log(auth.currentUser.displayName);
    //     let data = {};
    //     const userDetails = ref(db, "users/" + auth.currentUser.uid);
    //     onValue(userDetails, (snapshot) => {
    //       data = snapshot.val();
    //     });
    //     console.log(data);
    //     if (data.budget == 0) {
    //       navigation.navigate("Home", {
    //         name: user.displayName,
    //       });
    //     } else if (data.split.savings == 0) {
    //       navigation.replace("Split");
    //     } else {
    //       navigation.replace("AddExpense");
    //     }
    //   }
    // });
    // return unsubscribe;
  }, []);

  const register = () => {
    // const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Signed in
        const user = auth.currentUser;
        updateProfile(user, {
          displayName: name,
        });
        console.log("Registering");
        set(ref(db, "users/" + user.uid), {
          name: name,
          email: email,
          budget: 0,
          split: {
            savings: 0,
            expense: 0,
            luxury: 0,
          },
          spent: {
            savings: 0,
            expense: 0,
            luxury: 0,
          },
          remaining: {
            savings: 0,
            expense: 0,
            luxury: 0,
          },
          spends: {},
        });
        navigation.navigate("Home", {
          name: name,
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
        // ..
      });
  };

  return (
    <SafeAreaView className="bg-purple-600 flex-1">
      <StatusBar style="light" />

      <Header />
      <View className="justify-center flex-1 pl-4 flex">
        <Text className="font-bold text-5xl text-white pl-4 pb-12">
          Register
        </Text>
        <View className="flex-row items-center pt-10">
          <View className="bg-white w-1/2 p-4 rounded-2xl ml-4">
            <TextInput
              placeholder="Name"
              onChangeText={(val) => setName(val)}
            />
          </View>
        </View>
        <View className="flex-row items-center pt-10">
          <View className="bg-white w-1/2 p-4 rounded-2xl ml-4">
            <TextInput
              placeholder="Email"
              onChangeText={(val) => setEmail(val)}
            />
          </View>
        </View>
        <View className="flex-row items-center pt-10">
          <View className="bg-white w-1/2 p-4 rounded-2xl ml-4">
            <TextInput
              placeholder="Password"
              secureTextEntry
              onChangeText={(val) => setPassword(val)}
            />
          </View>
        </View>
      </View>
      <View className="items-end p-10">
        <TouchableOpacity
          onPress={() => {
            register();
          }}
        >
          <Ionicons name="arrow-forward" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
