import moment from "moment-timezone";
import { Alert } from "react-native";

// const alertConfirmation = (navigation) => {
//   Alert.alert(
//     "Anda Ingin Membatalkan Transaksi?",
//     "",
//     [
//       {
//         text: "Tidak",
//         style: "cancel",
//       },
//       {
//         text: "Ya",
//         onPress: () => navigation.goBack(),
//       },
//     ],
//     { cancelable: false }
//   );
//   return true;
// };

const formatNumber = (number) => {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(Math.floor(number));
};

const formatCurrencyNumber = (num) => {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const formattedDateCurrency = (lastUpdated) => {
  const formattedDate = moment(lastUpdated)
    .tz("Asia/Jakarta")
    .format("DD/MM/YYYY HH:mm [WIB]");
  return formattedDate;
};

const convertToGMT7 = (utcTime) => {
  const utcMoment = moment.utc(utcTime, "YYYY-MM-DD HH:mm:ss");

  const gmt7Moment = utcMoment.tz("Asia/Bangkok");

  const formattedTime = gmt7Moment.format("DD MMMM YYYY HH.mm");

  return formattedTime;
};

const currentBuyValasIDR = (currLimit, kursList) => { 
  console.log("CurrLimit : ",currLimit);
  console.log("Kurs List : ",kursList); 
  const filtered = kursList.find((item)=> {
    return item.currencyCode.includes("USD");
  })
  console.log("CurrentLimit in IDR : ",filtered.buyRate * currLimit);
  return filtered.buyRate * currLimit
};

export {
  // alertConfirmation,
  formatNumber,
  formatCurrencyNumber,
  convertToGMT7,
  formattedDateCurrency,
  currentBuyValasIDR,
};
