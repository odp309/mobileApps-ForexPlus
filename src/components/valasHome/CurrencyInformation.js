import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BodySmallText, BodySmallTextSemiBold } from "../shared/StyledText";
import colors from "../../theme/colors";
import { useEffect, useMemo, useState } from "react";
import { fetchKurs, formatNumber } from "../../config/ValasConfig";
import { Image } from "react-native";
 
const CurrencyInformation = ({dataCurrency,setDataCurrency,selectedWallet,setSelectedCurrency}) => {

  const filteredKurs = useMemo(() => {
    if (dataCurrency != null) {
      return dataCurrency.find((item) =>
        item.currencyCode.toLowerCase().includes(selectedWallet.currencyCode.toLowerCase())
      );
    }
    return null; 
  }, [dataCurrency, selectedWallet]);

  useEffect(() => {
    if (filteredKurs) {
      // console.log(filteredKurs.sellRate);
      setSelectedCurrency(filteredKurs)
    } else {
      console.log('No matching currency code found');
    } 
  }, [filteredKurs, selectedWallet]);

  const getData = async () => {
    try {
      const data = await fetchKurs(); 
      setDataCurrency(data); 
      // setSelectedCurrency(filteredKurs);
      //console.log(data);
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

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.row}>
          <BodySmallTextSemiBold style={{ color: colors.color.grey }}>
            Kurs
          </BodySmallTextSemiBold>
        </View>
        <View style={styles.row}>
          <BodySmallTextSemiBold style={{ color: colors.color.grey }}>
            Beli
          </BodySmallTextSemiBold>
        </View>
        <View style={styles.row}>
          <BodySmallTextSemiBold style={{ color: colors.color.grey }}>
            Jual
          </BodySmallTextSemiBold>
        </View>
      </View>

      {dataCurrency.map((currency, index) => (
        <View key={index} style={{ flexDirection: "row" }}>
          <View style={styles.row}>
            <View style={{flexDirection:"row",alignItems:'center',justifyContent:'center'}}>
            <Image style={{width:25,height:25,marginRight:10}} source={{uri : currency.flagIcon}} />
            <BodySmallText style={{ color: colors.color.grey }}>
              {currency.currencyCode}
            </BodySmallText>
            </View>
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
    marginBottom: 20,
    borderWidth: 1,
    borderColor:colors.primary.primaryOne,
  },
  row: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
});
