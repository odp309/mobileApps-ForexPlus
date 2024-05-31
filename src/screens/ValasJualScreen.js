import { Dimensions, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  BodyRegularText,
  BodyMediumText,
  BodyLargeText,
} from "../components/shared/StyledText";
import colors from "../theme/colors";
import InputCurrency from "../components/valasJual/InputCurrency";
import { FontAwesome } from "@expo/vector-icons";
import ExchangeResult from "../components/valasJual/ExchangeResult";
import StyledButton from "../components/shared/StyledButton";
import WalletSource from "../components/valasJual/WalletSource";

const DIMENSION_HEIGHT = Dimensions.get("window").height;

const ValasJualScreen = () => {
  const [exchange, setExchange] = useState("");
  const [kurs, setKurs] = useState("160");
  const [valas, setValas] = useState("JPY");

  const kursCalculation = (data) => {
    data === ""
      ? setExchange("")
      : setExchange(parseInt(data) * parseInt(kurs));
  };

  const acceptInputCurrency = (data) => {
    console.log(data);
    kursCalculation(data);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20 }}>
        <View>
          <BodyRegularText
            style={{ color: colors.color.grey, fontWeight: "bold" }}
          >
            Nominal Penjualan
          </BodyRegularText>
          <InputCurrency countryCode="jpy" onChangeText={acceptInputCurrency} />
        </View>

        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <FontAwesome
            name="long-arrow-down"
            size={24}
            color={colors.primary.primaryOne}
          />
        </View>

        <View>
          <BodyRegularText
            style={{ color: colors.color.grey, fontWeight: "bold" }}
          >
            Nominal Pendapatan
          </BodyRegularText>
          <ExchangeResult value={exchange} />
        </View>

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
      <WalletSource />

      <StyledButton
        mode="primary"
        title="Lanjut"
        size={"lg"}
        style={{ marginBottom: 20, marginHorizontal: 20 }}
      />
    </View>
  );
};

export default ValasJualScreen;

const styles = StyleSheet.create({
  container: {
    height: DIMENSION_HEIGHT * 0.95,
    paddingVertical: "5%",
    justifyContent: "space-between",
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
