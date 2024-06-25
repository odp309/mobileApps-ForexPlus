import axios from "axios";
import axiosInstance from "../connectivity/AxiosConfigManager";
import { url } from "../connectivity/ApiManager";

const fetchNomorRekening = async (accountNumber) => {
  try {
    const response = await axiosInstance.post("/v2/private/bank_account/get", {
      accountNumber,
    });
    console.log(response.data);
  } catch (err) {
    console.log("gagal fetch noRek : ", err);
  } finally {
    console.log("berhasil");
  }
};

const fetchKurs = async () => {
  try {
    const dataKurs = await axiosInstance.get(
      "/v1/public/exchange_rate/get-all"
    );
    return dataKurs.data;
  } catch (error) {
    console.log("gagal fetch kurs : ", error);
  }
};

const fetchBankAccount = async (userId) => {
  try {
    const dataBank = await axiosInstance.post(
      "/v2/private/bank_account/get-all",
      {
        userId,
      }
    );
    return dataBank.data;
  } catch (error) {
    console.log("gagal fetch Bank Account : ", error);
  }
};
const fetchValasPurchase = async (walletId, amountToBuy, pin) => {
  try {
    const response = await axiosInstance.post("/v2/private/buy-valas/buy", {
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
    console.log("gagal fetch Valas beli : ", err);
    return false;
  }
};

const fetchValasSell = async (walletId, amountToSell, pin) => {
  try {
    const response = await axiosInstance.post("/v2/private/sell-valas/sell", {
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
    console.log("gagal fetch valas jual : ", err);
  }
};

const fetchValasTransfer = async (
  senderWalletId,
  recipientAccountNumber,
  amountToTransfer,
  pin
) => {
  console.log(senderWalletId, recipientAccountNumber, amountToTransfer, pin);
  try {
    const response = await axiosInstance.post(
      "/v2/private/transfer-valas/transfer",
      {
        senderWalletId,
        recipientAccountNumber,
        amountToTransfer,
        pin,
      }
    );
    console.log(response.data);
    if (response) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("gagal fetch valas transfer : ", err);
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
    const response = await axiosInstance.post("/v2/private/wallet/add", {
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
    console.log("gagal fetch add wallet : ", err);
  }
};

const fetchRelatedBranch = async (
  latitude,
  longitude,
  amountToWithdraw,
  currencyCode
) => {
  console.log(latitude, longitude, amountToWithdraw, currencyCode);
  try {
    const allBranches = await axiosInstance.post("/v1/private/branch/get", {
      latitude,
      longitude,
      amountToWithdraw,
      currencyCode,
    });
    return allBranches.data;
  } catch (error) {
    console.log("gagal fetch related branch : ", error);
  }
};

const fetchMinimumDeposit = async (currencyCode) => {
  console.log(currencyCode);
  try {
    const dataMinimumDeposit = await axiosInstance.post(
      "/v1/private/currency/minimum-deposit/get",
      { currencyCode }
    );
    return dataMinimumDeposit.data.minimum;
  } catch (error) {
    console.log("gagal fetch minim deposit : ", error);
  }
};

const fetchMinimumBuy = async (currencyCode) => {
  try {
    const dataMinimumBuy = await axiosInstance.post(
      "/v1/private/currency/minimum-buy/get",
      { currencyCode }
    );
    return dataMinimumBuy.data.minimum;
  } catch (error) {
    console.log("gagal fetch minim beli : ", error);
  }
};

const fetchMinimumSell = async (currencyCode) => {
  // console.log(currencyCode);
  try {
    const dataMinimumSell = await axiosInstance.post(
      "/v1/private/currency/minimum-sell/get",
      { currencyCode }
    );
    return dataMinimumSell.data.minimum;
  } catch (error) {
    console.log("gagal fetch minim jual : ", error);
  }
};

const fetchMinimumTransfer = async (currencyCode) => {
  try {
    const dataMinimumTransfer = await axiosInstance.post(
      "/v1/private/currency/minimum-transfer/get",
      { currencyCode }
    );
    return dataMinimumTransfer.data.minimum;
  } catch (error) {
    console.log("gagal fetch minim transfer : ", error);
  }
};

const fetchMinimumWithdrawal = async (currencyCode) => {
  try {
    const dataMinimumTransfer = await axiosInstance.post(
      "/v1/private/currency/minimum-withdrawal/get",
      { currencyCode }
    );
    return dataMinimumTransfer.data.minimum;
  } catch (error) {
    console.log("gagal fetch minim transfer : ", error);
  }
};

const findBankAccountInfo = async (
  senderAccountNumber,
  recipientAccountNumber,
  currencyCode
) => {
  try {
    const accountFind = await axiosInstance.post(
      "/v1/private/bank_account/get-with-wallet",
      { senderAccountNumber, recipientAccountNumber, currencyCode }
    );
    return accountFind.data;
  } catch (error) {
    console.log(error.response.data.detail);
    return null;
  }
};

const fetchValasWithdraw = async (
  walletId,
  amountToWithdraw,
  reservationDate,
  branchCode,
  pin
) => {
  console.log(walletId, amountToWithdraw, reservationDate, branchCode, pin);
  try {
    const dataWithdraw = await axiosInstance.post(
      "/v1/private/withdraw-valas/withdraw",
      { walletId, amountToWithdraw, reservationDate, branchCode, pin }
    );
    return dataWithdraw.data;
  } catch (error) {
    console.log(error.response.data.detail);
    return null;
  }
};

const fetchHistory = async (walletId) => {
  try {
    console.log("Wallet ID : " + walletId);
    const response = await axiosInstance.post("/v2/private/history/get-all", {
      walletId,
    });
    console.log("History Data:");
    console.log(response.data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchHistoryDetail = async (trxId) => {
  try {
    console.log("trx ID : " + trxId);
    const response = await axiosInstance.post(
      "/v1/private/history/get-detail",
      {
        trxId,
      }
    );
    console.log("trx Data:");
    console.log(response.data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchReservationList = async () => {
  try {
    const response = await axiosInstance.get(
      "/v2/private/reservation-list/user-get"
    );
    if (response) {
      console.log("Reservation : ", response.data);
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const fetchIsCooldown = async () => {
  try {
    const response = await axiosInstance.post(
      "/v2/private/withdraw-valas/checker"
    );
    console.log("Checker : ", response.data);
    return response.data;
  } catch (error) {
    return error.response.data.access_denied_reason;
  }
};
const fetchCurrentBuyLimit = async (id) => {
  try {
    const response = await axiosInstance.post(
      "/v2/private/buy-valas/limit-check",
      { id }
    );
    if (response) {
      console.log("Limit buy : ", response.data);
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export {
  fetchNomorRekening,
  fetchKurs,
  fetchBankAccount,
  fetchValasPurchase,
  fetchValasSell,
  fetchValasTransfer,
  fetchMinimumBuy,
  fetchMinimumSell,
  fetchMinimumTransfer,
  findBankAccountInfo,
  fetchRelatedBranch,
  fetchValasWithdraw,
  fetchValasAddWallet,
  fetchHistory,
  fetchHistoryDetail,
  fetchMinimumDeposit,
  fetchReservationList,
  fetchCurrentBuyLimit,
  fetchMinimumWithdrawal,
  fetchIsCooldown,
};
