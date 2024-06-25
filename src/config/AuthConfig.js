import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../connectivity/AxiosConfigManager.js";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode"; 


let userData =null;
let tokenCheckTimeout = 0;

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
  password,
  navigation
) => {
  const expiredTime = 60 * 15 * 1000; 
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

    tokenCheckTimeout = setTimeout(() => {
      const checkToken = checkTokenAvailibility();
      if (checkToken !== null) {
        Alert.alert("Token expired", "Your session has expired.", [
          { onPress: () => logout(navigation) },
        ]);
      }
    }, expiredTime);
    return response; 
    
  } catch (error) {
    // console.log(error.response.status);
    console.log("Error login : " ,error);
    throw error;
  }
};

const checkTokenAvailibility = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (accessToken) { 
    console.log("AKSES TOKEEN",accessToken);
    return accessToken;
  }
  else{
    console.log("AKSES TOKEEN",accessToken);
    return null;
  }
}
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
  clearTimeout(tokenCheckTimeout);
  navigation.navigate("Login");
};

const handleLogout = (navigation) => { 
  Alert.alert("Keluar", "Apakah anda yakin ingin keluar aplikasi ini?", [
    { text: 'Ya', onPress :() => logout(navigation) }, 
    { text: 'Tidak' }, 
  ]);
};


export { login, logout, cleanupToken, handleLogout,JwtDecoder,userData,tokenCheckTimeout,checkTokenAvailibility };
