import { StyleSheet, View, } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Account from "../screens/Account";
import LogoutConfirmationModal from "../auth/screen/LogoutConfirmationModal";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Beranda"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Beranda" component={HomeScreen} />
        <Tab.Screen name="Akun" component={Account} />
        {/* <Tab.Screen name="Keluar" component={ExitScreen} /> */}
        <Tab.Screen name="Keluar" component={LogoutConfirmationModal} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});
