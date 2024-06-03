import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react"; 
import {
  BodyLargeTextSemiBold,
  BodyXLTextBold,
  BodyXLTextSemiBold,
} from "../../components/shared/StyledText";
import colors from "../../theme/colors";
import ContentHeader from "../../components/valasHome/shared/ContentHeader";

const PinConfirmationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nominal, setNominal] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title={"Verifikasi PIN"} />
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.contentContainer}>
          <BodyLargeTextSemiBold
            style={{ color: colors.secondary.secondaryTwo }}
          >
            Masukkan PIN BNI Mobile Banking
          </BodyLargeTextSemiBold>
          <View
            style={{
              flexDirection: "row",
              width: "75%",
              justifyContent: "space-around",
              marginTop:"5%",
              marginBottom:"8%",
            }}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../../assets/icon-pin-input.png")}
            />
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../../assets/icon-pin-input.png")}
            />
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../../assets/icon-pin-input.png")}
            />
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../../assets/icon-pin-input.png")}
            />
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../../assets/icon-pin-input.png")}
            />
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../../../assets/icon-pin-input.png")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PinConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height * 1,
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
    flex: 0.9,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    width: "100%",
    borderRadius: 20,
    minHeight: 100,
    borderColor: colors.primary.primaryOne
  },
  walletContainer: {
    marginTop: 20,
  },
});
