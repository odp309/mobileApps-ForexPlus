import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ExitScreen from "../auth/screen/ExitScreen";
import { useNavigation } from "@react-navigation/native";

const BottomNavigator = () => {
  
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Beranda"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Beranda" component={HomeScreen} />
      <Tab.Screen name="Keluar" component={ExitScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
