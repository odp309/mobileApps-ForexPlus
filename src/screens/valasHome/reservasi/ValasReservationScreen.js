import {
  BackHandler,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import colors from "../../../theme/colors";
import { FontAwesome } from "@expo/vector-icons";
import {
  BodyLargeTextSemiBold,
  BodyMediumTextSemiBold,
  BodyRegularText,
  BodySmallText,
  BodySmallTextSemiBold,
} from "../../../components/shared/StyledText";
import StyledButton from "../../../components/shared/StyledButton";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { formatDate } from "../../../config/SharedConfig";

const ValasReservationScreen = () => {
  const route = useRoute();
  const isFocused = useIsFocused();
  const reservation = route.params?.reservation;
  const animationRef = useRef(null); //Animation Variable
  const navigation = useNavigation();

  useEffect(() => {
    console.log("Reser : ", reservation);
  });
  const toHomeScreen = () => {
    navigation.navigate("ValasHome");
  };

  useEffect(() => {
    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      return () => backHandler.remove();
    }
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}></View>
      <View style={styles.middleContainer}>
        <View
          style={{ width: "100%", alignItems: "center", marginTop: 20 }}
        ></View>
        <BodyLargeTextSemiBold style={{ textAlign: "center", fontSize: 24 }}>
          Reservasi Tarik Valas
        </BodyLargeTextSemiBold>
        <BodySmallTextSemiBold style={{ textAlign: "center", marginTop: 10 }}>
          Wajib datang sesuai tanggal reservasi. {"\n"} Lalu, tunjukkan kode
          reservasi di kantor cabang.
        </BodySmallTextSemiBold>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../../assets/reservation-logo.png")}
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
        </View>

        <BodySmallText style={{ textAlign: "center" }}>
          Kode Reservasi
        </BodySmallText>
        <BodyMediumTextSemiBold style={{ textAlign: "center" }}>
          {reservation.reservationNumber}
        </BodyMediumTextSemiBold>

        <BodySmallText style={{ textAlign: "center", marginTop: 10 }}>
          Nominal Tarik Valas
        </BodySmallText>
        <BodyMediumTextSemiBold style={{ textAlign: "center" }}>
          {reservation.currencyCode} {reservation.amount}
        </BodyMediumTextSemiBold>

        <View style={styles.locationCard}>
          <View style={styles.cardIconTitle}>
            <View style={styles.iconContainer}>
              <FontAwesome name="bank" size={30} color={colors.color.white} />
            </View>
            <View style={styles.locationTitleContainer}>
              <BodyMediumTextSemiBold style={{ fontSize: 15 }}>
                {reservation.branchType} {reservation.branchName}
              </BodyMediumTextSemiBold>
              <BodyMediumTextSemiBold>
                {formatDate(reservation.reservationDate.slice(0, 10))}
              </BodyMediumTextSemiBold>
            </View>
          </View>
          <View style={styles.addressDetailContainer}>
            <BodySmallText style={{ fontSize: 12, lineHeight: 18 }}>
              {reservation.branchAddress}, {reservation.branchProvince}
            </BodySmallText>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <StyledButton
          mode="primary"
          title="Ke Halaman Utama"
          onPress={toHomeScreen}
          size={"lg"}
          style={{ marginBottom: Platform.OS == "ios" ? "15%" : 0 }}
        />
      </View>
    </View>
  );
};
export default ValasReservationScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 1.05,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.1,
  },
  middleContainer: {
    width: "100%",
    flex: 0.75,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  locationCard: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: colors.primary.primaryThree,
  },
  cardIconTitle: {
    flexDirection: "row",
  },
  iconContainer: {
    width: 54,
    height: 54,
    marginRight: 10,
    paddingLeft: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10B1A8",
    borderRadius: 100,
    flex: 1,
  },
  locationTitleContainer: {
    paddingHorizontal: 10,
    flex: 4,
  },
  addressDetailContainer: { marginTop: 10 },
});
