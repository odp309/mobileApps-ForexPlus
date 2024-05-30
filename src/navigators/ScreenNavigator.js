import { AppState, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";  
import BottomNavigator from "./BottomNavigator";  
import ValasHomeScreen from "../screens/ValasHomeScreen";

const Stack = createNativeStackNavigator();
const ScreenNavigator = () => { 
 
  
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false,headerStyle:{}}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="ValasHome"
        options={{ headerShown: false,headerStyle:{}}}
        component={ValasHomeScreen}
      />
      <Stack.Screen
        name="HomePage"
        options={{ headerShown: false }}
        component={BottomNavigator}
      /> 
    </Stack.Navigator>
  );
};

export default ScreenNavigator;

const styles = StyleSheet.create({});
