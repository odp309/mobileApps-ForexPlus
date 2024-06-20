import {
  Dimensions,
  StyleSheet,
  View,
  Alert,
  BackHandler,
  ActivityIndicator,
} from "react-native";
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
import {
  alertConfirmation,
  fetchMinimumSell,
  formatNumber,
} from "../../../config/ValasConfig";
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import { useNavigation, useRoute } from "@react-navigation/native";
import WalletValasSource from "../../../components/valasHome/shared/WalletValasSource";
import CloseValasModal from "../../../components/valasHome/shared/CloseValasModal";

const DIMENSION_HEIGHT = Dimensions.get("window").height;

const ValasJualScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [minimumSell, setMinimumSell] = useState(null);

  const [transactionData, setTransactionData] = useState({
    selectedWallet: route.params?.selectedWallet,
    selectedRekening: route.params?.selectedRekening,
    selectedCurrency: route.params?.selectedCurrency,
    inputValue: "",
    convertedValue: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [inputError, setInputError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      handleModal()
    );
    return () => backHandler.remove();
  }, []);

  const setFetchMinimum = async () => {
    try {
      const minimumData = await fetchMinimumSell(
        transactionData.selectedWallet.currencyCode.toUpperCase()
      );
      setMinimumSell(minimumData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setFetchMinimum();
    }, 500);
  }, []);

  const isButtonDisabled = () => {
    const inputValue = parseFloat(transactionData.inputValue);
    const convertedValue = parseFloat(transactionData.convertedValue);
    const balance = parseFloat(transactionData.selectedWallet.balance);
    return (
      transactionData.inputValue === "" ||
      inputValue < minimumSell ||
      inputValue > balance
    );
  };

  const toggleBottomSheet = () => {
    console.log(isVisible);
    setIsVisible(!isVisible);
  };

  const kursCalculation = (data) => {
    const kursResult =
      parseInt(data) * parseInt(transactionData.selectedCurrency.sellRate);
    setTransactionData((prevState) => ({
      ...prevState,
      convertedValue:
        data === ""
          ? ""
          : (
              parseInt(data) *
              parseInt(transactionData.selectedCurrency.sellRate)
            ).toString(),
    }));
    checkError(data, kursResult);
  };

  const checkError = (data) => {
    console.log("Kurs result : ", data);
    setTransactionData((prevState) => ({
      ...prevState,
    }));

    if (parseInt(data) < parseInt(minimumSell)) {
      setInputError(
        `Minimum penjualan valas ${transactionData.selectedCurrency.currencyCode} ${minimumSell}`
      );
    } else if (parseInt(data) > parseInt(minimumSell * 25000)) {
      setInputError(
        `Maksimum penjualan valas ${
          transactionData.selectedCurrency.currencyCode
        } ${minimumSell * 25000}`
      );
    } else if (
      parseInt(data) > parseInt(transactionData.selectedWallet.balance)
    ) {
      setInputError("Saldo dompet valas Anda tidak cukup");
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
    setTransactionData((prevState) => ({
      ...prevState,
      inputValue: data,
    }));
    kursCalculation(data);
  };

  if (isLoading) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.primary.primaryOne} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CloseValasModal
        isModalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.topContainer}>
        <ContentHeader title={"Jual Valas"} hasConfirmation={true} />
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
              {transactionData.selectedCurrency.currencyCode} 1.00 = IDR{" "}
              {formatNumber(transactionData.selectedCurrency.sellRate)}
            </BodyLargeText>
          </View>
        </View>
        <View
          style={{ backgroundColor: colors.primary.primaryThree, height: 4 }}
        />
        <View>
          <WalletValasSource
            saldo={transactionData.selectedWallet.balance}
            selectedWallet={transactionData.selectedWallet}
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
        <StyledButton
          mode={isButtonDisabled() ? "primary-disabled" : "primary"}
          title="Lanjut"
          size={"lg"}
          onPress={toggleBottomSheet}
          style={{ marginBottom: 20 }}
          disabled={isButtonDisabled()}
        />
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
