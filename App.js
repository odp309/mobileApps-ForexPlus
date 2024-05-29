import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

import * as Font from "expo-font";
import Router from "./src/navigators/Router";
import { loadFont, prepare } from "./src/config/FontConfig";

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFont(setFontLoaded);
  }, []);

  return fontLoaded ? <Router /> : null;
}

const styles = StyleSheet.create({});
