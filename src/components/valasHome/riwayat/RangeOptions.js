import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BodyRegularText } from "../../shared/StyledText";
import { MaterialIcons } from "@expo/vector-icons"; //Don't Forget to Install @expo/vector-icons using: npm i @expo/vector-icons
import colors from "../../../theme/colors";

const RangeOptions = ({ title, handleRange, selectedOption, optionId }) => {
  const onHandleRange = () => {
    console.log(optionId);
    handleRange(optionId);
  };

  return (
    <View style={styles.optionContainer}>
      <View>
        <BodyRegularText>{title}</BodyRegularText>
      </View>
      <TouchableOpacity onPress={onHandleRange}>
        {selectedOption === optionId ? (
          <MaterialIcons
            name="radio-button-on"
            size={24}
            color={colors.primary.primaryOne}
          />
        ) : (
          <MaterialIcons
            name="radio-button-off"
            size={24}
            color={colors.color.grey}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RangeOptions;

const styles = StyleSheet.create({
  optionContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 10,
  },
});
