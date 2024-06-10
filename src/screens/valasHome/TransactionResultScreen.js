import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  ImageBackground,
  BackHandler,
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

const TransactionResultScreen = ({
  tipeTransaksi,
  date,
  tipeValas,
  noRek,
  transactionResult,
}) => {
  const navigation = useNavigation();
  const animationRef = useRef(null); //Animation Variable

  const toHomeScreen = () => {
    navigation.navigate("ValasHome");
  };

  // Animation Function
  useEffect(() => {
    if (animationRef.current) { 
      animationRef.current.play();
    }
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
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
  },
});
