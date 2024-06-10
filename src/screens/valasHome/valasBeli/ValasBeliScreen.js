import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  BodyLargeText,
  BodyMediumText,
} from "../../../components/shared/StyledText";
import StyledButton from "../../../components/shared/StyledButton";
import colors from "../../../theme/colors";
import { View, StyleSheet, Dimensions, Alert, BackHandler } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import WalletSource from "../../../components/valasHome/shared/WalletSource";
import ValasConversion from "../../../components/valasHome/shared/ValasConversion";
import ConfirmationModal from "../../../components/valasHome/shared/ConfirmationModal";
import { alertConfirmation } from "../../../config/ValasConfig";
import { useSafeAreaFrame } from "react-native-safe-area-context";

const WINDOW_HEIGHT = Dimensions.get("window").height * 1.05;
export default function ValasBeliScreen() {
  const navigation = useNavigation();

  const [exchange, setExchange] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [kurs, setKurs] = useState("103");
  const [valas, setValas] = useState("JPY");
  const [isVisible, setIsVisible] = useState(false);
  const [currentBalance, setCurrentBalance] = useState("10000000");
  const [minPurchase, setMinPurchase] = useState("10");
  const [maxPurchase, setMaxPurchase] = useState("25000");

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
    data === "" ? setExchange("") : setExchange(kursResult);
    checkError(data, kursResult);
  };

  const checkError = (data, kursResult) => {
    if (kursResult > parseInt(currentBalance)) {
      setInputError("Jumlah melebihi Saldo Aktif Rupiah");
      setInputValue("");
    } else if (parseInt(data) < parseInt(minPurchase)) {
      setInputError(`Minimum pembelian valas AUD ${minPurchase}`);
      setInputValue("");
    } else if (parseInt(data) > parseInt(maxPurchase)) {
      setInputError(`Maksimum pembelian valas AUD ${maxPurchase}`);
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
      <ConfirmationModal
        title={"Konfirmasi Pembelian Valas"}
        isVisible={isVisible}
        toggleBottomSheet={toggleBottomSheet}
        pendapatan={exchange}
        kurs={kurs}
        inputSaldo={inputValue}
      />
      <View style={styles.topContainer}>
        <ContentHeader title={"Pembelian Valas"} hasConfirmation={true} />
      </View>

      <View style={styles.middleContainer}>
        <View style={{ paddingHorizontal: 20 }}>
          <ValasConversion
            firstInputTitle={"Nominal Pembelian"}
            secondInputTitle={"Nominal Asal"}
            exchange={exchange}
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
              {valas} 1.00 = Rp. {kurs}
            </BodyLargeText>
          </View>
        </View>
        <View
          style={{ backgroundColor: colors.primary.primaryThree, height: 4 }}
        />
        <View style={styles.boxRekeningSumber}>
          <WalletSource
            jenisRekening={"TAPLUS PEGAWAI"}
            rekening={"13131313"}
            saldo={200000}
          />
        </View>
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
    justifyContent: "center",
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
    // borderWidth:1
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
