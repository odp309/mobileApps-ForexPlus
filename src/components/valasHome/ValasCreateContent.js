import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BodyMediumText } from "../shared/StyledText";
import StyledButton from "../shared/StyledButton";

const ValasCreateContent = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 150 }}
        source={{ uri: "https://imgur.com/rlCuYCA.png" }}
        resizeMode="contain"
      />
      <View style={{alignItems:'center',width:"70%"}}>
        <BodyMediumText style={{textAlign:"center",marginTop:10}}>
          Hemat waktu, tanpa ribet! {"\n"}Buka dompet valas secara online.{" "}
        </BodyMediumText>
        <StyledButton
          title={"Buka Sekarang"}
          mode={"primary"}
          style={{  marginVertical: 30 }}
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
