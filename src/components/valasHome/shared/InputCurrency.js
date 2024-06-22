import { Image, StyleSheet, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { BodyMediumText, BodyMediumTextSemiBold } from "../../shared/StyledText";
import colors from "../../../theme/colors";
import { Text } from "react-native";

const InputCurrency = ({  style,selectedCurrency, onChangeText,value}) => {  
  const [isFocused, setIsFocused] = useState(false);
  
  useEffect(()=> {
    console.log(isFocused);
    console.log(value);
  },[value])
  return (
    <View style={styles.container}>
      <View style={styles.countryContainer}>
        <Image
          source={{uri: selectedCurrency.flagIcon}}
          style={{ width: 20, height: 20, marginRight: 10 }}
        />
        <BodyMediumText
          style={{ color: colors.primary.primaryOne, fontWeight: "bold" }}
        >
          {selectedCurrency.currencyCode}
        </BodyMediumText>
      </View>
      {(!isFocused && !value) && (
        <BodyMediumTextSemiBold style={styles.placeholderText}>Masukkan Nominal</BodyMediumTextSemiBold>
      )}
      <TextInput 
        
        value={value}
        style={[styles.inputStyle, style]}
        keyboardType="numeric" 
        onChangeText={onChangeText}
        returnKeyType="done"
        textAlign="right"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default InputCurrency;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 10,
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
    paddingRight:20,
    borderRadius: 100,
    borderColor: colors.primary.primaryOne,
    fontFamily: "poppins-semibold",
    color:colors.primary.primaryOne,
    fontSize:16,
    paddingTop:5, 
  },
  placeholderText: {
    position: 'absolute',
    right: 20,
    color: colors.primary.primaryThree,
    top:8
  },
});