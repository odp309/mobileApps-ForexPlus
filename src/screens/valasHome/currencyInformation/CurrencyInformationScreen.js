import {
  BackHandler,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { alertConfirmation, formatNumber } from "../../../config/ValasConfig";
import ContentHeader from "../../../components/valasHome/shared/ContentHeader";
import {
  BodyMediumTextSemiBold,
  BodyMediumText,
  BodySmallText,
} from "../../../components/shared/StyledText";
import colors from "../../../theme/colors";
import { useNavigation, useRoute } from "@react-navigation/native";

WINDOW_HEIGHT = Dimensions.get("window").height * 1.05;

const CurrencyInformationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dataCurrency = route.params?.dataCurrency; 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <ContentHeader title={"Info Kurs"}/>
      </View>
      <View style={styles.middleContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.row}>
            <BodyMediumTextSemiBold
              style={{ color: colors.primary.primaryOne }}
            >
              Kurs
            </BodyMediumTextSemiBold>
          </View>
          <View style={styles.row}>
            <BodyMediumTextSemiBold
              style={{ color: colors.primary.primaryOne }}
            >
              Beli
            </BodyMediumTextSemiBold>
          </View>
          <View style={styles.row}>
            <BodyMediumTextSemiBold
              style={{ color: colors.primary.primaryOne }}
            >
              Jual
            </BodyMediumTextSemiBold>
          </View>
        </View>
        {dataCurrency.map((currency, index) => (
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
                {formatNumber(currency.buyRate)}
              </BodyMediumText>
            </View>
            <View style={styles.row}>
              <BodyMediumText style={{ color: colors.color.grey }}>
                {formatNumber(currency.sellRate)}
              </BodyMediumText>
            </View>
          </View>
        ))}
        <BodySmallText
          style={{
            textAlign: "center",
            marginVertical: 10,
            color: colors.primary.primaryOne,
          }}
        >
          Pembaharuan terakhir {dataCurrency[dataCurrency.length-1].createdAt}
        </BodySmallText>
      </View>
    </ScrollView>
  );
};

export default CurrencyInformationScreen;

const styles = StyleSheet.create({
  container: { 
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
    flex: 0.9,
    paddingHorizontal: 20,
    marginTop:30
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 0.15,
    paddingHorizontal: 20,
    paddingBottom: "4%",
  },
  row: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    borderBottomColor: colors.primary.primaryOne,
    borderBottomWidth: 0.5,
  },
});
