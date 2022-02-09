import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import {
  BLACK_COLOR,
  DARKER_GRAY_COLOR,
  GRAY_COLOR,
  YELLOW_COLOR,
} from "../colors";
import Movies from "../screens/Movies";
import { ThemeConsumer } from "styled-components/native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <ThemeConsumer>
      {(theme) => (
        <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: theme.mainBgColor }}
          screenOptions={{
            tabBarStyle: {
              backgroundColor: theme.navBgColor,
            },
            tabBarActiveTintColor: theme.navIconColor,
            tabBarInactiveTintColor: theme.navIconColor,
            headerStyle: {
              backgroundColor: theme.mainBgColor,
              shadowColor: "transparent",
            },
            headerTintColor: theme.navIconColor,
            tabBarShowLabel: false,
            headerShadowVisible: false,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontFamily: "Noto Sans Bold",
              fontSize: 24,
            },
          }}
        >
          <Tab.Screen
            name="영화"
            component={Movies}
            options={{
              tabBarIcon: ({ focused, color, size }) => {
                if (focused) {
                  return <Ionicons name="film" color={color} size={size} />;
                } else {
                  return (
                    <Ionicons name="film-outline" color={color} size={size} />
                  );
                }
              },
            }}
          />
          <Tab.Screen
            name="TV"
            component={Tv}
            options={{
              tabBarIcon: ({ focused, color, size }) => {
                if (focused) {
                  return <Ionicons name="ios-tv" color={color} size={size} />;
                } else {
                  return (
                    <Ionicons name="ios-tv-outline" color={color} size={size} />
                  );
                }
              },
            }}
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              tabBarIcon: ({ focused, color, size }) => {
                if (focused) {
                  return (
                    <Ionicons name="ios-search" color={color} size={size} />
                  );
                } else {
                  return (
                    <Ionicons
                      name="ios-search-outline"
                      color={color}
                      size={size}
                    />
                  );
                }
              },
            }}
          />
        </Tab.Navigator>
      )}
    </ThemeConsumer>
  );
}
