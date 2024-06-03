import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "./ApiManager";
 
const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken"); ;
    // console.log("Token AxiosConfig : "+token);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log( "Bearer : " + config.headers.Authorization);
    } else { 
      await AsyncStorage.removeItem("accessToken"); 
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
