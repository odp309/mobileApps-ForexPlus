import { BackHandler, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodyLargeText,
  BodyMediumText,
  BodySmallTextSemiBold,
} from "../../../components/shared/StyledText";
import ValasConversion from "../../../components/valasHome/shared/ValasConversion";
import { fetchMinimumDeposit } from "../../../config/ValasConfig";
import StyledButton from "../../../components/shared/StyledButton";
import WalletSource from "../../../components/valasHome/shared/WalletSource";

import colors from "../../../theme/colors";
import ConfirmationModal from "../../../components/valasHome/shared/ConfirmationModal";
import { alertConfirmation, formatNumber } from "../../../config/SharedConfig";
import CloseValasModal from "../../../components/valasHome/shared/CloseValasModal";

const FirstTopUpScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [inputError, setInputError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [minDeposit, setMinDeposit] = useState(null);
  const [maxPurchase, setMaxPurchase] = useState("25000");

  const transactionType = "add wallet";
  const [transactionData, setTransactionData] = useState({
    selectedWallet: "",
    selectedRekening: route.params?.selectedRekening,
    selectedCurrency: route.params?.item,
    inputValue: "",
    convertedValue: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(true);
    return true;
  };
  useEffect(() => {
    if (isFocused) {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => handleModal()
      );
      return () => backHandler.remove();
    }
  }, [isFocused]);
  const getMinimumDeposit = async () => {
    try {
      const minimumDeposit = await fetchMinimumDeposit(
        transactionData.selectedCurrency.currencyCode
      );
      if (minimumDeposit) {
        setMinDeposit(minimumDeposit);
      }
    } catch (error) {
      console.log("Error di FirstTopUp : ", error);
    }
  };

  useEffect(() => {
    getMinimumDeposit();
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
    } else if (parseInt(data) < parseInt(minDeposit)) {
      setInputError(
        `Minimum setoran valas ${transactionData.selectedCurrency.currencyCode} ${minDeposit}`
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

  const isButtonDisabled = () => {
    const inputValue = parseFloat(transactionData.inputValue);
    const convertedValue = parseFloat(transactionData.convertedValue);
    const balance = parseFloat(transactionData.selectedRekening.balance);

    return (
      transactionData.inputValue === "" ||
      inputValue < transactionData.selectedCurrency.minimumBuy ||
      balance < convertedValue
    );
  };

  return (
    <View style={styles.container}>
      <CloseValasModal
        isModalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={styles.topContainer}>
        <ContentHeader title="Setoran Awal" hasConfirmation={true} setModalVisible={()=> setModalVisible(!modalVisible)} />
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.mainContent}>
          <BodySmallTextSemiBold style={{ textAlign: "center" }}>
            Setor <BodySmallTextSemiBold style={{color:colors.primary.primaryOne}}>minimum {transactionData.selectedCurrency.currencyCode}{" "}{minDeposit}</BodySmallTextSemiBold> 
            {" "}atau lebih agar Dompet Valas bisa langsung digunakan
            untuk transaksi
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
        {/* {transactionData.inputValue === "" ||
        parseInt(transactionData.inputValue) < minDeposit ||
        parseInt(transactionData.convertedValue) >
          transactionData.selectedRekening.balance ? (
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
        )} */}
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
