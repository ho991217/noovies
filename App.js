import AppLoading from "expo-app-loading";
import React from "react";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./style";

export default function App() {
  const isDark = useColorScheme() === "dark";

  const [fonts] = Font.useFonts({
    "Noto Sans Regular": require("./fonts/NotoSansKR-Regular.otf"),
    "Noto Sans Black": require("./fonts/NotoSansKR-Black.otf"),
    "Noto Sans Bold": require("./fonts/NotoSansKR-Bold.otf"),
    "Noto Sans Medium": require("./fonts/NotoSansKR-Medium.otf"),
  });

  if (!fonts) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
