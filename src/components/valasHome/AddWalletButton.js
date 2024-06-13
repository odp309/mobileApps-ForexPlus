import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../../theme/colors";
import { useNavigation } from "@react-navigation/native";

const AddWalletButton = ({ selectedRekening }) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChooseWallet", { selectedRekening });
      }}
      style={styles.addwallet}
    >
      <FontAwesome5 name="plus" size={40} color={colors.color.white} />
    </TouchableOpacity>
  );
};

export default AddWalletButton;

const styles = StyleSheet.create({
  addwallet: {
    backgroundColor: colors.primary.primaryOne,
    borderRadius: 100,
    width: 60,
    height: 60,
    justifyContent:'center',
    alignItems:'center',
    shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.5, // Adjust the opacity for desired effect
      shadowRadius: 5, // Adjust the radius for desired effect
      elevation: 5, // Android shadow
  },
});
