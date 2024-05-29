import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../connectivity/AxiosConfig.js";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";

let userData = null;

const JwtDecoder = (accessToken) => {
  let decodedHeader;
  let decodedPayload;

  try {
    decodedHeader = jwtDecode(accessToken, { header: true });
    decodedPayload = jwtDecode(accessToken);
  } catch (e) {
    console.error("Invalid JWT", e);
  }
  return decodedPayload;
};

const login = async (
  email,
  password,
  setModalVisible,
  modalVisible,
  navigation
) => {
  try {
    const response = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    const { accessToken } = response.data;
    console.log(response.data);
    const expiredTime = 60 * 15* 1000;
    await AsyncStorage.setItem("accessToken", accessToken);

    userData = JwtDecoder(accessToken);
    console.log(userData);

    if (userData) {
      setModalVisible(!modalVisible);
      navigation.navigate("HomePage");
    }

    setTimeout(() => {
      cleanupToken(); 
      Alert.alert("Token expired", "Your session has expired.", [
        { onPress: () => navigation.navigate("Login") },
      ]);
    }, expiredTime);
  } catch (error) {
    Alert.alert("Login failed", "" + error);
  }
};
const cleanupToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      console.log("Token sebelum dihapus :", accessToken);
      await AsyncStorage.removeItem("accessToken");
      console.log("Token Removed:  "+accessToken); 
    } 
  } catch (error) {
    console.error("Error cleaning uptoken", error);
  }
};
const logout = async (navigation) => {
  await cleanupToken(); 
  navigation.navigate("Login");
};

export { login, logout, cleanupToken, userData };
