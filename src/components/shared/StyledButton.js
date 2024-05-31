import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import colors from "../../theme/colors";

const StyledButton = ({ mode, title, onPress,size, style}) => {
  return mode === "primary" ? (
    <Button
      title={title} 
      size={size}
      buttonStyle={[styles.bgPrimary,style]}
      titleStyle={styles.titleStyle}
      onPress={onPress}
      containerStyle={{ width: "100%" }}
    />
  ) : mode === "secondary" ? (
    <Button
      title={title} 
      size={size}
      onPress={onPress}
      titleStyle={styles.titleStyle}
      buttonStyle={[styles.bgSecondary,style]}
      containerStyle={{ width: "100%" }}
    />
  ) : mode === "primary-outlined" ? (
    <Button
      title={title}
      type="outline" 
      size={size}
      onPress={onPress}
      buttonStyle={[styles.bgPrimaryOutlined,style]}
      titleStyle={styles.labelPrimary}
      containerStyle={{ width: "100%" }}
    />
  ) : mode === "secondary-outlined" ? (
    <Button
      title={title}
      type="outline" 
      size={size}
      onPress={onPress}
      titleStyle={styles.titleStyle}
      buttonStyle={[styles.bgSecondaryOutlined,style]}
      containerStyle={{ width: "100%" }}
    />
  ) : mode === "primary-disabled" ? (
    <Button
      title={title} 
      size={size} 
      buttonStyle={[styles.bgPrimarydDisabled,style]}
      titleStyle={[styles.labelDisabled,styles,styles.titleStyle]}
    />
  ) : mode === "secondary-disabled" ? (
    <Button
      title={title} 
      size={size} 
      buttonStyle={[styles.bgSecondarydDisabled,style]}
      titleStyle={[styles.labelDisabled,styles.titleStyle]}
      containerStyle={{ width: "100%" }}
    />
  ) : (
    <Text>Mode :{title}</Text>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  bgPrimary: {
    backgroundColor: colors.primary.primaryOne,
    borderRadius :100,
  },
  bgSecondary: {
    backgroundColor: colors.secondary.secondaryOne,
    borderRadius :100,
  },

  bgPrimaryOutlined: {
    borderColor: colors.primary.primaryOne,
    borderRadius :100,
  },
  bgSecondaryOutlined: {
    borderColor: colors.secondary.secondaryOne,
    borderRadius :100,
  },

  bgPrimarydDisabled: {
    backgroundColor: "grey",
    borderRadius :100,
  },
  bgSecondarydDisabled: {
    backgroundColor: colors.secondary.secondaryThree,
    borderRadius :100,
  },

  labelPrimary: {
    color: colors.primary.primaryOne,
  },
  labelSecondary: {
    color: colors.secondary.secondaryOne,
  },
  labelDisabled: {
    color: colors.color.white,
  },

  titleStyle: {
    fontFamily: "poppins-semibold",
  },
});
