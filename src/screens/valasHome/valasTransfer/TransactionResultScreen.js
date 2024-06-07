import { BackHandler, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodyLargeTextSemiBold,
  BodyMediumText,
  BodyRegularText,
  BodySmallText,
  BodyXLTextBold,
  BodyXLTextSemiBold,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import StyledButton from "../../../components/shared/StyledButton";
import { Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import InputCurrency from "../../../components/valasHome/shared/InputCurrency";

const TransactionResultScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nominal, setNominal] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => backHandler.remove();
  },[]);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader
          ignoreBackButton={true}
          title={"Permintaan Transfer Berhasil Terkirim"}
        />
      </View>
      <BodyRegularText
        style={{ color: colors.color.lightGrey, alignSelf: "center" }}
      >
        3 Juni 2024 - 20:28
      </BodyRegularText>
      <View style={styles.middleContainer}>
        <View style={styles.cardContainer}>
          <BodySmallText style={{ marginTop: 10 }}>Nama Penerima</BodySmallText>
          <BodyLargeTextSemiBold style={{ marginTop: 10 }}>
            Arfiandi Wijatmiko
          </BodyLargeTextSemiBold>
          <BodyMediumText style={{ marginTop: 10, color: "grey" }}>
            123456789
          </BodyMediumText>
          <BodySmallText style={{ marginTop: 20 }}>
            Nominal yang Ditransfer
          </BodySmallText>
          <BodyLargeTextSemiBold style={{ marginTop: 10 }}>
            sgd 50
          </BodyLargeTextSemiBold>
          <BodyXLTextSemiBold style={{}}> </BodyXLTextSemiBold>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <StyledButton
          title={"Ke Halaman Utama"}
          size={"lg"}
          mode={"primary"}
          onPress={() => {
            navigation.navigate("ValasHome");
          }}
        />
      </View>
    </View>
  );
};

export default TransactionResultScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 1,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.4,
    justifyContent: "flex-end",
  },
  middleContainer: {
    width: "100%",
    flex: 0.45,
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginTop: 30,
    width: "70%",
    alignItems: "center",
    borderRadius: 5,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 8,
    backgroundColor: "white",
  },
});
