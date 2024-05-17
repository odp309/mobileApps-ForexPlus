import { MaterialIcons } from "@expo/vector-icons"; //Don't Forget to Install @expo/vector-icons using: npm i @expo/vector-icons
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import colors from "../../theme/colors";

function RadioButton({ options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setSelectedOption(item.id)}
      >
        {selectedOption === item.id ? (
          <MaterialIcons
            name="radio-button-on"
            size={24}
            color={colors.primary.primaryOne}
          />
        ) : (
          <MaterialIcons
            name="radio-button-off"
            size={24}
            color={colors.color.grey}
          />
        )}
      </TouchableOpacity>
      <View style={styles.optionTextContainer}>
        <Text style={styles.radioButtonText}>{item.option}</Text>
      </View>
    </View>
  );
  return (
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
  );
}

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,

  },
  radioButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  optionTextContainer: {
    width: 100,
  },
});
