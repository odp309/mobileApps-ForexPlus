import { StyleSheet, Text, View } from "react-native";
import { BottomSheet } from "@rneui/themed";

import React, { useState } from "react";
import { BodyLargeText, BodyLargeTextSemiBold } from "../../shared/StyledText";
import StyledButton from "../../shared/StyledButton";
import colors from "../../../theme/colors";

const TRANSACTION_TYPE = ["Transfer", "Beli", "Jual",]

const FilterModal = ({ isModalShown, toggleBottomSheet }) => {
    const [chosenFilter, setChosenFilter] = useState("Transfer");



  const handleApplyButton = () => {
    toggleBottomSheet();
  };

  return (
    <BottomSheet isVisible={isModalShown}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <BodyLargeTextSemiBold>Kategori</BodyLargeTextSemiBold>
        </View>

        <View style={styles.middleContainer}>
          <BodyLargeText>Content</BodyLargeText>
        </View>

        <View style={styles.bottomContainer}>
          {/* JUAL BUTTON */}
          <StyledButton
            mode={"primary"}
            title={"Terapkan"}
            size={"lg"}
            onPress={handleApplyButton}
            style={{ marginVertical: "5%" }}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  topContainer: {
    width: "100%",
  },
  middleContainer: { width: "100%" },
  bottomContainer: {
    width: "100%",
  },
});
