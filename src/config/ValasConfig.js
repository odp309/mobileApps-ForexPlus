import axios from "axios";
import axiosInstance from "../connectivity/AxiosConfigManager";
import { url } from "../connectivity/ApiManager";
import { Alert } from "react-native";

const fetchNomorRekening = async (accountNumber) => {
  try {
    const response = await axiosInstance.post("/private/bank_account/get", {
      accountNumber,
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("berhasil");
  }
};

const fetchKurs = async () => {
  try {
    const dataKurs = await axiosInstance.get("/public/exchange_rate/get-all");
    return dataKurs.data;
  } catch (error) {
    console.log(error);
  }
};

const fetchBankAccount = async (userId) => {
  try {
    const dataBank = await axiosInstance.post("/private/bank_account/get-all", {
      userId,
    });
    // console.log(dataBank.data);
    return dataBank.data;
  } catch (error) {
    console.log(error);
  }
};
const fetchValasPurchase = async (walletId, amountToBuy, pin) => {
  try {
    console.log("Wallet ID : " + walletId);
    console.log("Amount : " + amountToBuy);
    console.log("Pin : " + pin);
    const response = await axiosInstance.post("/private/buy-valas/buy", {
      walletId,
      amountToBuy,
      pin,
    });
    console.log(response.data);
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchValasSell = async (walletId, amountToSell, pin) => {
  try {
    console.log("Wallet ID : " + walletId);
    console.log("Amount : " + amountToSell);
    console.log("Pin : " + pin);
    const response = await axiosInstance.post("/private/sell-valas/sell", {
      walletId,
      amountToSell,
      pin,
    });
    console.log(response.data);
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchValasAddWallet = async (
  userId,
  accountNumber,
  currencyCode,
  amountToBuy,
  pin
) => {
  try {
    console.log("User ID : " + userId + typeof userId);
    console.log("Account Number: " + accountNumber + typeof accountNumber);
    console.log("CurrencyCode: " + currencyCode + typeof currencyCode);
    console.log("Amount to Buy: " + amountToBuy + typeof amountToBuy);
    console.log("Pin : " + pin + typeof pin);
    const response = await axiosInstance.post("/private/wallet/add", {
      userId,
      accountNumber,
      currencyCode,
      amountToBuy,
      pin,
    });
    console.log(response.data);
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const alertConfirmation = (navigation) => {
  Alert.alert(
    "Anda Ingin Membatalkan Transaksi?",
    "",
    [
      {
        text: "Tidak",
        style: "cancel",
      },
      {
        text: "Ya",
        onPress: () => navigation.goBack(),
      },
    ],
    { cancelable: false }
  );
  return true;
};
const formatNumber = (number) => {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(Math.floor(number));
};
export {
  fetchNomorRekening,
  fetchKurs,
  fetchBankAccount,
  alertConfirmation,
  formatNumber,
  fetchValasPurchase,
  fetchValasSell,
  fetchValasAddWallet
};
