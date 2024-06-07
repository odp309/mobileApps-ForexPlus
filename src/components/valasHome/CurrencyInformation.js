import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BodySmallText } from "../shared/StyledText";
import colors from "../../theme/colors";
import { useEffect, useState } from "react";
import { fetchKurs } from "../../config/ValasConfig";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const CurrencyInformation = () => {
  const [dataCurrency, setDataCurrency] = useState(null);

  const getData = async () => {
    try {
      const data = await fetchKurs();
      setDataCurrency(data); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (!dataCurrency) {
    return (
      <View style={styles.container}>
        <BodySmallText>Loading...</BodySmallText>
      </View>
    );
  }
  const formatNumber = (number) => {
    return new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    }).format(Math.floor(number));
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.row}>
          <BodySmallText style={{ color: colors.color.grey }}>
            Kurs
          </BodySmallText>
        </View>
        <View style={styles.row}>
          <BodySmallText style={{ color: colors.color.grey }}>
            Beli
          </BodySmallText>
        </View>
        <View style={styles.row}>
          <BodySmallText style={{ color: colors.color.grey }}>
            Jual
          </BodySmallText>
        </View>
      </View>

      {dataCurrency.map((currency, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          <View style={styles.row}>
            <BodySmallText style={{ color: colors.color.grey }}>
              {currency.currencyCode}
            </BodySmallText>
          </View>
          <View style={styles.row}>
            <BodySmallText style={{ color: colors.color.grey }}>
              {formatNumber(currency.buyRate)}
            </BodySmallText>
          </View>
          <View style={styles.row}>
            <BodySmallText style={{ color: colors.color.grey }}>
              {formatNumber(currency.sellRate)}
            </BodySmallText>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CurrencyInformation;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 40,
    borderWidth: 1,
  },
  row: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
});
