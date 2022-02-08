import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Image, Text } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { useAsset } from "expo-asset";

export default function App() {
  const [fonts] = Font.useFonts(Ionicons.font);
  if (!fonts) {
    return <AppLoading />;
  }
  return <Text>hiadfgdsgsgf</Text>;
}
