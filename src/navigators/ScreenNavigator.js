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
import ValasBeliScreen from "../screens/valasHome/valasBeli/ValasBeliScreen.js";
import ValasTarikScreen from "../screens/valasHome/valasTarik/ValasTarikScreen.js";
import HistoryScreen from "../screens/valasHome/riwayatTransaksi/HistoryScreen.js";
import TransactionResultScreen from "../screens/valasHome/TransactionResultScreen";
import ChooseBranchScreen from "../screens/valasHome/valasTarik/ChooseBranchScreen";
import ValasRiwayatScreen from "../screens/valasHome/riwayat/ValasRiwayatScreen";
import ChooseDateScreen from "../screens/valasHome/valasTarik/ChooseDateScreen";
import ChooseWalletScreen from "../screens/valasHome/valasAddWallet/ChooseWalletScreen.js";
import FirstTopUpScreen from "../screens/valasHome/valasAddWallet/FirstTopUpScreen.js";
import ValasReservationScreen from "../screens/valasHome/reservasi/ValasReservationScreen.js";
import DetailHistoryScreen from "../screens/valasHome/riwayatTransaksi/DetailHistoryScreen.js";
import CurrencyInformationScreen from "../screens/valasHome/currencyInformation/CurrencyInformationScreen.js";   
import CloseLimitModal from "../components/valasHome/shared/CloseLimitModal.js";
import CloseValasModal from "../components/valasHome/shared/CloseValasModal.js";
import SplashScreen from "../screens/home/SplashScreen.js";
import WithdrawTransactionResultScreen from "../screens/valasHome/valasTarik/WithdrawTransactionResultScreen.js";

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
        name="TarikValas"
        component={ValasTarikScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RiwayatTransaksi"
        component={HistoryScreen}
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
      <Stack.Screen
        name="Riwayat"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseDate"
        component={ChooseDateScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChooseWallet"
        component={ChooseWalletScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FirstTopUp"
        component={FirstTopUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ValasReservation"
        component={ValasReservationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailHistory"
        component={DetailHistoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CurrencyInformation"
        component={CurrencyInformationScreen}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen
        name="CloseCoolDown"
        component={CloseValasModal}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      /> 
      <Stack.Screen
        name="WithdrawTransactionResult"
        component={WithdrawTransactionResultScreen}
        options={{ headerShown: false }}
      /> 
    </Stack.Navigator>
  );
};

export default ScreenNavigator;

const styles = StyleSheet.create({});
