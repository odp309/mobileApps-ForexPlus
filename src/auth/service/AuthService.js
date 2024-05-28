import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "./AxiosConfig.js";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
 

let userData = null;

const base64Decode = (str) => {
  try {
    return decodeURIComponent(
      atob(str).replace(/(.)/g, (m, p) => {
        const code = p.charCodeAt(0).toString(16).toUpperCase();
        return "%" + (code.length < 2 ? "0" : "") + code;
      })
    );
  } catch (error) {
    console.error("Base64 decode error:", error);
    return null;
  }
};

const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = base64Decode(base64);
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
};

const getUserIdFromToken = (token) => {
  const decodedToken = decodeJWT(token);  
  return decodedToken;
}; 

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

    userData = getUserIdFromToken(token);
    console.log(userData); 

    setModalVisible(!modalVisible);
    navigation.navigate("HomeScreen");
    
    setTimeout(() => {
      cleanupToken();
      Alert.alert("Token expired", "Your session has expired.", [
        { onPress: () => navigation.navigate("Login") },
      ]);
    }, expiredTime);
  } catch (error) { 
    Alert.alert("Login failed", "Invalid email or password ");
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
      await AsyncStorage.removeItem("firstName");
      await AsyncStorage.removeItem("lastName");
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

export { login, logout, cleanupToken,userData };
