import { AppState, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomNavigator from "./BottomNavigator";
import colors from "../theme/colors";
import ValasHomeScreen from "../screens/valasHome/ValasHomeScreen";
import CheckTargetAccountScreen from "../screens/valasHome/valasTransfer/CheckTargetAccountScreen";
import ValasJualScreen from "../screens/valasHome/valasJual/ValasJualScreen";
import EnterTransferScreen from "../screens/valasHome/valasTransfer/EnterTransferScreen";
import PinConfirmationScreen from "../screens/valasHome/PinConfirmationScreen";
import ValasBeliScreen from "../screens/valasHome/valasBeli/ValasBeliScreen";
import TransactionResultScreen from "../screens/valasHome/TransactionResultScreen";
import ChooseBranchScreen from "../screens/valasHome/valasTarik/ChooseBranchScreen";

const Stack = createNativeStackNavigator();
const ScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
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
        component={ValasJualScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TransferValas"
        component={CheckTargetAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EnterTransfer"
        component={EnterTransferScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PinConfirmation"
        component={PinConfirmationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ValasBeli"
        component={ValasBeliScreen}
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="TransactionResult"
        component={TransactionResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseBranch"
        component={ChooseBranchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ScreenNavigator;

const styles = StyleSheet.create({});
