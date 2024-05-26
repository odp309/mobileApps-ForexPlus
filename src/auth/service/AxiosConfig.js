import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://156.67.214.127:8080/api/v1/public/user",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const tokenExpiry = parseInt(await AsyncStorage.getItem("tokenExpiry"), 10);
    // console.log("Token AxiosConfig : "+token);
    if (token && Date.now() < tokenExpiry) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log( "Bearer : " + config.headers.Authorization);
    } else {
      // console.log("Ini token exp : "+tokenExpiry);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("tokenExpiry");
    }
  } catch (error) {
    console.error('AsyncStorage error:', error);
  }
  return config;
},
(error) => {
  return Promise.reject(error);
}
);

export default axiosInstance;
