import { StyleSheet, Text, View, Modal, Button, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ExitScreen from "../auth/screen/ExitScreen";
import { useNavigation } from "@react-navigation/native";
import Account from "../screens/Account";
import StyledButton from "../components/shared/StyledButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

function LogoutConfirmationModal({ navigation }) {
  const [showModal, setShowModal] = useState(true);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("jwt_token");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error clearing user token:", error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", (e) => {
      const name = e.target.split("-");

      if (name[0] === "Keluar") {
        // Prevent default behavior
        e.preventDefault();
        setShowModal(true);
      }
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Text>Apakah anda yakin ingin KELUAR?</Text>

        <StyledButton
          mode={"primary"}
          title={"Logout"}
          size={"lg"}
          onPress={handleLogout}
          style={{ marginVertical: "5%" }}
        />
        <StyledButton
          mode={"primary-outlined"}
          title={"Cancel"}
          size={"lg"}
          onPress={() => {}}
          style={{ marginVertical: "5%" }}
        />

        <Button title="Close Modal" onPress={() => setShowModal(false)} />
      </View>
    </Modal>
    // </View>
  );
}

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

const styles = StyleSheet.create({});
