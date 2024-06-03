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

const TransactionResultScreen = ({ tipeTransaksi, date }) => {
    const navigation = useNavigation();

    const toHomeScreen = () => {
        navigation.navigate("ValasHome")
    }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}></View>
      <View style={styles.middleContainer}>
        <View
          style={{ width: "100%", alignItems: "center", paddingHorizontal: 40 }}
        >
          <HeadingSixText style={{ fontWeight: "bold" }}>
            Permintaan {tipeTransaksi} Valas Berhasil
          </HeadingSixText>
          <BodySmallText style={{ color: colors.color.lightGrey }}>
            7 Mei 2024 - 11.03
          </BodySmallText>
        </View>
        <View style={{ paddingHorizontal: 70, marginTop:60}}>
          {/* Summary Result Card Component */}
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
                <BodyLargeText
                  style={{ fontWeight: "bold", marginVertical: 20 }}
                >
                  JPY 11000
                </BodyLargeText>
              </ImageBackground>
            </View>
          </View>
      </View>
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
  summaryResult: {
    width: "100%",
    backgroundColor: "transparent",
    shadowColor: "#000",
    borderRadius: 20,

    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.9, // Adjust the opacity for desired effect
    // shadowRadius: 5, // Adjust the radius for desired effect
    // elevation: 1, // Android shadow
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
