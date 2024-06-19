import { StyleSheet, Text, View } from "react-native";
import { BottomSheet } from "@rneui/themed";

import React from "react";
import { BodyLargeText } from "../../shared/StyledText";
import StyledButton from "../../shared/StyledButton";
import colors from "../../../theme/colors";

const FilterModal = ({isModalShown}) => {
  return (
    <BottomSheet isVisible={isModalShown}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <BodyLargeText>Kategori</BodyLargeText>
        </View>

        <View style={styles.middleContainer}>
          <BodyLargeText>Content</BodyLargeText>
        </View>

        <View style={styles.bottomContainer}>
          {/* JUAL BUTTON */}
          <StyledButton
            mode={"primary"}
            title={"Terapkan" }
            size={"lg"}
            // onPress={toPinVerification}
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
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  topContainer: {
    width: "100%",
    alignItems: "center",
  },
  middleContainer: { width: "100%" },
  bottomContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
});
