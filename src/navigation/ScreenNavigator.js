import { AppState, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../auth/screen/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ForexSaleScreen from "../screens/ForexSaleScreen";
import BottomNavigator from "./BottomNavigator";  

const Stack = createNativeStackNavigator();
const ScreenNavigator = () => { 
 
  
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="HomeScreen"
        options={{ headerShown: false }}
        component={BottomNavigator}
      />
      <Stack.Screen name="JualBeliValas" component={ForexSaleScreen} />
    </Stack.Navigator>
  );
};

export default ScreenNavigator;

const styles = StyleSheet.create({});
