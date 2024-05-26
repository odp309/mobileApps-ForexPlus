import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./AxiosConfig.js";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const login = async (
  email,
  password,
  setModalVisible,
  modalVisible,
  navigation
) => {
  try {
    const response = await axiosInstance.post("/login", {
      email,
      password,
    });
    const { token } = response.data;
    const expiredTime = 10 * 1000;
    const tokenExpiry = Date.now() + expiredTime; //1 menit
    console.log("Token:", token);
    console.log("Token Expiry:", tokenExpiry);
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("tokenExpiry", tokenExpiry.toString());

    setModalVisible(!modalVisible);
    navigation.navigate("HomeScreen");

    // setTimeout(() => {
    //   cleanupToken();
    //   Alert.alert("Token expired", "Your session has expired.", [
    //     { onPress: () => navigation.navigate("Login") },
    //   ]);
    // }, expiredTime);
  } catch (error) {
    //console.error("Login failed:", error);
    Alert.alert("Login failed", "Invalid email or password");
  }
};
const cleanupToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const tokenExpiry = await AsyncStorage.getItem("tokenExpiry");
    if (token && tokenExpiry) {
      console.log("Token sebelum dihapus :", token);
      console.log("Token Expiry sebelum dihapus:", tokenExpiry);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("tokenExpiry");
      console.log("Token Removed"); 
    }
  } catch (error) {
    console.error("Error cleaning uptoken", error);
  }
};
const logout = async (navigation) => {
  await cleanupToken();
  navigation.navigate("Login");
};

export { login, logout, cleanupToken };
