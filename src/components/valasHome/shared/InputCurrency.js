import { Image, StyleSheet, View, TextInput } from "react-native";
import React, { useState } from "react";
import { BodyMediumText } from "../../shared/StyledText";
import colors from "../../../theme/colors";

const country = {
  // Add all your flag images here, where the keys are countryFlag values
  aud: {
    pathImage: require("../../../../assets/icons/flags/Australia.png"),
    code: "AUD",
  },
  sgd: {
    pathImage: require("../../../../assets/icons/flags/Singapore.png"),
    code: "SGD",
  },
  jpy: {
    pathImage: require("../../../../assets/icons/flags/Japan.png"),
    code: "JPY",
  },
  thb: {
    pathImage: require("../../../../assets/icons/flags/Thailand.png"),
    code: "THB",
  },
  usd: {
    pathImage: require("../../../../assets/icons/flags/United_States.png"),
    code: "USD",
  },
  cny: {
    pathImage: require("../../../../assets/icons/flags/China.png"),
    code: "CNY",
  },
  myr: {
    pathImage: require("../../../../assets/icons/flags/Malaysia.png"),
    code: "MYR",
  },
  eur: {
    pathImage: require("../../../../assets/icons/flags/European_Union.png"),
    code: "EUR",
  },
  cad: {
    pathImage: require("../../../../assets/icons/flags/Canada.png"),
    code: "CAD",  
  },
  chf: {
    pathImage: require("../../../../assets/icons/flags/Franc_Swiss.png"),
    code: "CHF",  
  },
  hkd: {
    pathImage: require("../../../../assets/icons/flags/Hong_Kong.png"),
    code: "HKD",  
  },
  nzd: {
    pathImage: require("../../../../assets/icons/flags/New_Zealand.png"),
    code: "NZD",  
  },
  gbp: {
    pathImage: require("../../../../assets/icons/flags/United_Kingdom.png"),
    code: "GBP",  
  },
};

const InputCurrency = ({  style, countryCode,onChangeText,value}) => {  
  return (
    <View style={styles.container}>
      <View style={styles.countryContainer}>
        <Image
          source={country[countryCode].pathImage}
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        <BodyMediumText
          style={{ color: colors.primary.primaryOne, fontWeight: "bold" }}
        >
          {country[countryCode].code}
        </BodyMediumText>
      </View>
      <TextInput
        placeholder="Masukkan Nominal" 
        value={value}
        style={[styles.inputStyle, style]}
        keyboardType="numeric"
        placeholderTextColor={colors.primary.primaryThree}
        onChangeText={onChangeText}
        returnKeyType="done"
      />
    </View>
  );
};

export default InputCurrency;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
    height:42,
    color: colors.primary.primaryOne,
    borderRadius: 100, // Adjust the border radius as needed
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: colors.primary.primaryOne,
  },
  countryContainer: {
    position: "absolute",
    paddingHorizontal: "4%",
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderRightWidth: 2,
    borderColor: colors.primary.primaryOne,
    height:"100%",
    backgroundColor: colors.primary.primaryThree
  },
  inputStyle: {
    paddingLeft: 100,
    borderRadius: 100,
    borderColor: colors.primary.primaryOne,
    fontFamily: "poppins-semibold",
    color:colors.primary.primaryOne,
    fontSize:16,
    paddingTop:5,
  },
});
