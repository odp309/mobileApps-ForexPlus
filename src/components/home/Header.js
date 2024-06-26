import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Skeleton } from "@rneui/themed";
import colors from "../../theme/colors";

const Header = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 90, height: 40, alignSelf: "center" }}
        resizeMode="center"
        source={require("../../../assets/icon-bni.png")}
      />
      <Image
        style={{ width: 22, height: 40, alignSelf: "center" }}
        resizeMode="center"
        source={require("../../../assets/icon-notif.png")}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 8,
  },
  logoStyle: {},
});
