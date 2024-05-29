import { StyleSheet, Text, View } from "react-native"; 
import Router from "./src/navigation/Router"; 
// import DummyTest from "./src/dummy/DummyTest";
import { useEffect, useState } from "react"; 

import * as Font from "expo-font"; 

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  async function prepare() {
    try {  
      await Font.loadAsync({
        "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
        "poppins-semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
        "poppins-medium": require("./assets/fonts/Poppins-Medium.ttf"),
      });  
    } catch (e) {
      console.warn(e);
    } finally { 
      setFontLoaded(true);
    }
  }
  useEffect(() => {
    prepare();
  }, []); 

  if (!fontLoaded) {
    return null;
  }

  return (
    <Router />
    // <DummyTest />
  );
}

const styles = StyleSheet.create({
  
});
