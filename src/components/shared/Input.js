import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import colors from "../../theme/colors";
import sizes from "../../theme/sizes";

const Input = ({ mode, placeholder, errorState }) => {
  const [inputText, setInputText] = useState("");


  return mode === "active" ? (
    <View style={styles.activeContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.activeStyle}
        placeholderTextColor={colors.primary.primaryOne}
        onChangeText={setInputText}
      />
    </View>
  ) : mode === "disabled" ? (
    <View style={styles.disabledContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.disabledStyle}
        placeholderTextColor={colors.secondary.secondaryOne}
        onChangeText={setInputText}
      />
    </View>
  ) : mode === "error" ? (
    <View>
      <View style={styles.errorContainer}>
        <TextInput style={styles.errorStyle} onChangeText={setInputText} />
      </View>
      <Text style={styles.errorText}>{errorState}</Text>
    </View>
  ) : (
    <Text>Unknown Mode</Text>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  activeStyle: {
    width: 200,
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.primary.primaryOne,
    color: colors.primary.primaryOne,
    fontFamily: "poppins-regular",
  },
  disabledStyle: {
    width: 200,
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.secondary.secondaryOne,
    color: colors.secondary.secondaryOne,
    fontFamily: "poppins-regular",
  },
  errorStyle: {
    width: 200,
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.color.error,
    color: colors.primary.primaryOne,
  },
  errorText: {
    color: colors.color.error,
    fontFamily: "poppins-regular",
    fontSize: sizes.font.small,
    position:'relative',
    top:-20,
    left:18
  },
  activeContainer: {
    marginVertical: 20,
    color: colors.primary.primaryOne,
    borderRadius: 100, // Adjust the border radius as needed
    backgroundColor: "#FFFFFF",
    shadowColor: colors.primary.primaryOne, // Change the color to achieve different glow effects
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10, // Adjust the shadow radius for the glow effect
    elevation: 5, // Android elevation for shadow
  },
  disabledContainer: {
    marginVertical: 20,
    color: colors.secondary.secondaryOne,
    borderRadius: 100, // Adjust the border radius as needed
    backgroundColor: "#FFFFFF",
    shadowColor: colors.secondary.secondaryOne, // Change the color to achieve different glow effects
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10, // Adjust the shadow radius for the glow effect
    elevation: 5, // Android elevation for shadow
  },
  errorContainer: {
    marginVertical: 20,
    color: colors.color.error,
    borderRadius: 100, // Adjust the border radius as needed
    backgroundColor: "#FFFFFF",
    shadowColor: colors.color.error, // Change the color to achieve different glow effects
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10, // Adjust the shadow radius for the glow effect
    elevation: 5, // Android elevation for shadow
  },
});
