import { AppState, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomNavigator from "./BottomNavigator";
import ValasHomeScreen from "../screens/ValasHomeScreen";
import JualValasScreen from "../screens/JualValasScreen";
import colors from "../theme/colors";

const Stack = createNativeStackNavigator();
const ScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="JualValas">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false, headerStyle: {} }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="ValasHome"
        options={{ headerShown: false, headerStyle: {} }}
        component={ValasHomeScreen}
      />
      <Stack.Screen
        name="HomePage"
        options={{ headerShown: false }}
        component={BottomNavigator}
      />
      <Stack.Screen
        name="JualValas"
        component={JualValasScreen}

        options={{
          headerShown: false,
          headerTitle: "Masukkan Jumlah Penjualan",
          headerTitleAlign: "center",
          headerShadowVisible: false, // Set to false to remove the shadow
          headerTitleStyle: {
            color: colors.color.black, // Change the color to your desired color
          },
          headerLeft: () => (
            <Ionicons name="arrow-back" size={24} color={colors.color.black} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ScreenNavigator;

const styles = StyleSheet.create({});
