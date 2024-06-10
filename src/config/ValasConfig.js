import axios from "axios";
import axiosInstance from "../connectivity/AxiosConfigManager";
import { url } from "../connectivity/ApiManager";
import { Alert } from "react-native";

const fetchNomorRekening = async (accountNumber) => { 
  try {
    const response = await axiosInstance.post("/private/bank_account/get",{accountNumber});
    console.log(response.data);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("berhasil");
  }
}; 

const fetchKurs = async () => {
  try{ 
    const dataKurs = await axiosInstance.get(url+"/public/exchange_rate/get-all") ; 
    return dataKurs.data;
  }
  catch(error) {
    console.log(error);
  }
}

const fetchBankAccount = async (userId) => {
  try{  
    const dataBank = await axiosInstance.post(url+"/private/bank_account/get-all",{userId}) ; 
    // console.log(dataBank.data);
    return dataBank.data;
  }
  catch(error) {
    console.log(error);
  }
}

const alertConfirmation = (navigation) => {
  Alert.alert(
    "Anda Ingin Membatalkan Transaksi?",
    "",
    [
      {
        text: "Tidak", 
        style: "cancel"
      },
      {
        text: "Ya",
        onPress : ()=> navigation.goBack()
      }
    ],
    { cancelable: false }
  );
  return true;
}
export {fetchNomorRekening,fetchKurs,fetchBankAccount,alertConfirmation}