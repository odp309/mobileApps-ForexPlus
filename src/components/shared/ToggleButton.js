import { MaterialCommunityIcons } from "@expo/vector-icons";  //Don't Forget to Install @expo/vector-icons using: npm i @expo/vector-icons
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function ToggleButton() {
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    return setToggle(!toggle);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggle} style={styles.iconContainer}>
        {toggle ? (
          <MaterialCommunityIcons
            name="toggle-switch-outline"
            size={50}
            color="#ef5c26"
          />
        ) : (
          <MaterialCommunityIcons
            name="toggle-switch-off-outline"
            size={50}
            color="#bdc6c6"
          />
        )}
      </TouchableOpacity>
      <Text style={[styles.buttonText, toggle && styles.buttonTextActive]}>
        {toggle ? "ON" : "OFF"}
      </Text>

    </View>
  );
}

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  buttonTextActive: {
    color: "#333333",
  },
  iconContainer:{
    marginRight:10
  }
});
