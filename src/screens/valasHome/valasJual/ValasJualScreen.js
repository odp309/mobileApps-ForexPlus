import {
  Dimensions,
  StyleSheet,
  View, 
  Alert,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { 
  BodyMediumText,
  BodyLargeText, 
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors"; 
import { FontAwesome } from "@expo/vector-icons"; 
import StyledButton from "../../../components/shared/StyledButton"; 
import { useNavigation } from "@react-navigation/core";
import ValasConversion from "../../../components/valasHome/shared/ValasConversion";

import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import ConfirmationModal from "../../../components/valasHome/shared/ConfirmationModal";
import WalletValasSource from "../../../components/valasHome/shared/WalletValasSource";
import { alertConfirmation } from "../../../config/ValasConfig";

const DIMENSION_HEIGHT = Dimensions.get("window").height;

const ValasJualScreen = () => {
  const navigation = useNavigation();
  const [exchange, setExchange] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [kurs, setKurs] = useState("103");
  const [valas, setValas] = useState("JPY");
  const [isVisible, setIsVisible] = useState(false); //Modal Visibility

  useEffect(()=>{
    const backHandler = BackHandler.addEventListener("hardwareBackPress",() => alertConfirmation(navigation));
    return () => backHandler.remove();
  },[])

  const toggleBottomSheet = () => {
    console.log(isVisible);
    setIsVisible(!isVisible);
  };

  const kursCalculation = (data) => {
    data === ""
      ? setExchange("")
      : setExchange(parseInt(data) * parseInt(kurs));
  };

  const acceptInputCurrency = (data) => {
    console.log(data);
    setInputValue(data);
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
            exchange={exchange}
            changeTextData={acceptInputCurrency}
          />

          {/* Kurs Jual */}
          <View style={styles.kursContainer}>
            <BodyMediumText
              style={{ color: colors.color.grey, fontWeight: "bold" }}
            >
              Kurs Jual
            </BodyMediumText>
            <BodyLargeText style={styles.textStyle}>
              {valas} 1.00 = Rp. {kurs}
            </BodyLargeText>
          </View>
        </View>
        <View
          style={{ backgroundColor: colors.primary.primaryThree, height: 4 }}
        />
        <View>
          <WalletValasSource countryCode="aud" saldo="20000" />
        </View>

        <ConfirmationModal
          title={"Konfirmasi Penjualan Valas"}
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

export default ValasJualScreen;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height*1.05, 
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
