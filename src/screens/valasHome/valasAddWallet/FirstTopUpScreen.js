import { BackHandler, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodyLargeText,
  BodyMediumText,
  BodySmallTextSemiBold,
} from "../../../components/shared/StyledText";
import ValasConversion from "../../../components/valasHome/shared/ValasConversion";
import { alertConfirmation, formatNumber } from "../../../config/ValasConfig";
import StyledButton from "../../../components/shared/StyledButton";
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import WalletValasSource from "../../../components/valasHome/shared/WalletValasSource";

import colors from "../../../theme/colors";
import ConfirmationModal from "../../../components/valasHome/shared/ConfirmationModal";

const FirstTopUpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [inputError, setInputError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [minPurchase, setMinPurchase] = useState("10");
  const [maxPurchase, setMaxPurchase] = useState("25000");

  const transactionType = "add wallet";
  const [transactionData, setTransactionData] = useState({
    selectedWallet: "",
    selectedRekening: route.params?.selectedRekening,
    selectedCurrency: route.params?.item,
    inputValue: "",
    convertedValue: "",
  });

  useEffect(() => {
    console.log("First Top Up");
    console.log(transactionData);
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      alertConfirmation(navigation)
    );
    return () => backHandler.remove();
  }, []);

  const toggleBottomSheet = () => {
    console.log(isVisible);
    setIsVisible(!isVisible);
  };

  const kursCalculation = (data) => {
    const kursResult =
      parseInt(data) * parseInt(transactionData.selectedCurrency.buyRate);
    setTransactionData((prevState) => ({
      ...prevState,
      convertedValue:
        data === ""
          ? ""
          : (
              parseInt(data) *
              parseInt(transactionData.selectedCurrency.buyRate)
            ).toString(),
    }));
    checkError(data, kursResult);
  };

  const checkError = (data, kursResult) => {
    setTransactionData((prevState) => ({
      ...prevState,
      inputValue: data,
    }));
    if (kursResult > parseInt(transactionData.selectedRekening.balance)) {
      setInputError("Jumlah melebihi Saldo Aktif Rupiah");
    } else if (parseInt(data) < parseInt(minPurchase)) {
      setInputError(
        `Minimum setoran valas ${transactionData.selectedCurrency.currencyCode} ${minPurchase}`
      );
    } else if (parseInt(data) > parseInt(maxPurchase)) {
      setInputError(
        `Maksimum setoran valas ${transactionData.selectedCurrency.currencyCode} ${maxPurchase}`
      );
    } else {
      setInputError("");
      setTransactionData((prevState) => ({
        ...prevState,
        inputValue: data,
      }));
    }
  };

  const acceptInputCurrency = (data) => {
    console.log(data);
    kursCalculation(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title="Setoran Awal" />
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.mainContent}>
          <BodySmallTextSemiBold style={{ textAlign: "center" }}>
            Setor mulai dari {transactionData.selectedCurrency.currencyCode} 10
            atau lebih agar Dompet Valas bisa langsung digunakan untuk transaksi
          </BodySmallTextSemiBold>
          <View style={{ marginTop: 20 }}>
            <ValasConversion
              firstInputTitle={"Nominal Setoran"}
              secondInputTitle={"Nominal Asal"}
              changeTextData={acceptInputCurrency}
              transactionData={transactionData}
              firstError={inputError}
              secondError={inputError}
            />
          </View>
          <View style={styles.kursBeliContainer}>
            <BodyMediumText
              style={{ color: colors.color.grey, fontWeight: "bold" }}
            >
              Kurs Beli
            </BodyMediumText>
            <BodyLargeText style={styles.textStyle}>
              {transactionData.selectedCurrency.currencyCode} 1.00 = Rp.{" "}
              {formatNumber(transactionData.selectedCurrency.buyRate)}
            </BodyLargeText>
          </View>
        </View>
        <View style={styles.sourceContainer}>
          <WalletSource selectedRekening={transactionData.selectedRekening} />
        </View>
        <ConfirmationModal
          title={"Konfirmasi Setoran Awal"}
          isVisible={isVisible}
          toggleBottomSheet={toggleBottomSheet}
          transactionData={transactionData}
          transactionType={transactionType}
        />
      </View>
      <View style={styles.bottomContainer}>
        {transactionData.inputValue === "" ||
        parseInt(transactionData.inputValue) < minPurchase ||
        parseInt(transactionData.convertedValue) >
          transactionData.selectedRekening.balance ?  (
          <StyledButton
            mode="primary-disabled"
            title="Lanjut"
            size={"lg"}
            style={{ marginBottom: 20 }}
          />
        ) : (
          <StyledButton
            mode="primary"
            title="Lanjut"
            size={"lg"}
            onPress={toggleBottomSheet}
            style={{ marginBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
};

export default FirstTopUpScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.1,
    marginTop: "10%",
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
  mainContent: {
    paddingHorizontal: 20,
  },
  kursBeliContainer: {
    paddingVertical: "8%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textStyle: {
    color: colors.primary.primaryOne,
    fontWeight: "bold",
  },
  sourceContainer: {
    borderTopWidth: 5,
    borderColor: colors.primary.primaryThree,
  },
});
