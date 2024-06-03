import axios from "axios";
import axiosInstance from "../connectivity/AxiosConfigManager";

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

export {fetchNomorRekening}