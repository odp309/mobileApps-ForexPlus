import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ExitScreen from "../auth/screen/ExitScreen";
import { useNavigation } from "@react-navigation/native";
import RiwayatScreen from "../screens/RiwayatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { logout } from "../auth/service/AuthService";

const BottomNavigator = () => {
  const navigation = useNavigation();
  const navigationIconFormat = (focused, iconName) => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10%",
        }}
      >
        <Ionicons
          name={iconName}
          size={28}
          color={focused ? colors.primary.primaryOne : "grey"}
        />
      </View>
    );
  };
  const Tab = createBottomTabNavigator();

  const handleTabPress = () => {
    Alert.alert("Alert", "You clicked on the navigation bar item.");
  };
  const handleLogout = () => {
    Alert.alert("Keluar", "Apakah anda yakin ingin keluar aplikasi ini?", [
      { text: 'Ya', onPress :() => logout(navigation) }, 
      { text: 'Tidak' }, 
    ]);
  };
  return (
    <Tab.Navigator
      initialRouteName="Beranda"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 70 },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: "15%",
          fontFamily: "poppins-regular",
        },
        tabBarActiveTintColor: colors.primary.primaryOne,
      }}
    >
      <Tab.Screen
        name="Beranda"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            navigationIconFormat(focused, "home-outline"),
        }}
      />
      <Tab.Screen
        name="Riwayat"
        component={RiwayatScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            navigationIconFormat(focused, "time-outline"),
        }}
      />
      <Tab.Screen
        name="QRIS"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleTabPress()}
              activeOpacity={0.7}
            />
          ),
          tabBarLabelStyle: {
            fontFamily: "poppins-semibold",
            fontSize: 18,
            marginBottom: "10%",
            color: colors.primary.primaryOne,
          },
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  top: -25,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  backgroundColor: colors.primary.primaryOne,
                  borderRadius: 99,
                  borderWidth: 5,
                  borderColor: colors.primary.primaryTwo,
                }}
              >
                <Ionicons name="qr-code-outline" size={28} color="white" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            navigationIconFormat(focused, "settings-outline"),
        }}
      />
      <Tab.Screen
        name="Keluar"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => handleLogout()}
              activeOpacity={0.7}
            />
          ),
          tabBarIcon: ({ focused }) =>
            navigationIconFormat(focused, "exit-outline"),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
