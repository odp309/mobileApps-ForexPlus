import { AppState, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../auth/screen/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ForexSaleScreen from "../screens/ForexSaleScreen";
import BottomNavigator from "./BottomNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const ScreenNavigator = () => {
  const navigation = useNavigation();
  const [appState, setAppState] = useState(AppState.currentState);
  const subscription = AppState.addEventListener('change', handleAppStateChange); 
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("jwt_token");
      navigation.navigate(token ? "HomeScreen" : "Login");
      console.log("Cek Token : " + token);
    } catch (error) {
      console.error("Error checking token:", error);
    }
  };

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "background") {
      console.log("App has gone to the background!");
    } else if (nextAppState === "active") {
      console.log("App has come to the foreground!");
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    checkToken(); 
    () => subscription.remove();  

  }, [navigation]);
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
