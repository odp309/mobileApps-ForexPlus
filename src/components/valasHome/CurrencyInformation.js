import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BodyMediumText,
  BodyMediumTextSemiBold,
  BodySmallText,
  BodySmallTextSemiBold,
} from "../shared/StyledText";
import colors from "../../theme/colors";
import { useEffect, useMemo, useState } from "react";
import { fetchKurs } from "../../config/ValasConfig";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { formatCurrencyNumber } from "../../config/SharedConfig";

const CurrencyInformation = ({
  dataCurrency,
  setDataCurrency,
  selectedWallet,
  setSelectedCurrency,
}) => {
  const navigation = useNavigation();
  const filteredKurs = useMemo(() => {
    if (dataCurrency && selectedWallet) {
      return dataCurrency.find((item) =>
        item.currencyCode
          .toLowerCase()
          .includes(selectedWallet.currencyCode.toLowerCase())
      );
    }
    return null;
  }, [dataCurrency, selectedWallet]);

  useEffect(() => {
    if (filteredKurs) {
      // console.log(filteredKurs.sellRate);
      setSelectedCurrency(filteredKurs);
    } else {
      console.log("No matching currency code found");
    }
  }, [filteredKurs, selectedWallet]);

  
   
  if (!dataCurrency) {
    return (
      <View style={{ justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.primary.primaryOne} />
      </View>
    );
  }

  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.row}>
            <BodyMediumTextSemiBold style={{ color: colors.color.grey }}>
              Kurs
            </BodyMediumTextSemiBold>
          </View>
          <View style={styles.row}>
            <BodyMediumTextSemiBold style={{ color: colors.color.grey }}>
              Beli
            </BodyMediumTextSemiBold>
          </View>
          <View style={styles.row}>
            <BodyMediumTextSemiBold style={{ color: colors.color.grey }}>
              Jual
            </BodyMediumTextSemiBold>
          </View>
        </View>

        {dataCurrency.slice(0, 4).map((currency, index) => (
          <View key={index} style={{ flexDirection: "row" }}>
            <View style={styles.row}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 25, height: 25, marginRight: 10 }}
                  source={{ uri: currency.flagIcon }}
                />
                <BodyMediumText style={{ color: colors.color.grey }}>
                  {currency.currencyCode}
                </BodyMediumText>
              </View>
            </View>
            <View style={styles.row}>
              <BodyMediumText style={{ color: colors.color.grey }}>
                {formatCurrencyNumber(currency.buyRate)}
              </BodyMediumText>
            </View>
            <View style={styles.row}>
              <BodyMediumText style={{ color: colors.color.grey }}>
                {formatCurrencyNumber(currency.sellRate)}
              </BodyMediumText>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CurrencyInformation", { dataCurrency })
        }
      >
        <BodyMediumText
          style={{ color: colors.primary.primaryOne, textAlign: "center",fontSize:14   }}
        >
          Lihat Selengkapnya
        </BodyMediumText>
      </TouchableOpacity>
    </View>
  );
};

export default CurrencyInformation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: colors.primary.primaryOne,
  },
  row: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
});
