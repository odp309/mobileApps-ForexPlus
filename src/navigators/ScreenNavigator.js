import { AppState, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import BottomNavigator from "./BottomNavigator";
import ValasHomeScreen from "../screens/valasHome/ValasHomeScreen";
import TransferValasScreen from "../screens/transferValas/TransferValasScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import BottomNavigator from "./BottomNavigator";
import ValasHomeScreen from "../screens/ValasHomeScreen";
import JualValasScreen from "../screens/JualValasScreen";

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
        name="TransferValas"
        component={TransferValasScreen}
        options={{ 
          headerShown:false
          
        }}
      />
      <Stack.Screen
        name="JualValas"
        component={JualValasScreen}

        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ScreenNavigator;

const styles = StyleSheet.create({});
