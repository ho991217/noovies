import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import { ThemeConsumer } from "styled-components/native";

const NativeStack = createNativeStackNavigator();

export default function Stack() {
  return (
    <ThemeConsumer>
      {(theme) => (
        <NativeStack.Navigator
          sceneContainerStyle={{ backgroundColor: theme.mainBgColor }}
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.mainBgColor,
              shadowColor: "transparent",
            },
            headerTintColor: theme.navIconColor,
          }}
        >
          <NativeStack.Screen name="Detail" component={Detail} />
        </NativeStack.Navigator>
      )}
    </ThemeConsumer>
  );
}
