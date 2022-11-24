import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../Firebase";
import { StatusBar } from "expo-status-bar";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Welcome({ navigation }) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("User Exists");
        navigation.navigate("Home", {
          name: auth.currentUser.displayName,
        });
      }
    });
  }, []);

  return (
    <SafeAreaView className="bg-purple-600 flex-1">
      <StatusBar style="light" />
      <Header />
      <View className="justify-center flex-1 pl-4 flex">
        <Text className="font-bold text-purple-300 text-6xl p-4">
          Welcome to
        </Text>
        <Text className="font-bold text-5xl text-white pl-4 pb-12">bro-k</Text>
        <View className="flex-row items-center">
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className="flex-row items-center"
            >
              <Text className="font-bold text-white text-3xl p-4">Login</Text>
              <Ionicons name="arrow-forward" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              className="flex-row items-center"
            >
              <Text className="font-bold text-white text-3xl p-4">
                Register
              </Text>
              <Ionicons name="arrow-forward" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                signOut(auth)
                  .then(() => {
                    navigation.replace("Welcome");
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
              }}
              className="flex-row items-center"
            >
              <Text className="font-bold text-white text-3xl p-4">Signout</Text>
              <Ionicons name="arrow-forward" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="items-end p-10"></View>
    </SafeAreaView>
  );
}
