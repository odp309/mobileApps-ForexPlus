import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

export default function App() {

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  poppinsText: {
    fontFamily: "poppins-regular",
  },
  poppinsBoldText: {
    fontFamily: "poppins-regular",
    fontWeight: "bold",
  },
});
