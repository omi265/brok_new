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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { StatusBar } from "expo-status-bar";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((authUser) => {
    //   if (authUser) {
    //     // navigation.replace("Home");
    //   }
    // });
    // return unsubscribe;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("Hello !!!");
        const user = userCredential.user;
        navigation.navigate("Home", {
          name: user.displayName,
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <SafeAreaView className="bg-purple-600 flex-1">
      <StatusBar style="light" />

      <Header />
      <View className="justify-center flex-1 pl-4 flex">
        <Text className="font-bold text-5xl text-white pl-4 pb-12">Login</Text>
        <View className="flex-row items-center">
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
        <TouchableOpacity onPress={() => login()}>
          <Ionicons name="arrow-forward" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
