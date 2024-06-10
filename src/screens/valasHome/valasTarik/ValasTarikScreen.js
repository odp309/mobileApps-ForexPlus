import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import {
  BodyXLTextBold,
  BodySmallText,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import { useNavigation } from "@react-navigation/native";
import InputCurrency from "../../../components/valasHome/shared/InputCurrency";
import WalletValasSource from "../../../components/valasHome/shared/WalletValasSource";
import StyledButton from "../../../components/shared/StyledButton";

const DIMENSION_HEIGHT = Dimensions.get("screen").height;

const ValasTarikScreen = () => {
  const navigation = useNavigation();
  const onContinue = () => {
    // setShowModal(true);
    navigation.navigate("ChooseBranch", { inputNominal });
  };
  const [inputNominal, setInputNominal] = useState("");
  const saldo = 15000;

  const [errorText, setErrorText] = useState("");
  function onChangeText(e) {
    setErrorText("");
    setInputNominal(e);
    if (e === "") {
      return;
    }
    if (parseInt(e) > saldo) {
      setErrorText("Saldo Anda tidak mencukupi");
      return;
    }
    if (parseInt(e) % 100 !== 0) {
      setErrorText("Nominal penarikan harus dalam kelipatan 100");
      return;
    }
    if (parseInt(e) >= 33600) {
      setErrorText("Maksimum penarikan setiap bulan adalah SGD 33600");
      return;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title={"Tarik Valas"} />
      </View>

      <View style={styles.middleContainer}>
        <View style={{ marginLeft: "0%", marginVertical: "2%" }}>
          <BodyXLTextBold style={{ color: colors.primary.primaryOne }}>
            Masukkan Jumlah Penarikan
          </BodyXLTextBold>
          <BodySmallText style={{ fontSize: 16, marginTop: 5 }}>
            Silahkan masukkan jumlah uang yang ingin{"\n"}Anda tarik dengan
            minimum penarikan SGD 100.
          </BodySmallText>
          <InputCurrency
            countryCode="sgd"
            onChangeText={(e) => onChangeText(e)}
          />
          {errorText !== "" && (
            <View style={styles.errorContainer}>
              <View style={styles.errorIconContainer}>
                <Text style={styles.errorIcon}>!</Text>
              </View>
              <Text style={styles.errorText}>{errorText}</Text>
            </View>
          )}
          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <View style={styles.boxRekeningSumber}>
              <WalletValasSource
                style={{ backgroundColor: "white" }}
                countryCode={"usd"}
                saldo={`SGD ${saldo}`}
              />
            </View>
          </View>

          <View style={styles.bottomContainer}>
            {inputNominal === "" || inputNominal % 100 != 0 ? (
              <StyledButton
                mode="primary-disabled"
                title="Lanjut"
                size={"lg"}
                style={{ marginBottom: "25%", marginHorizontal: "0%" }}
              />
            ) : (
              <StyledButton
                mode="primary"
                title="Lanjut"
                size={"lg"}
                onPress={onContinue}
                style={{ marginBottom: "25%", marginHorizontal: "0%" }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ValasTarikScreen;

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
    paddingHorizontal: 20,
  },
  bottomContainer: {
    width: "100%",
    height: "69%",
    justifyContent: "center",
  },
  errorContainer: {
    backgroundColor: "#FDE7DF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "#FF1200",
    marginLeft: 10,
  },
  errorIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#EF5C26",
    justifyContent: "center",
    alignItems: "center",
  },
  errorIcon: {
    color: "white",
  },
  lineContainer: {
    width: "100%",
    paddingHorizontal: "0%",
    marginTop: "8%",
    right: "10%",
  },
  line: {
    height: 4,
    width: "120%",
    backgroundColor: "#FDE7DF",
    borderColor: "#FDE7DF",
    borderWidth: 2,
  },
  boxRekeningSumber: {
    backgroundColor: "#EF5C26",
    marginLeft: "5%",
    marginRight: "-14%",
  },
});
