import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"; //Don't Forget to Install @expo/vector-icons using: npm i @expo/vector-icons
import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../../theme/colors";

const CheckboxButton = ({ options }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheckbox = (id) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <View>
      {options.map((option) => (
        <View style={styles.container} key={option.id}>
          <TouchableOpacity
            onPress={() => toggleCheckbox(option.id)}
            style={styles.checkboxContainer}
          >
            {checkedItems[option.id] ? (
              <AntDesign
                name="checkcircle"
                size={24}
                color={colors.primary.primaryOne}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={24}
                color={colors.color.grey}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.label}>{option.option}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 8,
  },
  checkIcon: {
    color: "#FFFFFF",
  },
  label: {
    fontSize: 16,
  },
});

export default CheckboxButton;
