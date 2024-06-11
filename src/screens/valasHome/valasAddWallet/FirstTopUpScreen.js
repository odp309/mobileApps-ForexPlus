import { BackHandler, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodyLargeText,
  BodyMediumText,
  BodySmallTextSemiBold,
} from "../../../components/shared/StyledText";
import ValasConversion from "../../../components/valasHome/shared/ValasConversion";
import { alertConfirmation } from "../../../config/ValasConfig";
import StyledButton from "../../../components/shared/StyledButton";
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import WalletValasSource from "../../../components/valasHome/shared/WalletValasSource";

import colors from "../../../theme/colors";
import ConfirmationModal from "../../../components/valasHome/shared/ConfirmationModal";

const FirstTopUpScreen = () => {
  const route = useRoute();
  const [exchange, setExchange] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const [kurs, setKurs] = useState("103");
  const [valas, setValas] = useState("JPY");
  const [isVisible, setIsVisible] = useState(false);

  const [currentBalance, setCurrentBalance] = useState("10000000");
  const [minPurchase, setMinPurchase] = useState("10");
  const [maxPurchase, setMaxPurchase] = useState("25000");

  const chosenWallet = route.params.item;

  useEffect(() => {
    setKurs(chosenWallet.buyRate);
    setValas(chosenWallet.currencyCode);
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
    const kursResult = parseInt(data) * parseInt(kurs);
    data === "" ? setExchange("") : setExchange(kursResult);
    checkError(data, kursResult);
  };

  const checkError = (data, kursResult) => {
    if (kursResult > parseInt(currentBalance)) {
      setInputError("Jumlah melebihi Saldo Aktif Rupiah");
      setInputValue("");
    } else if (parseInt(data) < parseInt(minPurchase)) {
      setInputError(`Minimum setoran valas ${valas} ${minPurchase}`);
      setInputValue("");
    } else if (parseInt(data) > parseInt(maxPurchase)) {
      setInputError(`Maksimum setoran valas ${valas} ${maxPurchase}`);
      setInputValue("");
    } else {
      setInputError("");
      setInputValue(data);
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
            Setor mulai dari {valas} 10 atau lebih agar Dompet Valas bisa
            langsung digunakan untuk transaksi
          </BodySmallTextSemiBold>
          <View style={{ marginTop: 20 }}>
            <ValasConversion
              firstInputTitle={"Nominal Setoran"}
              secondInputTitle={"Nominal Asal"}
              exchange={exchange}
              changeTextData={acceptInputCurrency}
              kurs={kurs}
              inputSaldo={inputValue}
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
              {valas} 1.00 = Rp. {kurs}
            </BodyLargeText>
          </View>
        </View>
        <View style={styles.sourceContainer}>
          <WalletSource
            rekening="18191239194"
            jenisRekening="Taplus Pegawai BNI"
            saldo={currentBalance}
          />
        </View>
        <ConfirmationModal
          title={"Konfirmasi Pembelian Valas"}
          isVisible={isVisible}
          toggleBottomSheet={toggleBottomSheet}
          pendapatan={exchange}
          kurs={kurs}
          inputSaldo={inputValue}
        />
      </View>
      <View style={styles.bottomContainer}>
        {inputValue === "" ? (
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
