import { MaterialIcons } from "@expo/vector-icons"; //Don't Forget to Install @expo/vector-icons using: npm i @expo/vector-icons
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const dummyData = [
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

function RadioButton() {
  const [selectedOption, setSelectedOption] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.radioButton}
        onPress={() => setSelectedOption(item.id)}
      >
        {selectedOption === item.id ? (
          <MaterialIcons name="radio-button-on" size={24} color="#ef5c26" />
        ) : (
          <MaterialIcons name="radio-button-off" size={24} color="#bdc6c6" />
        )}
      </TouchableOpacity>
      <View style={styles.optionTextContainer}>
        <Text style={styles.radioButtonText}>{item.option}</Text>
      </View>
    </View>
  );
  return (
    <FlatList
      data={dummyData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    // width:'80%',
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  radioButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  radioButtonSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007AFF",
    backgroundColor: "#007AFF",
  },
  radioButtonNotSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "red",
  },
  optionTextContainer: {
    width:100,
    justifyContent:'flex-start',
  }
});
