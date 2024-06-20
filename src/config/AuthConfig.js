import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../connectivity/AxiosConfigManager.js";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode"; 


let userData =null;

const JwtDecoder = async (accessToken) => {
  let decodedHeader;
  let decodedPayload;
  
  try {
    decodedHeader = await jwtDecode(accessToken, { header: true });
    decodedPayload = await jwtDecode(accessToken);
  } catch (e) {
    console.error("Invalid JWT", e);
  }
  return decodedPayload;
};

const login = async (
  email,
  password
) => {
  try {
    email = email.toLowerCase();
    const response = await axiosInstance.post("/v1/public/user/login", {
      email,
      password,
    }); 
    const { accessToken } = response.data;
    await AsyncStorage.setItem("accessToken", accessToken);
    userData = await JwtDecoder(accessToken);
    console.log("userdata : " ,userData);
    return response; 
    
  } catch (error) {
    // console.log(error.response.status);
    console.log("Error login : " ,error);
    throw error;
  }
};
const cleanupToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      console.log("Token sebelum dihapus :", accessToken);
      await AsyncStorage.removeItem("accessToken");
      console.log("Token Removed:  " + accessToken);
      userData = null;
    }
  } catch (error) {
    console.error("Error cleaning uptoken", error);
  }
};
const logout = async (navigation) => {
  await cleanupToken();
  navigation.navigate("Login");
};

const handleLogout = (navigation) => {
  Alert.alert("Keluar", "Apakah anda yakin ingin keluar aplikasi ini?", [
    { text: 'Ya', onPress :() => logout(navigation) }, 
    { text: 'Tidak' }, 
  ]);
};

export { login, logout, cleanupToken, handleLogout,JwtDecoder,userData };
