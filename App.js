import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StyledButton from "./src/components/shared/StyledButton";
import RadioButton from "./src/components/shared/RadioButton";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

const dummyDataForRadioButton = [
  {
    id: 1,
    option: "JavaScript",
  },
  {
    id: 2,
    option: "HTML",
  },
  {
    id: 3,
    option: "CSS",
  },
  {
    id: 4,
    option: "React",
  },
];

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts
        await Font.loadAsync({
          "poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setFontLoaded(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      // This tells the splash screen to hide immediately!
      await SplashScreen.hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <StyledButton
        mode="primary"
        title="Primary"
        onPress={() => console.log("Test")}
      />
      <StyledButton
        mode="secondary"
        title="Secondary"
        onPress={() => console.log("Test")}
      />
      <StyledButton
        mode="primary-outlined"
        title="Primary Outlined"
        onPress={() => console.log("Test")}
      />
      <StyledButton
        mode="secondary-outlined"
        title="Secondary Outlined"
        onPress={() => console.log("Test")}
      />

      <StyledButton
        mode="primary-disabled"
        title="Primary Disabled"
        onPress={() => console.log("Test")}
      />
      <StyledButton
        mode="secondary-disabled"
        title="Secondary Disabled"
        onPress={() => console.log("Test")}
      />
      <Text style={styles.poppinsText}>Poppins Font Style</Text>
      <Text>Normal Font Style</Text>
      <RadioButton options={dummyDataForRadioButton} />
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
});
