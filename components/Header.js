import { View, Text, StyleSheet, StatusBar, SafeAreaView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { auth } from "../Firebase";

export default function Header() {
  const [name, setName] = useState("");

  useLayoutEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setName(auth.currentUser.displayName);
    }
  }, []);

  return (
    <SafeAreaView className="bg-purple-600">
      <View style={styles.safeView} className="pt-5">
        <View className="flex-row pb-3 items-center mx-4 space-x-2">
          <Text className="text-white text-3xl font-bold flex-1 pl-4">
            bro-k
          </Text>

          {auth.currentUser && (
            <View>
              <Text className="font-bold text-white text-xs">Hello</Text>
              <Text className="font-bold text-xl text-purple-300">
                {auth.currentUser.displayName}
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeView: {
    marginTop: StatusBar.currentHeight,
  },
});
