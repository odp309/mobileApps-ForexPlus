import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React, { useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  BodyLargeTextSemiBold,
  BodyMediumTextSemiBold,
  BodySmallText,
  BodySmallTextSemiBold,
} from "../../../components/shared/StyledText";
import StyledButton from "../../../components/shared/StyledButton";
import colors from "../../../theme/colors";
import LottieView from "lottie-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const WithdrawTransactionResultScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const animationRef = useRef(null); //Animation Variable
  const tarikData = route.params?.tarik;

  const toHomeScreen = () => {
    navigation.navigate("ValasHome");
  };
//ss
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}></View>
      <View style={styles.middleContainer}>
        <View style={{ width: "100%", alignItems: "center", marginTop:20 }}>
          <LottieView
            ref={animationRef}
            source={require("../../../../assets/gif/Success_Animation.json")} // Replace with the JSON file for your GIF animation
            autoPlay={true}
            loop={false}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <BodyLargeTextSemiBold style={{ textAlign: "center", lineHeight:24 }}>
          Permintaan Reservasi Berhasil Terkirim
        </BodyLargeTextSemiBold>
        <BodySmallTextSemiBold style={{ textAlign: "center", marginTop:10 }}>
          Wajib datang sesuai tanggal reservasi.{"\n"}Lalu, tunjukkan kode reservasi
          di kantor cabang.
        </BodySmallTextSemiBold>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://imgur.com/zKigxFJ.png" }}
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
        </View>

        <BodySmallText style={{ textAlign: "center" }}>
          Kode Reservasi
        </BodySmallText>
        <BodyMediumTextSemiBold style={{ textAlign: "center" }}>
          {tarikData.reservationCode}
        </BodyMediumTextSemiBold>

        <BodySmallText style={{ textAlign: "center", marginTop:10}}>
          Nominal Tarik Valas
        </BodySmallText>
        <BodyMediumTextSemiBold style={{ textAlign: "center" }}>
          {tarikData.currencyCode} {tarikData.amountToWithdraw}
        </BodyMediumTextSemiBold>

        <View style={styles.locationCard}>
          <View style={styles.cardIconTitle}>
            <View style={styles.iconContainer}>
              <FontAwesome name="bank" size={30} color={colors.color.white} />
            </View>
            <View style={styles.locationTitleContainer}>
              <BodyMediumTextSemiBold>
                {tarikData.branchName}
              </BodyMediumTextSemiBold>
              <BodyMediumTextSemiBold>
                {tarikData.reservationDate}
              </BodyMediumTextSemiBold>
            </View>
          </View>
          <View style={styles.addressDetailContainer}>
            <BodySmallText style={{ fontSize: 12, lineHeight: 18 }}>
              {tarikData.branchAddress}, {tarikData.branchProvince}
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
        />
      </View>
    </View>
  );
};

export default WithdrawTransactionResultScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 1.05,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    marginTop: "10%",
    flex:0.1
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
    marginTop:10,
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
    paddingLeft:3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10B1A8",
    borderRadius: 100,
  },
  addressDetailContainer: { marginTop: 10 },
});
