import { Dimensions, StyleSheet, View, Alert, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import {
  BodyMediumText,
  BodyLargeText,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import { FontAwesome } from "@expo/vector-icons";
import StyledButton from "../../../components/shared/StyledButton"; 
import ValasConversion from "../../../components/valasHome/shared/ValasConversion";

import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import ConfirmationModal from "../../../components/valasHome/shared/ConfirmationModal"; 
import { alertConfirmation, formatNumber } from "../../../config/ValasConfig";
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import { useNavigation, useRoute } from "@react-navigation/native";

const DIMENSION_HEIGHT = Dimensions.get("window").height;

const ValasJualScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [transactionData, setTransactionData] = useState({
    selectedWallet: route.params?.selectedWallet,
    selectedRekening: route.params?.selectedRekening,
    selectedCurrency: route.params?.selectedCurrency,
    inputValue: "",
    convertedValue: ""
  });
  const [isVisible, setIsVisible] = useState(false); //Modal Visibility

  const [currentBalance, setCurrentBalance] = useState("10000000");
  const [minSell, setMinSell] = useState("10");
  const [maxSell, setMaxSell] = useState("25000");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
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
    data === ""
      ? setExchange("")
      : setExchange(parseInt(data) * parseInt(kurs));
    checkError(data, kursResult);
  };

  const checkError = (data, kursResult) => {
    if (kursResult > parseInt(currentBalance)) {
      setInputError("Jumlah melebihi Saldo Aktif Rupiah");
      setInputValue("");
    } else if (parseInt(data) < parseInt(minSell)) {
      setInputError(`Minimum penjualan valas AUD ${minSell}`);
      setInputValue("");
    } else if (parseInt(data) > parseInt(maxSell)) {
      setInputError(`Maksimum penjualan valas AUD ${maxSell}`);
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
        <ContentHeader title={"Penjualan Valas"} hasConfirmation={true} />
      </View>

      <View style={[styles.middleContainer]}>
        <View style={{ paddingHorizontal: 20 }}>
          {/* Konversi dari Valas ke IDR */}
          <ValasConversion
            firstInputTitle={"Nominal Penjualan"}
            secondInputTitle={"Nominal Pendapatan"}
            transactionData={transactionData}
            changeTextData={acceptInputCurrency}
            firstError={inputError}
            secondError={inputError}
          />

          {/* Kurs Jual */}
          <View style={styles.kursContainer}>
            <BodyMediumText
              style={{ color: colors.color.grey, fontWeight: "bold" }}
            >
              Kurs Jual
            </BodyMediumText>
            <BodyLargeText style={styles.textStyle}>
            {transactionData.selectedCurrency.currencyCode} 1.00 = Rp. {formatNumber(transactionData.selectedCurrency.sellRate)}
            </BodyLargeText>
          </View>
        </View>
        <View
          style={{ backgroundColor: colors.primary.primaryThree, height: 4 }}
        />
        <View>
        <WalletSource
            jenisRekening={transactionData.selectedRekening.type}
            rekening={transactionData.selectedRekening.accountNumber}
            saldo={formatNumber(transactionData.selectedRekening.balance)}
          />
        </View>

        <ConfirmationModal
          title={"Konfirmasi Penjualan Valas"}
          transactionType={"jual"}
          isVisible={isVisible}
          toggleBottomSheet={toggleBottomSheet}
          transactionData={transactionData}
        />
      </View>

      <View style={styles.bottomContainer}>
        {transactionData.inputValue === "" ? (
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

export default ValasJualScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height * 1.05,
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
  textStyle: {
    color: colors.primary.primaryOne,
    fontWeight: "bold",
  },
  kursContainer: {
    paddingVertical: "8%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
