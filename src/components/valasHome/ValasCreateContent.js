import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BodyMediumText } from "../shared/StyledText";
import StyledButton from "../shared/StyledButton";
import { useNavigation, useRoute } from "@react-navigation/native";

const ValasCreateContent = ({ selectedRekening }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 150 }}
        source={require("../../../assets/newValas.png")}
        resizeMode="contain"
      />
      <View style={{ alignItems: "center", width: "70%" }}>
        <BodyMediumText style={{ textAlign: "center", marginTop: 10 }}>
          Hemat waktu, tanpa ribet! {"\n"}Buka dompet valas secara online.{" "}
        </BodyMediumText>
        <StyledButton
          title={"Buka Sekarang"}
          mode={"primary"}
          style={{ marginVertical: 30 }}
          onPress={() => {
            navigation.navigate("ChooseWallet", { selectedRekening });
          }}
        />
      </View>
    </View>
  );
};

export default ValasCreateContent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
