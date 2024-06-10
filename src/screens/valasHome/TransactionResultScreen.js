import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import StyledButton from "../../components/shared/StyledButton";
import {
  BodyLargeText,
  BodyMediumText,
  BodySmallText,
  HeadingSixText,
} from "../../components/shared/StyledText";
import colors from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import ResultCard from "../../components/valasHome/ResultCard";
import WalletRekeningSource from "../../components/valasHome/shared/WalletRekeningSource";

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


const TransactionResultScreen = ({route}) => {
  const navigation = useNavigation();
  const animationRef = useRef(null); //Animation Variable
  const transactionData = route.params;

  const toHomeScreen = () => {
    navigation.navigate("ValasHome");
  };

  // Animation Function
  useEffect(() => {
    if (animationRef.current) {
      // Play the animation once
      animationRef.current.play();
    }
    console.log("KOKO");
    console.log(transactionData);
  }, []);

  const TitleAndDate = () => {
    if(transactionData.isSetoranAwal){
      return(<View>
        <HeadingSixText style={{ fontWeight: "bold", textAlign: "center" }}>
            Setoran Awal Berhasil!
          </HeadingSixText>
        <BodyMediumText style={{ fontWeight: "bold", textAlign: "center" }}>
            Dompet Valas {} telah ditambahkan
          </BodyMediumText>
          <BodySmallText style={{ color: colors.color.lightGrey }}>
            7 Mei 2024 - 11.03
          </BodySmallText>
      </View>)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}></View>

      <View style={styles.middleContainer}>
        {/* Success Icon Animation */}
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
          <HeadingSixText style={{ fontWeight: "bold", textAlign: "center" }}>
            Permintaan Penjualan Valas Berhasil
          </HeadingSixText>
          <BodySmallText style={{ color: colors.color.lightGrey }}>
            7 Mei 2024 - 11.03
          </BodySmallText>
        </View>
        {/* Summary Result Card Component */}
        <View style={{width:'100%',alignItems:'center',marginTop:'15%'}}>
        <ResultCard />
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
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
    backgroundColor: colors.color.white,
  },
  topContainer: {
    width: "100%",
    flex: 0.1,
    marginTop: "15%",
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
  },
});
