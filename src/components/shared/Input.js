import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../../theme/colors";
import sizes from "../../theme/sizes";
import { Icon } from "@rneui/themed";

const Input = ({
  mode,
  placeholder,
  value,
  onChangeText,
  onPress,
  errorState,
  secureTextEntry,
  hasLeftIcon,
  hasRightIcon,
  style,
  leftIconName,
  rightIconName,
  keyboardType,
  iconColor
}) => {
  return mode === "active" ? (
    <View style={styles.activeContainer}>
      {hasLeftIcon && (
        <View style={{ position: "absolute", marginLeft: "5%" }}>
          <Icon
            name={leftIconName}
            size={24}
            color={iconColor}
          />
        </View>
      )}

      <TextInput
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        style={[styles.activeStyle, style]}
        
        placeholderTextColor={colors.primary.primaryOne}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        returnKeyType="done"
      />
      {hasRightIcon && (
        <View style={{ position: "absolute", marginLeft: "89%" }}>
          <TouchableOpacity onPress={onPress}>
            <Icon
              name={rightIconName}
              type="ionicon"
              size={24}
              color={iconColor}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  ) : mode === "disabled" ? (
    <View style={styles.disabledContainer}>
      {hasLeftIcon && (
        <View style={{ position: "absolute", marginLeft: "5%" }}>
          <Icon name={iconName} size={24} color="black" />
        </View>
      )}
      <TextInput
        placeholder={placeholder}
        value={value}
        style={[styles.disabledStyle, style]}
        placeholderTextColor={colors.secondary.secondaryOne}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        returnKeyType="done"
      />
    </View>
  ) : mode === "error" ? (
    <View>
      <View style={styles.errorContainer}>
        {hasLeftIcon && (
          <View style={{ position: "absolute", marginLeft: "5%" }}>
            <Icon name={iconName} size={24} color="black" />
          </View>
        )}
        <TextInput
          style={[styles.errorStyle, style]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          returnKeyType="done"
        />
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
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.primary.primaryOne,
    color: colors.primary.primaryOne,
    fontFamily: "poppins-regular",
  },
  disabledStyle: {
    padding: 10,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.secondary.secondaryOne,
    color: colors.secondary.secondaryOne,
    fontFamily: "poppins-regular",
  },
  errorStyle: {
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
    position: "relative",
    top: -20,
    left: 18,
  },
  activeContainer: {
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
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
    marginVertical: 10,
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
    marginVertical: 10,
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
