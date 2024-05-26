import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 90,height:40, alignSelf:'center'}}
        resizeMode="center"
        source={require("../../../assets/icon-bni.png")}
      /> 
      <Image
        style={{ width: 22, alignSelf:'center'}}
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
    marginHorizontal:'5%',
    marginTop:'2%' 
  },
  logoStyle: {},
});
