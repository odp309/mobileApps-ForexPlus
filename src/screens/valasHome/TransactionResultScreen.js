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
      // Play the animation once
      animationRef.current.play();
    }
  }, []);

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
        <View style={{ paddingHorizontal: 70, marginTop: 60 }}>
          <View style={styles.summaryResult}>
            <ImageBackground
              source={require("../../../assets/SummaryBackground.png")}
              resizeMode="cover"
              imageStyle={{ borderRadius: 20 }}
              style={styles.imageContainer}
            >
              <Image
                source={require("../../../assets/icons/flags/Japan.png")}
                style={{ width: 40, height: 40, marginBottom: 10 }}
              />
              <BodyLargeText style={{ fontWeight: "bold" }}>
                Yen Japan
              </BodyLargeText>
              <BodyLargeText>JPY</BodyLargeText>
              <BodyMediumText>18901517618</BodyMediumText>
              <BodyLargeText style={{ fontWeight: "bold", marginVertical: 20 }}>
                JPY 11000
              </BodyLargeText>
            </ImageBackground>
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
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.10,
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
  summaryResult: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
});
