import axios from "axios";
import axiosInstance from "../connectivity/AxiosConfigManager";

const fetchSaldo = async () => {
  try {
    const response = await axiosInstance.get("/bank_account/saldo");
    console.log(response.data);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("berhasil");
  }
};

export {fetchSaldo}