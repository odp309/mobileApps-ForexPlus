import { StyleSheet, View, BackHandler } from "react-native";
import StyledButton from "../../components/shared/StyledButton";
import {
  BodyLargeText,
  BodyMediumText,
  BodySmallText,
  HeadingSixText,
} from "../../components/shared/StyledText";
import colors from "../../theme/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import ResultCard from "../../components/valasHome/ResultCard";
import ResultTitleAndDate from "../../components/valasHome/shared/ResultTitleAndDate";
import { country } from "../../config/CountryDataConfig";

// FORMAT transactionData:
// const transactionData = {
//   // Must
//   isSetoranAwal: false, //boolean
//   isTransfer: false, //boolean
//   isSellOrPurchase: true, //boolean
//   date: "29 Juni 2024",
//   noRek: "1811209312",
//   saldo: "1000", // Saldo transaksi
//   tipeValas: "jpy", //jpy,aud,usd, dan lain lainnya

//   // Depends on the Type of Transaction
//   transactionType: "Penjualan",  //Pembelian || Penjualan
//   namaPenerima: 'Adelia Kinanti',
// };

const MONTHS_NAME = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];



const TransactionResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const animationRef = useRef(null); //Animation Variable
  const transactionData = route.params?.transactionData;
  const transactionType = route.params?.transactionType;

  const toHomeScreen = () => {
    navigation.navigate("ValasHome");
  };

  // const getDate = () => {
    const FINISH_TRANSACTION_TIME = new Date();
    const month = FINISH_TRANSACTION_TIME.getMonth();
    const monthName = MONTHS_NAME[month];
    const day = FINISH_TRANSACTION_TIME.getDate();
    const year = FINISH_TRANSACTION_TIME.getFullYear();
    const hour = FINISH_TRANSACTION_TIME.getHours();
    const minute = FINISH_TRANSACTION_TIME.getMinutes();
  
    const transactionDate = `${day} ${monthName} ${year} - ${hour}:${minute}`;
    // console.log("message:");
    // console.log(message);
    
    // return message;
  // };

  // Animation Function
  useEffect(() => {
    console.log(transactionData);
    console.log(transactionType);
    if (animationRef.current) {
      animationRef.current.play();
    }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}></View>

      <View style={styles.middleContainer}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <LottieView
            ref={animationRef}
            source={require("../../../assets/gif/Success_Animation.json")} // Replace with the JSON file for your GIF animation
            autoPlay={false}
            loop={false}
            style={{ width: 100, height: 100 }}
          />
        </View>
        {/* Title & Date */}
        <View
          style={{ width: "100%", alignItems: "center", paddingHorizontal: 40 }}
        >
          {transactionType === "beli" ? (
            <ResultTitleAndDate
              title="Permintaan Pembelian Berhasil Terkirim"
              date={transactionDate}
            />
          ) : transactionType === "jual" ? (
            <ResultTitleAndDate
              title="Permintaan Penjualan Berhasil Terkirim"
              date={transactionDate} //Fix Bagian ini harusnya make date baru bukan createdAt si currency nya.
            />
          ) : transactionType === "transfer" ? (
            <ResultTitleAndDate
              title="Permintaan Transfer Berhasil Terkirim"
              date={transactionDate}
            />
          ) : transactionType === "tarik" ? (
            <ResultTitleAndDate
              title="Reservasi Tarik Valas"
              subTitle={
                "Wajib datang sesuai tanggal reservasi.\nLalu, tunjukkan kode reservasi di kantor cabang."
              }
              date={transactionDate}
            />
          ) : transactionType === "add wallet" ? (
            <ResultTitleAndDate
              title="Setoran Awal Berhasil"
              subTitle={
                "Dompet Valas " +
                transactionData.selectedCurrency.currencyName +
                " telah ditambahkan"
              }
              date={transactionDate}
            />
          ) : null}
        </View>
        {/* Summary Result Card Component */}
        <View style={{ width: "100%", alignItems: "center" }}>
          <View
            style={{ width: "100%", alignItems: "center", marginTop: "15%" }}
          >
            <ResultCard
              transactionType={transactionType}
              transactionData={transactionData}
            />
          </View>
        </View>
      </View>

      {/* To Homepage Button */}
      <View style={styles.bottomContainer}>
        <StyledButton
          mode="primary"
          title="Ke Halaman Utama"
          onPress={toHomeScreen}
          size={"lg"}
        />
      </View>
    </View>
  );
};

export default TransactionResultScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-start",
    backgroundColor: colors.color.white,
  },
  topContainer: {
    width: "100%",
    flex: 0.1,
    marginTop: "12%",
    paddingHorizontal: 20,
  },
  middleContainer: {
    width: "100%",
    flex: 0.75,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
    paddingHorizontal: 20,
    paddingHorizontal: 20,
  },
});
