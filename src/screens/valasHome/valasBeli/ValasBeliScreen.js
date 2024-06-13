import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  BodyLargeText,
  BodyMediumText,
} from "../../../components/shared/StyledText";
import StyledButton from "../../../components/shared/StyledButton";
import colors from "../../../theme/colors";
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  BackHandler,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import ValasConversion from "../../../components/valasHome/shared/ValasConversion";
import ConfirmationModal from "../../../components/valasHome/shared/ConfirmationModal";
import {
  alertConfirmation,
  fetchMinimumBuy,
  formatNumber,
} from "../../../config/ValasConfig";

const WINDOW_HEIGHT = Dimensions.get("window").height * 1.05;

export default function ValasBeliScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [minimumBuy, setMinimumBuy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionData, setTransactionData] = useState({
    selectedWallet: route.params?.selectedWallet,
    selectedRekening: route.params?.selectedRekening,
    selectedCurrency: route.params?.selectedCurrency,
    inputValue: "",
    convertedValue: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>
      alertConfirmation(navigation)
    );
    return () => backHandler.remove();
  }, []);

  const setFetchMinimum = async () => {
    try {
      const minimumData = await fetchMinimumBuy(
        transactionData.selectedWallet.currencyCode.toUpperCase()
      );
      setMinimumBuy(minimumData);
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
      inputValue: "",
    }));
    if (kursResult > transactionData.selectedRekening.balance) {
      setInputError("Jumlah melebihi Saldo Aktif Rupiah");
    } else if (parseInt(data) < parseInt(minimumBuy)) {
      setInputError(
        `Minimum pembelian valas ${transactionData.selectedCurrency.currencyCode} ${minimumBuy}`
      );
    } else if (parseInt(data) > parseInt(minimumBuy * 25000)) {
      setInputError(
        `Maksimum pembelian valas ${
          transactionData.selectedCurrency.currencyCode
        } ${minimumBuy * 25000}`
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
    setTransactionData((prevState) => ({
      ...prevState,
      inputValue: data,
    }));
    kursCalculation(data);
  };

  const isButtonDisabled = () => {
    const inputValue = parseFloat(transactionData.inputValue);
    const convertedValue = parseFloat(transactionData.convertedValue);
    const balance = parseFloat(transactionData.selectedRekening.balance);

    return (
      transactionData.inputValue === "" ||
      inputValue < minimumBuy ||
      balance < convertedValue
    );
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
      <ConfirmationModal
        title={"Konfirmasi Pembelian Valas"}
        transactionType={"beli"}
        isVisible={isVisible}
        toggleBottomSheet={toggleBottomSheet}
        transactionData={transactionData}
      />
      <View style={styles.topContainer}>
        <ContentHeader title={"Pembelian Valas"} hasConfirmation={true} />
      </View>

      <View style={styles.middleContainer}>
        <View style={{ paddingHorizontal: 20 }}>
          <ValasConversion
            firstInputTitle={"Nominal Pembelian"}
            secondInputTitle={"Nominal Asal"}
            transactionData={transactionData}
            changeTextData={acceptInputCurrency}
            firstError={inputError}
            secondError={inputError}
          />
          <View style={styles.kursBeliContainer}>
            <BodyMediumText
              style={{ color: colors.color.grey, fontWeight: "bold" }}
            >
              Kurs Beli
            </BodyMediumText>
            <BodyLargeText style={styles.textStyle}>
              {transactionData.selectedCurrency.currencyCode} 1.00 = IDR{" "}
              {formatNumber(transactionData.selectedCurrency.buyRate)}
            </BodyLargeText>
          </View>
        </View>
        <View
          style={{ backgroundColor: colors.primary.primaryThree, height: 4 }}
        />
        <View style={styles.boxRekeningSumber}>
          <WalletSource
            jenisRekening={transactionData.selectedRekening.type}
            rekening={transactionData.selectedRekening.accountNumber}
            saldo={formatNumber(transactionData.selectedRekening.balance)}
          />
        </View>
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
}

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT,
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    flex: 0.1,
    marginTop: "12%",
    paddingHorizontal: 20,
  },
  middleContainer: {
    width: "100%",
    flex: 0.75,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: Platform.OS === "android" ? "center" : "flex-start",
    flex: 0.15,
    paddingHorizontal: 20,
  },

  arrowDownContainer: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 0,
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  kursBeliContainer: {
    paddingVertical: "8%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  kursBeliText: {
    marginBottom: 5,
    color: "#535353",
  },
  kursBeliValue: {
    color: "#EF5C26",
  },
  boxRekeningSumber: {},
  rekeningSumberContainer: {
    marginBottom: 20,
  },
  rekeningSumberLabel: {
    bottom: 8,
  },
  rekeningSumberText: {
    top: 2,
    left: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#535353",
  },
  rekeningSumberDetails: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rekeningSumberName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rekeningSumberNumber: {
    top: -5,
    left: 10,
    fontSize: 18,
    marginBottom: 5,
    color: "#000000",
  },
  rekeningSumberSaldo: {
    left: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  rekeningSumberImage: {
    width: "35%",
  },
  bniImage: {
    width: "100%",
    left: 75,
    borderColor: "red",
    height: 100,
  },
  textStyle: {
    color: colors.primary.primaryOne,
    fontWeight: "bold",
  },
});
