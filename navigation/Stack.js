import { Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ScreenOne = () => <Text></Text>;

const NativeStack = createNativeStackNavigator();

export default function Stack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="One" component={ScreenOne} />
    </NativeStack.Navigator>
  );
}
